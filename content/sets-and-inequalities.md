# CSCA Mathematics — Sets & Inequalities
## Complete Lecture Notes + 100 Practice Problems
### AI-agent-ready Markdown specification

> **Purpose:** This document is designed to be given directly to an AI coding/content agent. It contains the teaching content, formulas, problem-solving methods, traps, and 100 original CSCA-style practice problems for the **Sets & Inequalities** chapter.

---

# 1. Chapter Overview

## Official-topic focus

The CSCA Mathematics syllabus includes:

1. **Sets**
   - Definition, operations, and representation of sets.
2. **Inequalities**
   - Basic properties and solution methods, including quadratic and rational inequalities.

The exam format is multiple-choice mathematics, so students should be trained not only to calculate but also to **recognize the problem type quickly**.

## Learning objectives

After completing this chapter, a student should be able to:

- Read and write sets in different forms.
- Understand membership and non-membership.
- Identify subsets and proper subsets.
- Count subsets and elements.
- Perform union, intersection, difference, and complement.
- Use Venn diagrams and inclusion-exclusion.
- Solve set-counting problems involving “at least,” “only,” “exactly,” and “neither.”
- Understand Cartesian products.
- Solve linear, compound, absolute-value, quadratic, polynomial, and rational inequalities.
- Use sign charts correctly.
- Handle excluded values in rational inequalities.
- Translate word problems into inequalities.
- Recognize common traps and choose efficient methods.

---

# 2. SETS

## 2.1 What is a set?

A **set** is a well-defined collection of distinct objects.

Examples:

- A = {1, 2, 3, 4}
- B = {a, e, i, o, u}
- C = {x ∈ R : x > 0}

The objects inside a set are called **elements** or **members**.

### Membership notation

If x belongs to A:

\[
x \in A
\]

If x does not belong to A:

\[
x \notin A
\]

### Important distinction

- `x ∈ A` means **x is an element of A**.
- `{x} ⊆ A` means **the set containing x is a subset of A**.

These are not the same statement.

---

# 3. Ways to Represent a Set

## 3.1 Roster / listing form

List the elements explicitly.

Example:

\[
A=\{2,4,6,8\}
\]

## 3.2 Set-builder form

Describe a rule that determines the elements.

Example:

\[
A=\{x\in\mathbb Z: x\text{ is even and }2\le x\le8\}
\]

## 3.3 Descriptive form

Describe the set in words.

Example:

> A is the set of positive even integers not greater than 8.

### Exam skill

Students should be able to convert between all three forms.

---

# 4. Important Number Sets

Common notation:

- \(\mathbb N\): natural numbers
- \(\mathbb Z\): integers
- \(\mathbb Q\): rational numbers
- \(\mathbb R\): real numbers

Typical inclusion:

\[
\mathbb N\subseteq\mathbb Z\subseteq\mathbb Q\subseteq\mathbb R
\]

**Note:** Some textbooks include 0 in \(\mathbb N\), while others start at 1. Always follow the convention used by the question.

---

# 5. Types of Sets

## Empty set

A set with no elements:

\[
\varnothing
\]

Example:

\[
A=\{x\in\mathbb R:x^2+1=0\}
\]

There is no real x, so A is empty.

## Singleton set

A set containing exactly one element.

\[
A=\{5\}
\]

## Finite set

A set containing a finite number of elements.

## Infinite set

A set containing infinitely many elements.

Example:

\[
\mathbb N=\{1,2,3,\ldots\}
\]

---

# 6. Equality of Sets

Two sets are equal when they contain exactly the same elements.

\[
A=B
\]

if and only if every element of A is in B and every element of B is in A.

### Order does not matter

\[
\{1,2,3\}=\{3,2,1\}
\]

### Repetition does not create new elements

\[
\{1,1,2,2,3\}=\{1,2,3\}
\]

---

# 7. Subsets

A is a subset of B if **every element of A is also an element of B**.

\[
A\subseteq B
\]

Examples:

\[
\{1,2\}\subseteq\{1,2,3,4\}
\]

Every set is a subset of itself:

\[
A\subseteq A
\]

The empty set is a subset of every set:

\[
\varnothing\subseteq A
\]

## Proper subset

A is a proper subset of B when:

\[
A\subseteq B
\]

and

\[
A\ne B
\]

Often written:

\[
A\subset B
\]

---

# 8. Counting Subsets

If a set has n distinct elements, the number of subsets is:

\[
\boxed{2^n}
\]

Why?

Each element has two choices:

- included
- not included

So:

\[
2\times2\times\cdots\times2=2^n
\]

## Proper subsets

\[
\boxed{2^n-1}
\]

because the set itself is excluded.

### Example

A has 4 elements.

Total subsets:

\[
2^4=16
\]

Proper subsets:

\[
16-1=15
\]

---

# 9. Power Set

The power set of A is the set of **all subsets of A**.

Notation:

\[
\mathcal P(A)
\]

If:

\[
A=\{1,2\}
\]

then:

\[
\mathcal P(A)=\{\varnothing,\{1\},\{2\},\{1,2\}\}
\]

Therefore:

\[
|\mathcal P(A)|=2^{|A|}
\]

---

# 10. Cardinality

The number of elements in a finite set A is called its cardinality.

Notation:

\[
|A|
\]

or sometimes:

\[
n(A)
\]

Example:

\[
A=\{2,4,6,8\}
\]

Then:

\[
|A|=4
\]

---

# 11. Set Operations

Let:

\[
A=\{1,2,3,4\}
\]

and

\[
B=\{3,4,5,6\}
\]

## 11.1 Union

Union means elements in A **or** B, including elements in both.

\[
A\cup B
\]

Example:

\[
A\cup B=\{1,2,3,4,5,6\}
\]

### Memory trick

**Union = OR = combine**

---

## 11.2 Intersection

Intersection means elements common to both.

\[
A\cap B
\]

Example:

\[
A\cap B=\{3,4\}
\]

### Memory trick

**Intersection = AND = common**

---

## 11.3 Difference

\[
A-B
\]

means elements in A that are not in B.

Example:

\[
A-B=\{1,2\}
\]

But:

\[
B-A=\{5,6\}
\]

Therefore:

\[
A-B\ne B-A
\]

in general.

---

# 12. Universal Set and Complement

The **universal set** U contains all objects currently being considered.

The complement of A is:

\[
A^c
\]

It means elements in U that are not in A.

\[
A^c=U-A
\]

Example:

\[
U=\{1,2,3,4,5,6\}
\]

\[
A=\{1,2,3\}
\]

Then:

\[
A^c=\{4,5,6\}
\]

### Trap

You cannot determine A's complement without knowing the relevant universal set when the universe is not otherwise clear.

---

# 13. Important Set Laws

## Commutative laws

\[
A\cup B=B\cup A
\]

\[
A\cap B=B\cap A
\]

## Associative laws

\[
(A\cup B)\cup C=A\cup(B\cup C)
\]

\[
(A\cap B)\cap C=A\cap(B\cap C)
\]

## Distributive laws

\[
A\cap(B\cup C)=(A\cap B)\cup(A\cap C)
\]

\[
A\cup(B\cap C)=(A\cup B)\cap(A\cup C)
\]

## Identity laws

\[
A\cup\varnothing=A
\]

\[
A\cap U=A
\]

## Domination laws

\[
A\cup U=U
\]

\[
A\cap\varnothing=\varnothing
\]

## Idempotent laws

\[
A\cup A=A
\]

\[
A\cap A=A
\]

## Complement laws

\[
A\cup A^c=U
\]

\[
A\cap A^c=\varnothing
\]

\[
(A^c)^c=A
\]

---

# 14. De Morgan's Laws

Extremely important.

\[
\boxed{(A\cup B)^c=A^c\cap B^c}
\]

\[
\boxed{(A\cap B)^c=A^c\cup B^c}
\]

### Memory rule

When the complement moves inside:

- Union becomes intersection.
- Intersection becomes union.

This is closely related to logic:

- NOT (A OR B) = (NOT A) AND (NOT B)
- NOT (A AND B) = (NOT A) OR (NOT B)

---

# 15. Cardinality of a Union

For two finite sets:

\[
\boxed{|A\cup B|=|A|+|B|-|A\cap B|}
\]

Why subtract the intersection?

Because common elements are counted twice when adding |A| and |B|.

### Example

If:

\[
|A|=30,\quad |B|=25,\quad |A\cap B|=10
\]

then:

\[
|A\cup B|=30+25-10=45
\]

---

# 16. Three-Set Inclusion-Exclusion

For three sets:

\[
\boxed{
|A\cup B\cup C|
=
|A|+|B|+|C|
-|A\cap B|-|B\cap C|-|C\cap A|
+|A\cap B\cap C|
}
\]

### Why add the triple intersection again?

When pairwise intersections are subtracted, the triple intersection has been over-subtracted. Adding it back fixes the count.

---

# 17. Venn Diagram Language

Translate wording carefully.

| Wording | Mathematical idea |
|---|---|
| A or B | \(A\cup B\) |
| A and B | \(A\cap B\) |
| A but not B | \(A-B\) |
| neither A nor B | \((A\cup B)^c\) |
| at least one | union |
| both | intersection |
| exactly one of A and B | A only + B only |
| exactly two of A, B, C | pairwise-only regions |
| all three | triple intersection |
| only A | A excluding all other relevant sets |

### Important

In ordinary set problems, “or” usually means **inclusive OR** unless the question explicitly says “but not both.”

---

# 18. Cartesian Product

The Cartesian product of A and B is:

\[
A\times B
\]

It contains ordered pairs:

\[
(a,b)
\]

where:

\[
a\in A,\quad b\in B
\]

If:

\[
|A|=m,\quad |B|=n
\]

then:

\[
\boxed{|A\times B|=mn}
\]

### Order matters

Usually:

\[
(a,b)\ne(b,a)
\]

unless the coordinates happen to be equal.

---

# 19. INEQUALITIES

An inequality compares quantities.

Symbols:

\[
<,\quad >,\quad \le,\quad \ge
\]

Examples:

\[
x>3
\]

\[
2x+1\le9
\]

---

# 20. The Most Important Inequality Rule

When multiplying or dividing an inequality by a **negative number**, reverse the inequality sign.

Example:

\[
-2x>6
\]

Divide by -2:

\[
\boxed{x<-3}
\]

### Memory trick

**Negative multiplication/division = flip the sign.**

Adding or subtracting the same number does **not** reverse the sign.

---

# 21. Solving Linear Inequalities

Example:

\[
3x-5\le10
\]

Add 5:

\[
3x\le15
\]

Divide by 3:

\[
\boxed{x\le5}
\]

---

# 22. Compound Inequalities

Example:

\[
2<x+1\le7
\]

Subtract 1 everywhere:

\[
1<x\le6
\]

This is an **AND** condition.

So x must satisfy both inequalities.

---

# 23. AND vs OR

## AND

Both conditions must be true.

Example:

\[
x>2\quad\text{and}\quad x<7
\]

Therefore:

\[
2<x<7
\]

## OR

At least one condition must be true.

Example:

\[
x<-3\quad\text{or}\quad x>4
\]

The solution has two separate intervals.

### Exam trap

Do not automatically combine two inequalities. First decide whether the wording means AND or OR.

---

# 24. Interval Notation

Examples:

\[
x>2\quad\Rightarrow\quad(2,\infty)
\]

\[
x\ge2\quad\Rightarrow\quad[2,\infty)
\]

\[
x<5\quad\Rightarrow\quad(-\infty,5)
\]

\[
x\le5\quad\Rightarrow\quad(-\infty,5]
\]

### Infinity rule

Infinity is never an included endpoint:

\[
(\infty,\cdot)
\]

is not valid interval notation.

---

# 25. Absolute Value

Absolute value represents distance from zero.

\[
|x|
\]

is never negative.

## Equations

For \(a>0\):

\[
|x|=a
\]

means:

\[
x=a\quad\text{or}\quad x=-a
\]

More generally:

\[
|x-c|=a
\]

means x is distance a from c:

\[
x=c-a\quad\text{or}\quad x=c+a
\]

---

# 26. Absolute-Value Inequalities

For \(a>0\):

### Less than

\[
|x|<a
\iff
-a<x<a
\]

### Less than or equal

\[
|x|\le a
\iff
-a\le x\le a
\]

### Greater than

\[
|x|>a
\iff
x<-a\quad\text{or}\quad x>a
\]

### Greater than or equal

\[
|x|\ge a
\iff
x\le-a\quad\text{or}\quad x\ge a
\]

### Memory

\[
\boxed{<\text{ means AND}}
\]

\[
\boxed{>\text{ means OR}}
\]

---

# 27. Quadratic Inequalities

Typical form:

\[
ax^2+bx+c>0
\]

or:

\[
ax^2+bx+c\le0
\]

## Standard method

### Step 1
Move everything to one side.

### Step 2
Factor if possible.

### Step 3
Find critical values by setting factors equal to zero.

### Step 4
Put critical values on a number line.

### Step 5
Determine the sign in each interval.

### Step 6
Include/exclude boundary points according to the inequality.

---

# 28. Sign Pattern for a Simple Quadratic

If:

\[
(x-a)(x-b)
\]

with \(a<b\), then the sign pattern is:

- positive for \(x<a\)
- negative for \(a<x<b\)
- positive for \(x>b\)

So:

\[
(x-a)(x-b)>0
\]

gives:

\[
x<a\quad\text{or}\quad x>b
\]

while:

\[
(x-a)(x-b)<0
\]

gives:

\[
a<x<b
\]

This assumes the leading coefficient is positive.

---

# 29. Repeated Roots

Consider:

\[
(x-2)^2
\]

It is never negative.

For:

\[
(x-2)^2\ge0
\]

the answer is all real numbers.

For:

\[
(x-2)^2<0
\]

there is no real solution.

### Multiplicity rule

- Odd multiplicity: sign changes at the root.
- Even multiplicity: sign does not change at the root.

This is very useful for polynomial sign charts.

---

# 30. Polynomial Inequalities

For an expression such as:

\[
(x-1)(x+2)(x-4)\ge0
\]

the general method is:

1. Find every real zero.
2. Put zeros in increasing order.
3. Divide the number line into intervals.
4. Determine the sign in each interval.
5. Include zeros if the inequality contains equality (\(\ge\) or \(\le\)).

---

# 31. Rational Inequalities

Example:

\[
\frac{x-1}{x+3}>0
\]

There are two types of critical points:

1. Numerator = 0
2. Denominator = 0

Numerator:

\[
x-1=0\Rightarrow x=1
\]

Denominator:

\[
x+3=0\Rightarrow x=-3
\]

### Critical rule

A denominator-zero point is **always excluded**, even for \(\ge\) or \(\le\).

Then make a sign chart.

For this example:

\[
\boxed{x<-3\quad\text{or}\quad x>1}
\]

---

# 32. Why Denominator Zeros Are Excluded

At:

\[
x=-3
\]

the denominator becomes zero.

Division by zero is undefined.

Therefore:

\[
x=-3
\]

can never belong to the solution set.

This remains true even if algebraic simplification seems to cancel the factor.

---

# 33. Rational-Inequality Sign Chart

For:

\[
\frac{(x-a)(x-b)}{(x-c)(x-d)}
\]

the sign can only change at real zeros or undefined points.

### Procedure

1. Factor numerator and denominator.
2. Find numerator zeros.
3. Find denominator zeros.
4. Order all critical points.
5. Test one point in each interval.
6. Select intervals with the required sign.
7. Include numerator zeros when allowed.
8. Never include denominator zeros.

---

# 34. Two-Variable Inequalities

A linear inequality such as:

\[
y>2x+1
\]

describes a region of the coordinate plane.

Boundary:

\[
y=2x+1
\]

For:

- \(>\) or \(<\): boundary is not included.
- \(\ge\) or \(\le\): boundary is included.

### Graph memory

- \(y>f(x)\): shade above.
- \(y<f(x)\): shade below.

---

# 35. Word Problems

Common translations:

| Words | Symbol |
|---|---|
| greater than | \(>\) |
| less than | \(<\) |
| at least | \(\ge\) |
| at most | \(\le\) |
| no more than | \(\le\) |
| no less than | \(\ge\) |
| minimum | \(\ge\) |
| maximum | \(\le\) |
| more than | \(>\) |
| fewer than | \(<\) |

### Trap

“At least 10” means:

\[
x\ge10
\]

not \(x>10\).

“At most 10” means:

\[
x\le10
\]

not \(x<10\).

---

# 36. Fast CSCA Problem Recognition

When you see...

### “How many subsets?”
Use:

\[
2^n
\]

### “How many proper subsets?”
Use:

\[
2^n-1
\]

### “common”
Think:

\[
A\cap B
\]

### “either/or/at least one”
Think:

\[
A\cup B
\]

### “not in”
Think complement/difference.

### “students in both”
Think intersection.

### “total students in A or B”
Use inclusion-exclusion.

### Linear inequality
Isolate the variable and check for negative division/multiplication.

### Absolute value
Convert distance statement into AND/OR.

### Quadratic/polynomial
Find roots and use a sign chart.

### Rational
Find numerator and denominator critical points.

---

# 37. Master Formula Sheet

## Sets

\[
|P(A)|=2^{|A|}
\]

\[
\text{proper subsets}=2^n-1
\]

\[
A\cup B
\]

= union

\[
A\cap B
\]

= intersection

\[
A-B
\]

= A but not B

\[
A^c=U-A
\]

= complement

\[
|A\cup B|=|A|+|B|-|A\cap B|
\]

\[
|A\times B|=|A||B|
\]

## Three-set inclusion-exclusion

\[
|A\cup B\cup C|
=
|A|+|B|+|C|
-|A\cap B|-|B\cap C|-|C\cap A|
+|A\cap B\cap C|
\]

## Absolute value

\[
|x|<a\iff-a<x<a
\]

\[
|x|\le a\iff-a\le x\le a
\]

\[
|x|>a\iff x<-a\text{ or }x>a
\]

\[
|x|\ge a\iff x\le-a\text{ or }x\ge a
\]

## De Morgan

\[
(A\cup B)^c=A^c\cap B^c
\]

\[
(A\cap B)^c=A^c\cup B^c
\]

## Inequality sign

Multiplying/dividing by a negative:

\[
<\leftrightarrow>
\]

\[
\le\leftrightarrow\ge
\]

---

# 38. Common Traps

1. Confusing \(\in\) with \(\subseteq\).
2. Forgetting that the empty set is a subset of every set.
3. Counting repeated set elements multiple times.
4. Forgetting to subtract the intersection in union-counting problems.
5. Forgetting to add the triple intersection in three-set inclusion-exclusion.
6. Treating \(A-B\) and \(B-A\) as the same.
7. Forgetting the universal set when finding a complement.
8. Failing to reverse an inequality after division by a negative.
9. Treating an absolute-value “greater than” inequality as an AND condition.
10. Including denominator zeros in rational inequalities.
11. Including a quadratic root when the inequality is strict.
12. Forgetting that repeated roots do not change the sign.
13. Assuming a graph boundary is included for a strict inequality.
14. Misreading “at least” and “at most.”
15. Expanding a factored polynomial unnecessarily when a sign chart is faster.

---

# 39. 100 CSCA-Style Practice Problems

> **Important:** These are original practice questions written in a CSCA-style format. They are not claimed to be official past CSCA questions.

## Level A — Basic (1–35)

### 1.
If \(A=\{1,2,3,4\}\), which statement is true?

A. \(5\in A\)  
B. \(3\in A\)  
C. \(0\in A\)  
D. \(4\notin A\)

**Answer: B**

---

### 2.
If \(A=\{a,b,c\}\), then \(|A|=\)

A. 2  
B. 3  
C. 4  
D. 6

**Answer: B**

---

### 3.
Which is an empty set?

A. \(\{0\}\)  
B. \(\{x\in\mathbb R:x^2+1=0\}\)  
C. \(\{1\}\)  
D. \(\{x:x=x\}\)

**Answer: B**

---

### 4.
How many subsets does a 5-element set have?

A. 10  
B. 16  
C. 25  
D. 32

**Answer: D**

---

### 5.
How many proper subsets does a 5-element set have?

A. 30  
B. 31  
C. 32  
D. 25

**Answer: B**

---

### 6.
If \(A=\{1,2,3\}\) and \(B=\{3,4,5\}\), then \(A\cap B=\)

A. \(\{1,2\}\)  
B. \(\{4,5\}\)  
C. \(\{3\}\)  
D. \(\{1,2,3,4,5\}\)

**Answer: C**

---

### 7.
For the same A and B, \(A\cup B=\)

A. \(\{3\}\)  
B. \(\{1,2,4,5\}\)  
C. \(\{1,2,3,4,5\}\)  
D. \(\varnothing\)

**Answer: C**

---

### 8.
If \(A=\{1,2,3,4\}\) and \(B=\{2,4\}\), then \(A-B=\)

A. \(\{2,4\}\)  
B. \(\{1,3\}\)  
C. \(\{1,2,3,4\}\)  
D. \(\varnothing\)

**Answer: B**

---

### 9.
If \(U=\{1,2,3,4,5\}\) and \(A=\{1,3,5\}\), then \(A^c=\)

A. \(\{1,3,5\}\)  
B. \(\{2,4\}\)  
C. \(\{1,2,3,4,5\}\)  
D. \(\varnothing\)

**Answer: B**

---

### 10.
Which is always true?

A. \(A\subseteq\varnothing\)  
B. \(\varnothing\subseteq A\)  
C. \(A\in A\)  
D. \(A\not\subseteq A\)

**Answer: B**

---

### 11.
If \(A=\{1,2\}\), which is a subset of A?

A. \(\{1,3\}\)  
B. \(\{2\}\)  
C. \(\{3\}\)  
D. \(\{1,2,3\}\)

**Answer: B**

---

### 12.
Which statement about equal sets is correct?

A. Order must be identical.  
B. Repeated elements count separately.  
C. They must contain exactly the same elements.  
D. They must have different sizes.

**Answer: C**

---

### 13.
If \(|A|=7\), the number of subsets of A is:

A. 14  
B. 49  
C. 64  
D. 128

**Answer: D**

---

### 14.
If \(|A|=7\), the number of proper subsets is:

A. 127  
B. 128  
C. 64  
D. 49

**Answer: A**

---

### 15.
If \(|A|=4\) and \(|B|=3\), then \(|A\times B|=\)

A. 7  
B. 12  
C. 1  
D. 64

**Answer: B**

---

### 16.
If \(A=\{1,2\}\) and \(B=\{x,y,z\}\), how many ordered pairs are in \(A\times B\)?

A. 5  
B. 6  
C. 9  
D. 8

**Answer: B**

---

### 17.
Solve:

\[
x+3>7
\]

A. \(x>4\)  
B. \(x<4\)  
C. \(x\ge4\)  
D. \(x\le4\)

**Answer: A**

---

### 18.
Solve:

\[
2x\le10
\]

A. \(x\le5\)  
B. \(x\ge5\)  
C. \(x<5\)  
D. \(x>5\)

**Answer: A**

---

### 19.
Solve:

\[
-3x>12
\]

A. \(x>4\)  
B. \(x<-4\)  
C. \(x\ge-4\)  
D. \(x\le4\)

**Answer: B**

---

### 20.
Solve:

\[
x-2\ge5
\]

A. \(x\ge7\)  
B. \(x>7\)  
C. \(x\le7\)  
D. \(x<7\)

**Answer: A**

---

### 21.
Which interval represents \(x>3\)?

A. \([3,\infty)\)  
B. \((3,\infty)\)  
C. \((-\infty,3)\)  
D. \((-\infty,3]\)

**Answer: B**

---

### 22.
Which interval represents \(x\le2\)?

A. \((-\infty,2]\)  
B. \((-\infty,2)\)  
C. \([2,\infty)\)  
D. \((2,\infty)\)

**Answer: A**

---

### 23.
Solve:

\[
|x|=4
\]

A. \(x=4\) only  
B. \(x=-4\) only  
C. \(x=\pm4\)  
D. \(x=0\)

**Answer: C**

---

### 24.
Solve:

\[
|x|<3
\]

A. \(x<-3\) or \(x>3\)  
B. \(-3<x<3\)  
C. \(-3\le x\le3\)  
D. \(x>3\)

**Answer: B**

---

### 25.
Solve:

\[
|x|>2
\]

A. \(-2<x<2\)  
B. \(x\le2\)  
C. \(x<-2\) or \(x>2\)  
D. \(x=2\)

**Answer: C**

---

### 26.
Solve:

\[
x^2-9<0
\]

A. \(x<-3\) or \(x>3\)  
B. \(-3<x<3\)  
C. \(x\le-3\) or \(x\ge3\)  
D. all real x

**Answer: B**

---

### 27.
Solve:

\[
(x-2)(x-5)>0
\]

A. \(2<x<5\)  
B. \(x<2\) or \(x>5\)  
C. \(x\le2\)  
D. \(x\ge5\)

**Answer: B**

---

### 28.
Solve:

\[
(x-1)(x+3)<0
\]

A. \(x<-3\) or \(x>1\)  
B. \(-3<x<1\)  
C. \(x\le-3\)  
D. \(x\ge1\)

**Answer: B**

---

### 29.
Solve:

\[
(x-4)^2\ge0
\]

A. no solution  
B. \(x=4\) only  
C. all real x  
D. \(x>4\)

**Answer: C**

---

### 30.
Solve:

\[
\frac{x-2}{x+1}>0
\]

A. \(-1<x<2\)  
B. \(x<-1\) or \(x>2\)  
C. \(x>-1\)  
D. \(x<2\)

**Answer: B**

---

### 31.
Which value is excluded from:

\[
\frac{x+2}{x-5}
\]

A. -2  
B. 0  
C. 2  
D. 5

**Answer: D**

---

### 32.
“At least 8” means:

A. \(x>8\)  
B. \(x<8\)  
C. \(x\ge8\)  
D. \(x\le8\)

**Answer: C**

---

### 33.
“At most 12” means:

A. \(x<12\)  
B. \(x\le12\)  
C. \(x>12\)  
D. \(x\ge12\)

**Answer: B**

---

### 34.
Which operation represents “common elements”?

A. union  
B. complement  
C. intersection  
D. difference

**Answer: C**

---

### 35.
Which operation represents “elements in A but not B”?

A. \(A\cup B\)  
B. \(A\cap B\)  
C. \(A-B\)  
D. \(B-A\)

**Answer: C**

---

## Level B — Intermediate (36–70)

### 36.
If \(|A|=20\), \(|B|=15\), and \(|A\cap B|=6\), find \(|A\cup B|\).

A. 29  
B. 35  
C. 41  
D. 14

**Answer: A**

---

### 37.
In a class of 50 students, 30 study Mathematics, 25 study Physics, and 10 study both. How many study at least one?

A. 35  
B. 40  
C. 45  
D. 50

**Answer: C**

---

### 38.
Using the information in Question 37, how many study neither?

A. 5  
B. 10  
C. 15  
D. 20

**Answer: A**

---

### 39.
If \(|A|=18\), \(|B|=12\), and \(|A\cup B|=25\), then \(|A\cap B|=\)

A. 3  
B. 5  
C. 7  
D. 10

**Answer: C**

---

### 40.
If \(A\subseteq B\), which must be true?

A. \(A\cap B=\varnothing\)  
B. \(A\cup B=A\)  
C. \(A\cap B=A\)  
D. \(A=B^c\)

**Answer: C**

---

### 41.
If \(A\subseteq B\), which statement is always true?

A. \(B\subseteq A\)  
B. \(A\cap B=A\)  
C. \(A\cup B=A\)  
D. \(A-B=B\)

**Answer: B**

---

### 42.
If \(|A|=n\) and \(|B|=m\), then the maximum possible value of \(|A\cup B|\) is:

A. \(nm\)  
B. \(n+m\)  
C. \(n-m\)  
D. \(n/m\)

**Answer: B**

---

### 43.
If \(|A|=n\) and \(|B|=m\), the minimum possible value of \(|A\cup B|\) is:

A. 0  
B. \(\min(n,m)\)  
C. \(n+m\)  
D. \(\max(n,m)\)

**Answer: D**

---

### 44.
If \(|A|=12\), \(|B|=9\), and the sets are disjoint, then \(|A\cup B|=\)

A. 3  
B. 9  
C. 12  
D. 21

**Answer: D**

---

### 45.
If \(A\cap B=\varnothing\), the sets are called:

A. equal  
B. disjoint  
C. universal  
D. complementary

**Answer: B**

---

### 46.
If \(|U|=60\) and \(|A|=35\), then \(|A^c|=\)

A. 25  
B. 35  
C. 60  
D. 95

**Answer: A**

---

### 47.
Simplify:

\[
(A\cup B)^c
\]

A. \(A^c\cup B^c\)  
B. \(A^c\cap B^c\)  
C. \(A\cap B\)  
D. \(A\cup B\)

**Answer: B**

---

### 48.
Simplify:

\[
(A\cap B)^c
\]

A. \(A^c\cap B^c\)  
B. \(A^c\cup B^c\)  
C. \(A\cap B\)  
D. \(A\cup B\)

**Answer: B**

---

### 49.
If \(|A|=3\) and \(|B|=4\), how many elements can \(A\cup B\) have at most?

A. 7  
B. 12  
C. 4  
D. 1

**Answer: A**

---

### 50.
If \(|A|=3\) and \(|B|=4\), how many elements can \(A\cup B\) have at least?

A. 0  
B. 3  
C. 4  
D. 7

**Answer: C**

---

### 51.
Solve:

\[
3x-7>2x+5
\]

A. \(x>12\)  
B. \(x<-12\)  
C. \(x>2\)  
D. \(x<2\)

**Answer: A**

---

### 52.
Solve:

\[
5-2x\le11
\]

A. \(x\le-3\)  
B. \(x\ge-3\)  
C. \(x\le3\)  
D. \(x\ge3\)

**Answer: B**

---

### 53.
Solve:

\[
-4\le2x+2<8
\]

A. \(-3\le x<3\)  
B. \(-2\le x<4\)  
C. \(-4\le x<8\)  
D. \(x<-3\)

**Answer: A**

---

### 54.
Solve:

\[
|x-3|\le5
\]

A. \(x\le-2\) or \(x\ge8\)  
B. \(-2\le x\le8\)  
C. \(-5\le x\le5\)  
D. \(x\ge8\)

**Answer: B**

---

### 55.
Solve:

\[
|2x+1|<5
\]

A. \(-3<x<2\)  
B. \(-2<x<3\)  
C. \(x<-3\) or \(x>2\)  
D. \(-5<x<5\)

**Answer: A**

---

### 56.
Solve:

\[
|3x-2|\ge7
\]

A. \(-5/3\le x\le3\)  
B. \(x\le-5/3\) or \(x\ge3\)  
C. \(-3\le x\le5/3\)  
D. \(x\ge5/3\)

**Answer: B**

---

### 57.
Solve:

\[
x^2-5x+6\le0
\]

A. \(x\le2\) or \(x\ge3\)  
B. \(2\le x\le3\)  
C. \(x<2\)  
D. \(x>3\)

**Answer: B**

---

### 58.
Solve:

\[
x^2-7x+10>0
\]

A. \(2<x<5\)  
B. \(x<2\) or \(x>5\)  
C. \(x\le2\)  
D. \(x\ge5\)

**Answer: B**

---

### 59.
Solve:

\[
x^2-4x\ge0
\]

A. \(0\le x\le4\)  
B. \(x\le0\) or \(x\ge4\)  
C. \(x<0\)  
D. \(x>4\)

**Answer: B**

---

### 60.
Solve:

\[
x^2+2x-8<0
\]

A. \(x<-4\) or \(x>2\)  
B. \(-4<x<2\)  
C. \(x\le-4\)  
D. \(x\ge2\)

**Answer: B**

---

### 61.
Solve:

\[
(x+1)(x-2)(x-4)>0
\]

A. \((-4,-1)\cup(2,4)\)  
B. \((-1,2)\cup(4,\infty)\)  
C. \((-\infty,-1)\cup(2,4)\)  
D. \((-\infty,-1)\cup(2,4)\)

**Answer: B**

---

### 62.
Solve:

\[
(x-1)^2(x+2)<0
\]

A. \(x<-2\)  
B. \(-2<x<1\)  
C. \(x>1\)  
D. all real x

**Answer: A**

> Correction applied in app data: original key said B, but \((x-1)^2 \ge 0\) (zero only at \(x=1\), excluded by strict inequality), so the sign comes from \((x+2)<0\), giving \(x<-2\).

---

### 63.
Solve:

\[
(x-3)^2(x+1)\ge0
\]

A. \(x\ge-1\)  
B. \(x<-1\)  
C. \(x\le-1\)  
D. \(-1\le x\le3\)

**Answer: A**

---

### 64.
Solve:

\[
\frac{x-3}{x+2}\ge0
\]

A. \((-2,3)\)  
B. \((-\infty,-2)\cup[3,\infty)\)  
C. \((-\infty,-2]\cup[3,\infty)\)  
D. \([-2,3]\)

**Answer: B**

---

### 65.
Solve:

\[
\frac{x+1}{x-4}<0
\]

A. \(x<-1\) or \(x>4\)  
B. \(-1<x<4\)  
C. \(x\le-1\)  
D. \(x\ge4\)

**Answer: B**

---

### 66.
Solve:

\[
\frac{(x-2)(x+3)}{x-1}>0
\]

A. \((-3,1)\cup(2,\infty)\)  
B. \((-\infty,-3)\cup(1,2)\)  
C. \((-\infty,-3)\cup(2,\infty)\)  
D. \((-3,2)\)

**Answer: A**

> Correction applied in app data: sign chart on critical points \(-3, 1, 2\) gives \((-3,1)\cup(2,\infty)\). Original options duplicated B/C and the key was wrong.

---

### 67.
Which point must be excluded when solving:

\[
\frac{(x-2)(x+1)}{x-5}\ge0?
\]

A. -1  
B. 2  
C. 5  
D. 0

**Answer: C**

---

### 68.
Solve:

\[
\frac{x-2}{x-5}\le0
\]

A. \((-\infty,2]\cup(5,\infty)\)  
B. \([2,5)\)  
C. \((2,5]\)  
D. \((-\infty,5)\)

**Answer: B**

---

### 69.
The solution of \(y>3x-2\) lies:

A. below the line \(y=3x-2\)  
B. above the line \(y=3x-2\)  
C. only on the line  
D. nowhere

**Answer: B**

---

### 70.
For a strict inequality \(y<2x+1\), the boundary line should be:

A. solid  
B. dashed  
C. vertical  
D. omitted

**Answer: B**

---

## Level C — Advanced (71–100)

### 71.
In a group of 100 students, 60 study Mathematics, 50 study Physics, and 20 study both. How many study neither?

A. 0  
B. 10  
C. 20  
D. 30

**Answer: B**

---

### 72.
In a group of 120 students:

\[
|A|=70,\quad|B|=60,\quad|C|=50
\]

\[
|A\cap B|=30,\quad|B\cap C|=25,\quad|C\cap A|=20
\]

and:

\[
|A\cap B\cap C|=10.
\]

How many are in at least one set?

A. 105  
B. 115  
C. 125  
D. 135

**Answer: B**

Calculation:

\[
70+60+50-30-25-20+10=115
\]

---

### 73.
Using Question 72, how many are in none of the three sets?

A. 0  
B. 5  
C. 10  
D. 15

**Answer: B**

---

### 74.
Using the data from Question 72, how many are in A only?

First calculate:

\[
A\text{ only}=|A|-|A\cap B|-|A\cap C|+|A\cap B\cap C|
\]

A. 20  
B. 30  
C. 40  
D. 50

**Answer: B**

---

### 75.
If a set has 10 elements, the number of subsets containing a particular fixed element is:

A. \(2^{10}\)  
B. \(2^9\)  
C. \(10^2\)  
D. 9

**Answer: B**

---

### 76.
If a set has 8 elements, how many subsets contain exactly 3 elements?

A. 24  
B. 56  
C. 64  
D. 512

**Answer: B**

---

### 77.
If \(|A|=5\), \(|B|=7\), and \(|A\cap B|=3\), find:

\[
|A-B|
\]

A. 2  
B. 3  
C. 4  
D. 5

**Answer: A**

---

### 78.
If:

\[
|A|=15,\quad |B|=12,\quad |A\cup B|=20
\]

then:

\[
|A\cap B|=
\]

A. 5  
B. 7  
C. 8  
D. 10

**Answer: B**

---

### 79.
Solve:

\[
2x^2-5x-3>0
\]

A. \(-1/2<x<3\)  
B. \(x<-1/2\) or \(x>3\)  
C. \(x\le-1/2\)  
D. \(x\ge3\)

**Answer: B**

---

### 80.
Solve:

\[
3x^2+x-2\le0
\]

A. \(x\le-1\) or \(x\ge2/3\)  
B. \(-1\le x\le2/3\)  
C. \(-2/3\le x\le1\)  
D. \(x<-1\)

**Answer: B**

---

### 81.
Solve:

\[
(x-1)(x+2)(x-5)\le0
\]

A. \((-\infty,-2]\cup[1,5]\)  
B. \([-2,1]\cup[5,\infty)\)  
C. \((-2,1)\cup(5,\infty)\)  
D. all real x

**Answer: A**

---

### 82.
Solve:

\[
(x+3)^2(x-1)(x-4)>0
\]

A. \((-\infty,-3)\cup(-3,1)\cup(4,\infty)\)  
B. \(1<x<4\)  
C. \(x<-3\)  
D. \(-3<x<1\)

**Answer: A**

> Correction applied in app data: the repeated factor \((x+3)^2\) is zero at \(x=-3\), which a strict \(>0\) excludes.

---

### 83.
Solve:

\[
(x-2)^2(x+1)^3<0
\]

A. \(x<-1\)  
B. \(-1<x<2\)  
C. \(x>2\)  
D. all real x

**Answer: A**

Explanation: \((x-2)^2\) is nonnegative and does not change sign; \((x+1)^3\) is negative for \(x<-1\).

---

### 84.
Solve:

\[
\frac{x^2-9}{x-1}\ge0
\]

A. \((-\infty,-3]\cup[1,3]\)  
B. \((-\infty,-3]\cup(1,3]\)  
C. \([-3,1)\cup[3,\infty)\)  
D. \([-3,3]\)

**Answer: C**

> Correction applied in app data: testing intervals on critical points \(-3, 1, 3\) (with \(x=1\) excluded) gives \([-3,1)\cup[3,\infty)\). The original key (B) fails at e.g. \(x=0\), where the expression equals \(9 \ge 0\) but B excludes 0.

---

### 85.
Solve:

\[
\frac{x^2-4}{x+3}<0
\]

A. \((-\infty,-3)\cup(-2,2)\)  
B. \((-3,-2)\cup(2,\infty)\)  
C. \((-3,2)\)  
D. \((-\infty,2)\)

**Answer: A**

> Correction applied in app data: testing intervals on critical points \(-3, -2, 2\) gives \((-\infty,-3)\cup(-2,2)\). The original key (B) fails at e.g. \(x=0\), where the expression equals \(-4/3 < 0\) but B excludes 0.

---

### 86.
Solve:

\[
\frac{(x-1)(x-4)}{(x+2)(x-3)}>0
\]

A. \((-\infty,-2)\cup(1,3)\cup(4,\infty)\)  
B. \((-2,1)\cup(3,4)\)  
C. \((-\infty,-2)\cup(-2,1)\)  
D. \((1,3)\)

**Answer: A**

---

### 87.
Solve:

\[
\frac{(x+1)^2(x-2)}{x-4}\le0
\]

A. \(\{-1\}\cup[2,4)\)  
B. \((-\infty,2]\cup(4,\infty)\)  
C. \([-1,2]\cup[4,\infty)\)  
D. \((-\infty,-1)\)

**Answer: A**

> Correction applied in app data: for \(x < -1\), \((x+1)^2 > 0\) and \((x-2)/(x-4) > 0\), so only the zero \(x=-1\) itself (plus \([2,4)\)) satisfies \(\le 0\).

---

### 88.
Solve:

\[
|2x-3|<|x+1|
\]

A. \(x<-4\)  
B. \(2/3<x<4\)  
C. \(x<2/3\)  
D. all real x

**Answer: B**

> Correction applied in app data: squaring gives \((2x-3)^2<(x+1)^2\), i.e. \(3x^2-14x+8<0\) with roots \(x=2/3, 4\), so \(2/3<x<4\). The original options contained no correct answer.

---

### 89.
Solve:

\[
|x-2|+|x+2|\le6
\]

A. \(-3\le x\le3\)  
B. \(-2\le x\le2\)  
C. \(-4\le x\le4\)  
D. all real x

**Answer: A**

---

### 90.
Solve:

\[
|x-1|>3
\]

A. \(-2<x<4\)  
B. \(x<-2\) or \(x>4\)  
C. \(x\le-2\)  
D. \(x\ge4\)

**Answer: B**

---

### 91.
Find all real x satisfying:

\[
x^2-6x+9<0
\]

A. \(x<3\)  
B. \(x>3\)  
C. \(x=3\)  
D. no real solution

**Answer: D**

Because:

\[
x^2-6x+9=(x-3)^2\ge0
\]

---

### 92.
Solve:

\[
(x-1)^2(x+4)^2>0
\]

A. all real x  
B. \(x\ne1,-4\)  
C. \(x>1\)  
D. \(-4<x<1\)

**Answer: B**

---

### 93.
Solve:

\[
\frac{1}{x-2}>0
\]

A. \(x>2\)  
B. \(x<2\)  
C. \(x\ne2\)  
D. all real x

**Answer: A**

---

### 94.
Solve:

\[
\frac{1}{(x-2)(x+3)}\le0
\]

A. \((-3,2)\)  
B. \((-\infty,-3]\cup[2,\infty)\)  
C. \([-3,2]\)  
D. \(x<-3\)

**Answer: A**

Note: x = -3 and x = 2 are undefined and excluded.

---

### 95.
A rectangle has width x and length \(x+3\). If its area is at least 40 and \(x>0\), which inequality represents the condition?

A. \(x(x+3)\le40\)  
B. \(x(x+3)\ge40\)  
C. \(x+x+3\ge40\)  
D. \(x(x-3)\ge40\)

**Answer: B**

---

### 96.
A number is at least 5 units from 2. Which inequality represents this?

A. \(|x-2|\le5\)  
B. \(|x-2|<5\)  
C. \(|x-2|\ge5\)  
D. \(|x+2|\ge5\)

**Answer: C**

---

### 97.
A quantity x is no more than 20 and greater than 5. Which interval represents x?

A. \((5,20]\)  
B. \([5,20)\)  
C. \([5,20]\)  
D. \((-\infty,20]\)

**Answer: A**

---

### 98.
If \(A,B,C\) are sets and:

\[
A\subseteq B
\]

which expression must equal A?

A. \(A\cup B\)  
B. \(A\cap B\)  
C. \(A-B\)  
D. \(B-A\)

**Answer: B**

---

### 99.
Which solution method is generally most reliable for:

\[
\frac{(x-1)(x+2)}{(x-3)(x+4)}\ge0?
\]

A. Take square roots immediately.  
B. Use a sign chart based on numerator and denominator critical points.  
C. Ignore the denominator.  
D. Treat it as a linear inequality.

**Answer: B**

---

### 100.
Which statement is ALWAYS true?

A. Dividing an inequality by a negative keeps the sign unchanged.  
B. A denominator-zero point may be included if the inequality is \(\ge0\).  
C. \(|x|<a\) corresponds to an AND condition.  
D. The number of subsets of an n-element set is n².

**Answer: C**

---

# 40. Practice Answer Key — Quick Revision

Answers follow the corrected keys noted above (Q62 A, Q66 A, Q82 A with refined option, Q84 C, Q85 A, Q87 A with refined option, Q88 B with fixed options). All other answers match the original key.

---

# 41. Recommended AI-Agent Implementation

If this Markdown is being imported into a learning application, structure the chapter into:

```text
Chapter
├── Overview
├── Learning Objectives
├── Lesson 1: Set Basics
├── Lesson 2: Set Representation
├── Lesson 3: Subsets and Power Sets
├── Lesson 4: Set Operations
├── Lesson 5: Set Laws
├── Lesson 6: Venn Diagrams
├── Lesson 7: Inclusion-Exclusion
├── Lesson 8: Cartesian Products
├── Lesson 9: Inequality Basics
├── Lesson 10: Compound Inequalities
├── Lesson 11: Absolute Value
├── Lesson 12: Quadratic Inequalities
├── Lesson 13: Polynomial Inequalities
├── Lesson 14: Rational Inequalities
├── Lesson 15: Word Problems
├── Formula Sheet
├── Common Traps
├── Problem Recognition
└── 100 Practice Questions
```

## Suggested question metadata

Each practice problem can be stored with:

```json
{
  "id": 1,
  "chapter": "sets-and-inequalities",
  "difficulty": "basic",
  "topic": "set-membership",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correctAnswer": "B",
  "explanation": "...",
  "skill": "recognize set membership"
}
```

Recommended difficulty values:

- `basic`
- `intermediate`
- `advanced`

Recommended topic tags:

- `membership`
- `representation`
- `subset`
- `power-set`
- `cardinality`
- `union`
- `intersection`
- `difference`
- `complement`
- `de-morgan`
- `venn-diagram`
- `inclusion-exclusion`
- `cartesian-product`
- `linear-inequality`
- `compound-inequality`
- `absolute-value`
- `quadratic-inequality`
- `polynomial-inequality`
- `rational-inequality`
- `word-problem`
- `two-variable-inequality`

---

# 42. Teacher Instruction

The chapter should be taught in this order:

1. Explain the concept in simple language.
2. Show notation.
3. Give one easy example.
4. Show the general formula or method.
5. Give one exam-style example.
6. Explain the common trap.
7. Let students solve 2–5 questions.
8. Move from Basic → Intermediate → Advanced.
9. End with mixed practice so students must identify the method themselves.

The goal is not memorization alone. Students should learn:

> **What type of problem is this? → What rule applies? → What is the fastest safe method? → Did I check the boundary/excluded values?**

---

# 43. Final Student Checklist

Before the exam, the student should be able to answer YES to all of these:

### Sets
- [ ] I know \(\in\), \(\notin\), \(\subseteq\), and \(\subset\).
- [ ] I can write a set in roster and set-builder form.
- [ ] I know empty, singleton, finite, and infinite sets.
- [ ] I can count subsets using \(2^n\).
- [ ] I can find proper subsets using \(2^n-1\).
- [ ] I understand the power set.
- [ ] I can calculate union, intersection, difference, and complement.
- [ ] I know De Morgan's laws.
- [ ] I can solve two-set and three-set counting problems.
- [ ] I understand Cartesian products.

### Inequalities
- [ ] I remember to reverse the sign after multiplying/dividing by a negative.
- [ ] I can solve compound inequalities.
- [ ] I understand AND versus OR.
- [ ] I can use interval notation.
- [ ] I can solve absolute-value equations and inequalities.
- [ ] I can factor quadratics.
- [ ] I can create a sign chart.
- [ ] I understand repeated roots.
- [ ] I can solve polynomial inequalities.
- [ ] I can solve rational inequalities.
- [ ] I never include denominator-zero values.
- [ ] I can translate “at least,” “at most,” etc.
- [ ] I can interpret two-variable inequality graphs.

---

# 44. One-Minute Final Memory Sheet

\[
\boxed{\text{Union = OR}}
\]

\[
\boxed{\text{Intersection = AND}}
\]

\[
\boxed{\text{Subsets}=2^n}
\]

\[
\boxed{\text{Proper subsets}=2^n-1}
\]

\[
\boxed{|A\cup B|=|A|+|B|-|A\cap B|}
\]

\[
\boxed{\text{Negative multiplication/division = flip sign}}
\]

\[
\boxed{|x|<a\Rightarrow\text{AND}}
\]

\[
\boxed{|x|>a\Rightarrow\text{OR}}
\]

\[
\boxed{\text{Quadratic/polynomial = roots + sign chart}}
\]

\[
\boxed{\text{Rational = numerator zeros + denominator zeros + sign chart}}
\]

\[
\boxed{\text{Denominator zero = ALWAYS excluded}}
\]

---

## End of Chapter

This file is intentionally written as an educational source document so an AI agent can convert it into lessons, flashcards, quizzes, question banks, progress tracking, explanations, and exam-practice modules.
