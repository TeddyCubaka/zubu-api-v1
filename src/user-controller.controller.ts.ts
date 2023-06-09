import { Body, Controller, Get, Param, Post } from '@nestjs/common';

const visitors: Visitor[] = [
  { name: 'david', id: 0 },
  { name: 'ciza', id: 1 },
  { name: 'albet', id: 2 },
  { name: 'rambo', id: 3 },
  { name: 'miker', id: 4 },
  { name: 'shtuka', id: 5 },
  { name: 'cito', id: 6 },
  { name: 'amare', id: 7 },
  { name: 'davido', id: 8 },
  { name: 'brown', id: 9 },
];

@Controller('user')
export class UserController {
  @Get()
  getVisitor(): Visitor[] {
    return visitors;
  }

  @Get('/:id')
  getOneDogs(@Param('id') id: number): Visitor {
    return this.getVisitor().find((visitor) => visitor.id == id);
  }

  @Post()
  createUser(@Body() newVisitor: Visitor): Visitor {
    const visitorData: Visitor = {
      id: visitors.length,
      name: newVisitor.name,
    };
    visitors.push(visitorData);
    return visitors.at(-1);
  }
}

interface Visitor {
  name: string;
  id: number;
}
