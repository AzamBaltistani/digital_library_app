from django.db import models
from accounts.models import Author


# Base content
class Content(models.Model):
    CONTENT_TYPES = (
        ('book', 'Book'),
        ('article', 'Article'),
        ('blog', 'Blog/Website'),
        ('research', 'Research Paper'),
        ('thesis', 'Thesis'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)

    # monetization
    price_buy = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_borrow = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_free = models.BooleanField(default=False)
    discount_percentage = models.PositiveIntegerField(default=0)  # NEW

    # stats
    download_count = models.PositiveIntegerField(default=0)  # NEW
    borrowed_count = models.PositiveIntegerField(default=0)  # NEW
    review = models.TextField(blank=True, null=True)  # NEW

    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="contents")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.content_type}) by {self.author.user.username}"

# ---- Specific Detail Models ----
class BookDetail(models.Model):
    content = models.OneToOneField(Content, on_delete=models.CASCADE, related_name="book_details")
    publication_year = models.PositiveIntegerField()
    volume_number = models.PositiveIntegerField(default=1)

class BlogDetail(models.Model):
    content = models.OneToOneField(Content, on_delete=models.CASCADE, related_name="blog_details")
    url = models.URLField()

class ResearchPaperDetail(models.Model):
    content = models.OneToOneField(Content, on_delete=models.CASCADE, related_name="research_details")
    doi = models.CharField(max_length=100, blank=True, null=True)
    journal = models.CharField(max_length=255, blank=True, null=True)

class ThesisDetail(models.Model):
    content = models.OneToOneField(Content, on_delete=models.CASCADE, related_name="thesis_details")
    university = models.CharField(max_length=255)
    supervisor = models.CharField(max_length=255, blank=True, null=True)
