# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-20 18:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Biolog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ime', models.CharField(max_length=20)),
                ('priimek', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Kvadrant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_kvadranta', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Ogrozenost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kratica', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='PopisZivali',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kraljestvo', models.CharField(blank=True, max_length=30)),
                ('deblo', models.CharField(blank=True, max_length=30)),
                ('razred', models.CharField(blank=True, max_length=30)),
                ('red', models.CharField(blank=True, max_length=30)),
                ('druzina', models.CharField(blank=True, max_length=30)),
                ('rod', models.CharField(blank=True, max_length=30)),
                ('vrsta', models.CharField(max_length=60)),
                ('kanonicno_ime', models.CharField(blank=True, max_length=60)),
                ('znanstveno_ime', models.CharField(blank=True, max_length=120)),
                ('avtor', models.CharField(blank=True, max_length=120)),
                ('kolicina', models.IntegerField(blank=True)),
                ('datum_popisa', models.DateField()),
                ('biolog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Biolog')),
                ('kvadrant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Kvadrant')),
                ('ogrozenost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Ogrozenost')),
            ],
        ),
    ]