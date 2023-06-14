**Problem 1**

Consider three numbers from the set say a,b,c. If either a+b< c or b+c< a or c+a< b then (a,b,c) cannot form a triangle. Lets state the problem little differently for each pair (a,b) we want to find out how many numbers c are there such that a+b < c. We consider each pair (a,b) and search for how many numbers are there which are greater than a+b. This can be done easily using binary search. Sort the array and consider the interval (start,end). If arr[mid]> a+b then (mid-end+1) numbers are greater than a+b otherwise if arr[mid]< a+b then we don't add anything to the result and search in (start,mid-1).


**Problem 2**

Consider the given string. We need to find the smallest substring which contains all the characters of the given set. Any substring which qualifies has to end with some character.For each index in the input string lets find out how much we have to extend from that point to the left so that we get all the characters in the input set. Lets say we are scanning the string from the left and we know the latest occurrences of the characters of input set in the input string, say they are stored in an array by name pos[]. From the i th character we need to extend to the minimum value in the pos[] array so that we get all the characters. For each index i we do this and report the minimum length.
