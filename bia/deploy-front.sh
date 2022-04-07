API_ENDPOINT=[SUA API]
REACT_APP_API_URL=$API_ENDPOINT SKIP_PREFLIGHT_CHECK=true npm run build --prefix client
echo '>> Fazendo deploy dos assets'
aws s3 sync client/build [BUCKET] --exclude "index.html" --profile [PROFILE]
echo '> Finalizado'
echo '>> Fazendo deploy do index.html'
aws s3 sync client/build [BUCKET] --exclude "*" --include "index.html" --profile [PROFILE]
echo '> Finalizado'
echo 'Deploy Finalizado'
