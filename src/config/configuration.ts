export default ()=>({
    environment:process.env.NODE_ENV,
    PORT:process.env.PORT,
    HOST:process.env.HOST,
    database:{
        host:process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT,10) || 5432,
        username:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        name: process.env.DB_NAME

    },
    redis:{
        host:process.env.REDIS_HOST,
        port:6379
    },
    stripe:{
        secretKey:process.env.STRIPE_SECRET_KEY
    },
    jwt:{
        secretKey:process.env.JWT_SECRET_KEY
    },
    SSL_CERT:process.env.SSL_CERT
})