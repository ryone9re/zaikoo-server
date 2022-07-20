FROM node:lts-alpine

ARG DATABASE_URL

ARG FIREBASE_SERVICE_ACCOUNT_TYPE

ARG FIREBASE_SERVICE_ACCOUNT_PROJECT_ID

ARG FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID

ARG FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY

ARG FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL

ARG FIREBASE_SERVICE_ACCOUNT_CLIENT_ID

ARG FIREBASE_SERVICE_ACCOUNT_AUTH_URI

ARG FIREBASE_SERVICE_ACCOUNT_TOKEN_URI

ARG FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL

ARG FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL

ENV DATABASE_URL ${DATABASE_URL}

ENV FIREBASE_SERVICE_ACCOUNT_TYPE ${FIREBASE_SERVICE_ACCOUNT_TYPE}

ENV FIREBASE_SERVICE_ACCOUNT_PROJECT_ID ${FIREBASE_SERVICE_ACCOUNT_PROJECT_ID}

ENV FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID ${FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID}

ENV FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY ${FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY}

ENV FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL ${FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL}

ENV FIREBASE_SERVICE_ACCOUNT_CLIENT_ID ${FIREBASE_SERVICE_ACCOUNT_CLIENT_ID}

ENV FIREBASE_SERVICE_ACCOUNT_AUTH_URI ${FIREBASE_SERVICE_ACCOUNT_AUTH_URI}

ENV FIREBASE_SERVICE_ACCOUNT_TOKEN_URI ${FIREBASE_SERVICE_ACCOUNT_TOKEN_URI}

ENV FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL ${FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL}

ENV FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL ${FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL}

WORKDIR /app

COPY . .

RUN npm install ci && npm run build

ENTRYPOINT ["npm", "run", "start:prod"]
