from rest_framework import serializers
from .models import Content, BookDetail, BlogDetail, ResearchPaperDetail, ThesisDetail

class BookDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookDetail
        fields = ['publication_year', 'volume_number']

class BlogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogDetail
        fields = ['url']

class ResearchPaperDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchPaperDetail
        fields = ['journal_name', 'doi']

class ThesisDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThesisDetail
        fields = ['university', 'supervisor']


class ContentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.user.username", read_only=True)

    book_details = BookDetailSerializer(required=False)
    blog_details = BlogDetailSerializer(required=False)
    research_details = ResearchPaperDetailSerializer(required=False)
    thesis_details = ThesisDetailSerializer(required=False)

    class Meta:
        model = Content
        fields = [
            "id", "author", "author_name",
            "title", "description", "content_type",
            "price_buy", "price_borrow", "is_free", "discount_percentage",
            "download_count", "borrowed_count", "review",
            "created_at",
            "book_details", "blog_details", "research_details", "thesis_details"
        ]
        read_only_fields = [
            "author", "author_name", "created_at",
            "download_count", "borrowed_count"
        ]

    def validate(self, data):
        """Ensure valid pricing and proper content details."""

        # ---- 1. Pricing validation ----
        price_buy = data.get("price_buy")
        price_borrow = data.get("price_borrow")

        if price_buy is not None and price_buy < 0:
            raise serializers.ValidationError("Price to buy cannot be negative.")
        if price_borrow is not None and price_borrow < 0:
            raise serializers.ValidationError("Price to borrow cannot be negative.")

        # ---- 2. Free flag auto-adjustment ----
        if (price_buy == 0 or price_borrow == 0) and data.get("is_free") is not True:
            data["is_free"] = True

        # ---- 3. Validate detail fields ----
        content_type = data.get("content_type")
        detail_fields = {
            "book": "book_details",
            "blog": "blog_details",
            "research": "research_details",
            "thesis": "thesis_details",
        }

        provided_details = [field for field in detail_fields.values() if field in self.initial_data]

        if len(provided_details) > 1:
            raise serializers.ValidationError(
                f"Only one detail type allowed. You sent: {', '.join(provided_details)}"
            )

        if len(provided_details) == 0:
            raise serializers.ValidationError(
                f"You must provide details for content_type '{content_type}'."
            )

        expected_field = detail_fields.get(content_type)
        if expected_field not in provided_details:
            raise serializers.ValidationError(
                f"For content_type '{content_type}', you must provide '{expected_field}'."
            )

        return data

    def create(self, validated_data):
        content_type = validated_data["content_type"]

        book_data = validated_data.pop("book_details", None)
        blog_data = validated_data.pop("blog_details", None)
        research_data = validated_data.pop("research_details", None)
        thesis_data = validated_data.pop("thesis_details", None)

        content = Content.objects.create(**validated_data)

        if content_type == "book" and book_data:
            BookDetail.objects.create(content=content, **book_data)
        elif content_type == "blog" and blog_data:
            BlogDetail.objects.create(content=content, **blog_data)
        elif content_type == "research" and research_data:
            ResearchPaperDetail.objects.create(content=content, **research_data)
        elif content_type == "thesis" and thesis_data:
            ThesisDetail.objects.create(content=content, **thesis_data)

        return content
