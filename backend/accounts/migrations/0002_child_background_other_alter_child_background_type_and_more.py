# Generated by Django 4.2.16 on 2024-09-26 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="child",
            name="background_other",
            field=models.CharField(
                blank=True,
                help_text="「その他」を選択した場合、詳細を記入してください。",
                max_length=225,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="child",
            name="background_type",
            field=models.CharField(
                choices=[
                    ("special_adoption", "特別養子縁組"),
                    ("foster_regular_adoption", "里子・普通養子縁組"),
                    ("sperm_donation", "精子提供"),
                    ("egg_donation", "卵子提供"),
                    ("step_family", "ステップファミリー"),
                    ("other", "その他"),
                ],
                max_length=30,
            ),
        ),
        migrations.AlterField(
            model_name="child",
            name="father_title",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name="child",
            name="gender",
            field=models.CharField(
                choices=[
                    ("boy", "男の子"),
                    ("girl", "女の子"),
                    ("no_answer", "答えたくない"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="child",
            name="mother_title",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name="child",
            name="name",
            field=models.CharField(max_length=30),
        ),
    ]