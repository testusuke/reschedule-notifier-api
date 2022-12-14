# reschedule-notifier-api

REST-API of web app that notify rescheduled information.

## Installation

1. Edit ``.env`` file. you need some settings, mysql(mariadb), jwt secret and default password.  
**PUBLIC Key supports only PEM format.**
```dotenv
# MySQL Setting
DATABASE_URL="mysql://root:password@localhost:3308/rna_db"

# JWT secret
JWT_PUBLIC_KEY="-----BEGIN RSA PUBLIC KEY-----\n
                ...\n
                -----END RSA PUBLIC KEY-----"
JWT_SECRET_KEY="-----BEGIN RSA PRIVATE KEY-----\n
                ...\n
                -----END RSA PRIVATE KEY-----"

# System user password
SYSTEM_USER_PASSWORD="PASSWORD"

# Port
PORT=3000
```

2. Build and Run the application
```shell
npm run start:prod
```

## Develop

### Git commit

#### Template

```
<type>: <subject>
```

#### Type

- **feat**: A new feature
- **change**: Change a feature or remove
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## License

MIT License  
Copyright (c) 2022 testusuke
