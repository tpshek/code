// 02.13.2014 My version of Item 48 from
// Effective JavaScript by David Herman.
// Just for fun, I wanted to get rid of the non-deterministic
// algorithm used to search the social graph and the WorkSet
// class, with its arbitrary pick() method.
// My version uses a recursive function to search the graph
// for a path between 2 members. A closure is used to 
// track nodes already visited during the recursion.
// The book's version of inNetwork() is probably still better, though,
// since it's definitely less likely to blow the call stack
// if the social graph is large. But I just think
// recurive functions are fun.

"use strict";

// Social graph node

function Member(name) {
    this.name = name;
    this.friends = [];
};

// Recursive version of searching network graph for member in caller's network.
// If target not found in caller's network, returns an empty Array.
// If target is found, returns an Array listing the chain from caller to target.
Member.prototype.inNetwork = function(target) {
    var visited = {};   // Storage of names of member already visited, so we that
                        // we don't go in circles.
    visited[this.name] = this;  // If we ended up back where we started from,
                                // we've definitely gone in a circle.

    // Recursive inner function.
    // The closure allows all call to share the list of visited nodes.
    // Check source node's friends for the target node.
    // Stop conditions are:
    //      - we've already traversed the friend
    //      - source node has no friends
    // Recusive condition:
    //      - try reaching the target through a friend node
    function walkFriends(sourceMember, targetMember) {
        console.log("walkFriends called on " + sourceMember.name)
        for (var i = 0, len = sourceMember.friends.length; i < len; ++i) {
            var f = sourceMember.friends[i];    // Friend being evaluated

            if (f.name in visited) { // Don't revisit members
                console.log("Already walked " + sourceMember.friends[i].name)
                continue;
            }
            visited[f.name] = f;

            if (targetMember === f) {   // We found our target
                // Return last 2 steps to get to target
                console.log("Walked to " + f.name)
                return [sourceMember, targetMember];
            } else {
                // Check if a friend can reach the target
                var walkedPath = walkFriends(f, targetMember);
                console.log("recursive called returned " + walkedPath.length);

                // If we reached target through a friend, add source of friend to path 
                if (walkedPath.length > 0) {
                    walkedPath.splice(0, 0, sourceMember);
                    return walkedPath;
                } 
            }
        }
        return [];
    }

    return walkFriends(this, target);
};

// Test walking social graph
var a = new Member("Alice"),
    b = new Member("Bob"),
    c = new Member("Carol"),
    d = new Member("Dieter"),
    e = new Member("Eli"),
    f = new Member("Fatima");

a.friends.push(b);
b.friends.push(c);
c.friends.push(e);
d.friends.push(b);
e.friends.push(d, f);

console.log(a.inNetwork(f));
console.log(e.inNetwork(a));
console.log(b.inNetwork(d));
console.log(c.inNetwork(a));
