from fastapi import APIRouter, HTTPException
from skimage.metrics import structural_similarity
import cv2
import numpy as np
import requests
from pydantic import BaseModel
from urllib.parse import unquote
import time

router = APIRouter()


class PromptGetSimilarityScore(BaseModel):
    src_img_url: str
    img_url: str
    similarity_score: float


def load_image_from_url(url: str, timeout: int = 30, max_retries: int = 3):
    print(f"load_image_from_url: {url}")
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
            img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            if img is None:
                raise ValueError("Failed to decode image")
            return cv2.resize(img, (512, 512))
        except requests.RequestException as e:
            print(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt == max_retries - 1:
                raise
            time.sleep(2 ** attempt)  # Exponential backoff
    raise Exception("Failed to load image after multiple attempts")


@router.get("/similarity-score", response_model=PromptGetSimilarityScore)
def get_similarity_score(src_img_url: str, img_url: str):
    try:
        # Decode URLs
        src_img_url = unquote(src_img_url)
        img_url = unquote(img_url)

        print(f"get_similarity_score: {src_img_url}:{img_url}")

        # Load images from URLs and resize to 512x512
        before = load_image_from_url(src_img_url)
        after = load_image_from_url(img_url)

        # Convert images to grayscale
        before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
        after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)

        # Compute SSIM between the two images
        (score, _) = structural_similarity(before_gray, after_gray, full=True)
        print("Image Similarity: {:.4f}%".format(score * 100))

        return PromptGetSimilarityScore(
            src_img_url=src_img_url, img_url=img_url, similarity_score=score
        )
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching image: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
