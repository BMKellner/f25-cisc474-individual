import { Link } from './links/entities/link.entity';

import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';

import {
  UserOut,
  UserCreateIn,
  UserUpdateIn,
} from './users/dto/user.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export const users = {
  dto: {
    UserOut,
    UserCreateIn,
    UserUpdateIn,
  },
};
