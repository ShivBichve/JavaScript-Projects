import requests
import time
import os

# Configuration
FID = '257710'
MY_WALLET = '0x76F081dD6e3579F2c3Bb87e5A71f5834CA59A7c9'

# HTTP Headers
HEADERS = {
    "accept": "*/*",
    "accept-language": "en,vi;q=0.9",
    "origin": "https://www.harmonybot.xyz",
    "priority": "u=1, i",
    "referer": "https://www.harmonybot.xyz/warplets",
    "sec-ch-ua": '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-fetch-storage-access": "active",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
}

HEADERS_JSON = HEADERS.copy()
HEADERS_JSON["content-type"] = "application/json"

# Request payload
PAYLOAD = {"walletAddress": MY_WALLET}

# Configuration
MAX_RETRIES = 9999
RETRY_DELAY = 1  # seconds
REQUEST_TIMEOUT = 30  # seconds

def generate_image():
    """Warplet image generation"""
    print("\n[1/2] Starting image generation...")
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"  Attempt {attempt}/{MAX_RETRIES}...")
            
            response = requests.post(
                f'https://www.harmonybot.xyz/api/warplet/{FID}',
                headers=HEADERS,
                timeout=REQUEST_TIMEOUT
            )
            
            print(f"  Status Code: {response.status_code}")
            
            if response.status_code == 200:
                print("  ✅ Image generation successful!")
                return True
            elif response.status_code == 429:
                print("  ⚠️ Rate limit! Waiting 10 seconds...")
                time.sleep(10)
            else:
                print(f"  ❌ Failed: {response.text[:200]}")
                
        except requests.exceptions.Timeout:
            print(f"  ⏱️ Timeout! {REQUEST_TIMEOUT}s exceeded")
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Network error: {e}")
        except Exception as e:
            print(f"  ❌ Unexpected error: {e}")
        
        if attempt < MAX_RETRIES:
            print(f"  Retrying in {RETRY_DELAY} seconds...\n")
            time.sleep(RETRY_DELAY)
    
    print("  ❌ Maximum retry attempts reached!")
    return False

def get_signature():
    """Get signature and IPFS URL"""
    print("\n[2/2] Starting signature generation...")
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"  Attempt {attempt}/{MAX_RETRIES}...")
            
            response = requests.post(
                f'https://www.harmonybot.xyz/api/warplet/generateSignature/{FID}',
                headers=HEADERS_JSON,
                json=PAYLOAD,
                timeout=REQUEST_TIMEOUT
            )
            
            print(f"  Status Code: {response.status_code}")
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    signature = data.get('signature', 'N/A')
                    ipfs_url = data.get('ipfsUrl', 'N/A')
                    
                    print("\n" + "="*60)
                    print("✅ SUCCESS!")
                    print("="*60)
                    print(f"Signature: {signature}")
                    print(f"IPFS URL:  {ipfs_url}")
                    print("="*60 + "\n")
                    return True
                    
                except ValueError:
                    print(f"  ⚠️ JSON parse error: {response.text[:200]}")
                    
            elif response.status_code == 429:
                print("  ⚠️ Rate limit! Waiting 10 seconds...")
                time.sleep(10)
            else:
                print(f"  ❌ Failed: {response.text[:200]}")
                
        except requests.exceptions.Timeout:
            print(f"  ⏱️ Timeout! {REQUEST_TIMEOUT}s exceeded")
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Network error: {e}")
        except Exception as e:
            print(f"  ❌ Unexpected error: {e}")
        
        if attempt < MAX_RETRIES:
            print(f"  Retrying in {RETRY_DELAY} seconds...\n")
            time.sleep(RETRY_DELAY)
    
    print("  ❌ Maximum retry attempts reached!")
    return False

def main():
    """Main execution function"""
    print("\n" + "="*60)
    print("HARMONYBOT WARPLET SCRIPT")
    print("="*60)
    print(f"FID: {FID}")
    print(f"Wallet: {MY_WALLET[:6]}...{MY_WALLET[-4:]}")
    print("="*60)
    
    # FID and Wallet validation
    if FID.startswith('ENTER') or MY_WALLET.startswith('ENTER'):
        print("\n❌ ERROR: Don't forget to enter your FID and Wallet address!")
        print("Please edit the values at the beginning of the script.\n")
        return
    
    # 1. Image Generation
    if not generate_image():
        print("\n❌ Image generation failed. Terminating script.")
        return
    
    # Wait for API to be ready
    print("\n⏳ Preparing API (3 seconds)...")
    time.sleep(3)
    
    # 2. Signature Generation
    if not get_signature():
        print("\n❌ Signature generation failed.")
        return
    
    print("✅ Process completed!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️ Stopped by user (Ctrl+C)")
    except Exception as e:
        print(f"\n❌ Critical error: {e}")