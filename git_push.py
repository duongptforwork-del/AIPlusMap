import subprocess
import os

def run_git(args):
    result = subprocess.run(["git"] + args, capture_output=True, text=True)
    print(f"Running: git {' '.join(args)}")
    if result.stdout: print(result.stdout)
    if result.stderr: print(result.stderr)

run_git(["config", "user.name", "Phạm Thuỳ Dương"])
run_git(["config", "user.email", "duongptforwork@gmail.com"])
run_git(["add", "."])
run_git(["commit", "-m", "Fix build issues: added autoprefixer, fixed path aliases, and cleaned up lib directory"])
# Try to handle remote addition safely
try:
    run_git(["remote", "add", "origin", "https://github.com/duongptforwork-del/Deerflow-AI-Plus-Map.git"])
except:
    pass
run_git(["branch", "-M", "main"])
print("Git setup complete locally.")

# Attempt to push
print("Attempting to push...")
run_git(["push", "-u", "origin", "main"])
