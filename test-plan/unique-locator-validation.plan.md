# Unique Locator Validation

## Application Overview

Validate that Playwright interactions use unique, user-facing locators and no longer fail because a locator resolves to multiple matching elements. The current browser starts blank, so scenarios assume the target page is loaded by the test setup before each case.

## Test Scenarios

### 1. Locator uniqueness and interaction behavior

**Seed:** `tests/Practice-3API.spec.js`

#### 1.1. Interact with the intended element using a unique locator

**File:** `tests/locator-validation/unique-locator.spec.js`

**Steps:**
  1. Start from a fresh browser context and load the page under test.
    - expect: The page loads successfully in the expected initial state.
  2. Inspect the target control and identify a stable unique attribute or accessible name, such as an exact role/name, label, test id, or a locator filtered by its surrounding container.
    - expect: The selected locator resolves to exactly one element.
    - expect: The locator does not rely on an unnecessarily broad text or CSS selector.
  3. Use the unique locator to perform the intended action.
    - expect: The intended control is activated.
    - expect: No strict-mode or multiple-elements locator error is reported.
  4. Verify the resulting page state or response.
    - expect: The expected state change or API result is visible.
    - expect: No unrelated matching control is changed.

#### 1.2. Reject ambiguous locators and preserve deterministic targeting

**File:** `tests/locator-validation/ambiguous-locator-negative.spec.js`

**Steps:**
  1. Start from a fresh browser context and load a page containing multiple elements with the same visible text or role.
    - expect: The duplicate controls are rendered as expected.
  2. Evaluate the broad locator that previously matched multiple elements.
    - expect: The locator count is greater than one and the ambiguity is detectable before interaction.
  3. Replace it with a unique locator using exact accessible name, a parent-container filter, a test id, or another stable distinguishing attribute.
    - expect: The replacement locator count is exactly one.
  4. Activate the replacement locator and verify the result.
    - expect: Only the intended duplicate control is activated.
    - expect: The test completes without a strict-mode violation.

#### 1.3. Fail clearly when a supposedly unique locator is missing or duplicated

**File:** `tests/locator-validation/locator-validation-errors.spec.js`

**Steps:**
  1. Start from a fresh browser context and load the page in a state where the target control is absent or duplicated.
    - expect: The setup state is reproducible.
  2. Resolve the locator and assert that it has exactly one match before interacting.
    - expect: The assertion fails with a clear locator-count diagnostic when the element is missing or duplicated.
    - expect: The failure identifies the selector and observed count.
  3. Correct the page state or selector, then rerun the interaction.
    - expect: The corrected locator resolves uniquely and the intended action succeeds.
