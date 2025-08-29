---
title: The basics of a Python PuLP script for playlist optimization
description: Explaining the basics of a Python PuLP script for playlist optimization
---

```python
scores = {
    (0,1): 100, # very good transition from track 0 to 1
    (1,2): 85,
    (1,3): 80,
    (2,4): 90
}

model = pulp.LpProblem("GoodPlaylist", pulp.LpMaximize)

# Decision variable: x[i,j] = 1 if transition i->j is used
x = pulp.LpVariable.dicts("x", scores.keys(), lowBound=0, upBound=1, cat=pulp.LpBinary)

# now we add a constraint to our model; it will want to maximize this sum
model += pulp.lpSum(scores[i, j] * x[i, j] for (i, j) in scores)

# e.g. 0->1->3 will have these decision variable values
#   x[0,1]=1
#   x[1,2]=0
#   x[1,3]=1
#   x[2,4]=0
# and a total score of 180

# and 0->1->2->4 will have these decision variables
#   x[0,1]=1
#   x[1,2]=1
#   x[1,3]=0
#   x[2,4]=1
# and a total score of 275

# this figures out an optimal solution where the sum is highest or at least very high ( as I understand )
model.solve(pulp.PULP_CBC_CMD(msg=False))

for (i, j) in scores:
    if pulp.value(x[i, j]) == 1:
        print(f"transition from {i} to {j}")
```
