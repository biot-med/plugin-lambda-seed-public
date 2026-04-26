# Version 3.3.2

**Release Date** 20 Apr 2026

## Changes

- Bumped `axios` to 1.15.1 and related transitive dependencies.
- Added `.env` to `.gitignore`.
- Removed a dead comment in `scripts/pack.js`.

# Version 3.3.1

**Release Date** 20 Jan 2026

## Changes

- Replaced `jsonwebtoken` with `jose` for JWT verification in `src/services/auth/authenticate.js`
- Security hardening and dependency updates (Snyk vulnerability fixes)

# Version 3.3.0

**Release Date** 24 Nov 2025

## Changes

- Added token caching to login function to reduce API calls

# Version 3.2.0

**Release Date** 30 June 24

## Changes

- Refactored authentication services - moved authentication logic to `src/services/auth/` folder
  - Consolidated `authenticate` function from `src/utils/authenticate.js` to `src/services/auth/authenticate.js`
  - Split `login` function into separate file `src/services/auth/login.js`
  - Removed duplicate `authenticate.js` files from individual hook folders (interceptorPre, interceptorPost, interceptorPostEntity, notification)
  - All hook types now import `authenticate` and `login` from centralized `src/services/auth/index.js`

- Created new backend service layer - added `src/services/biot/` folder with reusable BioT API helpers
  - Added `src/services/biot/base.js` with common CRUD operations: `search`, `get`, `create`, `update`, and `baseDelete`
  - Added `src/services/biot/patient.js` with patient-specific API functions (`searchPatients`, `searchOnlyFemalePatients`) for usage example. 
  - Replaced `callToAPIExample` utility with new service-based approach in all perform functions

- Updated dependencies (Snyk vulnerability fixes)
  - Upgraded `axios` from `0.27.2` to `^1.12.0`
  - Upgraded `jsonwebtoken` from `8.5.1` to `^9.0.0`

## Bug fixes
- Improved error handling across all hook types
  - Updated all `createErrorResponse.js` files to properly handle axios errors with correct status codes
  - Removed deprecated `API_CALL_ERROR` handling in favor of direct axios error handling
  - Fixed internal server error code to use consistent string format (`"INTERNAL_SERVER_ERROR"`)
  - Error responses now properly include status codes, trace IDs, and formatted error messages from API responses


# Version 3.1.1

**Release Date** 30 June 24

## Changes

- Added support for events from scheduler


# Version 3.1.0

**Release Date** 10 SEP 23

## Changes

- Changed get public key from new api GET /v1/security/public-key

# Version 3.0.2

**Release Date** 20 Jul 23

## Bug Fix

- localRunner - added await before calling handler function
# Version 3.0.0

**Release Date** 03 MAY 23

## Breaking changes

- Changed 'trace-id' header to 'traceparent' in w3c format.

# Version 2.0.1

**Release Date** 19 APR 23

## Bugfixes 

- Fixed import issues

# Version 2.0.0

**Release Date** 17 APR 23

## Breaking changes

- Changed 'x-b3-traceid' to 'trace-id'

# Version 1.1.5

**Released by**: Ori Roll **Release Date** 21 FEB 23

## Bug fixes

- Hooktype is case insensitive

# Version 1.1.4

**Released by**: Ori Roll **Release Date** 08 NOV 22

## Changes

- Hooktype is case insensitive

# Version 1.1.2

**Released by**: Ori Roll **Release Date** 07 NOV 22

## Changes

- V bump
# Version 1.1.1

**Released by**: Ori Roll **Release Date** 06 NOV 22

## Changes

- Added the prefix BIOT to env vars
- Some cleanups

# Version 0.0.2

**Released by**: Ori Roll **Release Date** 22 SEP 22

## Changes

- The lambda is more generic now and can apply to interceptors, notifications and other triggers
  - Added folders for different hook types
  - Added a mapper by hooktype for the functions in the folders
  - Created data extraction functions for each
  - Created distinct perform functions for each with specific responses returned
  - Modified the error responses to work with interceptors

# Version 0.0.1

**Released by**: Ori Roll **Release Date** <!-- Jun 20 2022 -->

## Changes

- Branched out of previous lambda seed
- Added functionality :
  - configureLogger
  - authenticate - authorization function that uses JWT token
  - login - login with service user
  - apiCallPatients - call to BioT API
  - errorResponseCreator - for responses with errors
