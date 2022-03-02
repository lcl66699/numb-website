@echo off
echo "-------Begin-------"
set /p msg=请输入提交注释:
git status
git add .
git commit -m %msg%
git pull origin develop
git push origin develop
echo 推送成功：【%msg%】
echo "--------End!--------"
pause