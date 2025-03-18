//package com.thesis2.EunoiaProject.Model;
//
//import jakarta.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Table(name = "posts")
//public class Post {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @Column(nullable = false)
//    private String content;
//
//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Comment> comments = new ArrayList<>();
//
//    @Column(nullable = false)
//    private int likes = 0;  // Ensuring default value is set
//
//    public Post() {}
//
//    public Post(User user, String content) {
//        this.user = user;
//        this.content = content;
//        this.likes = 0;
//    }
//
//    public void likePost() {
//        this.likes++;
//    }
//
//    public void unlikePost() {
//        if (this.likes > 0) {
//            this.likes--;
//        }
//    }
//
//    public void addComment(Comment comment) {
//        comments.add(comment);
//    }
//
//    // Getters and Setters
//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public void setContent(String content) {
//        this.content = content;
//    }
//
//    public List<Comment> getComments() {
//        return comments;
//    }
//
//    public void setComments(List<Comment> comments) {
//        this.comments = comments;
//    }
//
//    public int getLikes() {
//        return likes;
//    }
//
//    public void setLikes(int likes) {
//        this.likes = likes;
//    }
//}

package com.thesis2.EunoiaProject.Model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    // Remove the old likes counter and add a collection of users who liked this post.
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "post_likes",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> likedBy = new HashSet<>();

    public Post() {}

    public Post(User user, String content) {
        this.user = user;
        this.content = content;
    }

    // 👍 Like a post by adding a user
    public void addLike(User user) {
        likedBy.add(user);
    }

    // 👎 Unlike a post by removing a user
    public void removeLike(User user) {
        likedBy.remove(user);
    }

    // Return the number of likes (size of likedBy set)
    public int getLikes() {
        return likedBy.size();
    }

    // Getters and Setters for other fields

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Set<User> getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(Set<User> likedBy) {
        this.likedBy = likedBy;
    }
}


// package com.thesis2.EunoiaProject.Model;

// import jakarta.persistence.*;
// import java.util.ArrayList;
// import java.util.List;

// @Entity
// @Table(name = "posts")
// public class Post {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int id;

//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private User user;

//     @Column(nullable = false)
//     private String content;

//     @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
//     private List<Comment> comments = new ArrayList<>();

//     @Column(nullable = false)
//     private int likes = 0;

//     public Post() {}

//     public Post(User user, String content) {
//         this.user = user;
//         this.content = content;
//         this.likes = 0;
//     }

//     // 👍 Like a post
//     public void likePost() {
//         this.likes++;
//     }

//     // 👎 Unlike a post
//     public void unlikePost() {
//         if (this.likes > 0) {
//             this.likes--;
//         }
//     }

//     // ➕ Add a comment to the post
//     public void addComment(Comment comment) {
//         comments.add(comment);
//         comment.setPost(this);
//     }

//     // ➖ Remove a comment from the post
//     public void removeComment(Comment comment) {
//         comments.remove(comment);
//         comment.setPost(null);
//     }

//     // ✅ Getters and Setters
//     public int getId() {
//         return id;
//     }

//     public void setId(int id) {
//         this.id = id;
//     }

//     public User getUser() {
//         return user;
//     }

//     public void setUser(User user) {
//         this.user = user;
//     }

//     public String getContent() {
//         return content;
//     }

//     public void setContent(String content) {
//         this.content = content;
//     }

//     public List<Comment> getComments() {
//         return comments;
//     }

//     public void setComments(List<Comment> comments) {
//         this.comments = comments;
//     }

//     public int getLikes() {
//         return likes;
//     }

//     public void setLikes(int likes) {
//         this.likes = likes;
//     }
// }

