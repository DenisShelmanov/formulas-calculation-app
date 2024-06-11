# Formulas calculation app

This Next.js project provides an interface for creating variables and formulas with an advanced formula input component featuring tag-based inputs, operand support, and autocomplete suggestions. It integrates Zustand for local state management, React Query for handling API state, and Prisma for database interactions with PostgreSQL.

## Features

- creating formulas and variables
- deleting created variables and formulas
- calculation and handling error
- supporting various arithmetic operations between tags
- writing between tags
- deleting tags inside the formula input
- autocomplete suggestions
- editing the contents of variable's tag, similar to the example platform

## Suggestions for improvements

As for as there were some time limits, some functionalities are in an MVP version and could be improved in the future :

- optimize updating formulas and variables: such all data is saved into the Postgres database via setting up correct relationships could improve performance of updating and recalculation formulas and variables (for instance, in case the user updates the formula and this formula is a part of other formulas)
- add optimistic updates for ui variables content, based on changed variable value
- add minor cases for validation of expression on the client's part to reduce overload on the server
- add type converting (this ability is laid down on the Database level but not fully implemented)
