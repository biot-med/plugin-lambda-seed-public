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
