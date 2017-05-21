from django.db import models

class Biolog(models.Model):
    """Razred, ki predstavlja biologa, ki je vnesel popis neke vrste"""

    ime = models.CharField(max_length=20)
    priimek = models.CharField(max_length=20)


class Ogrozenost(models.Model):
    """"Razred, ki predstavlja IUCN standard za ogrozenost vrst"""

    kratica = models.CharField(max_length=2)

class Kvadrant(models.Model):
    """Razred, ki predstavlja UTM kvadrant (kocke na zemljevidu)"""

    id_kvadranta = models.IntegerField()

class PopisZivali(models.Model):
    """Razred, ki predstavlja popis neke zivali/rastline na dolocenem kvadrantu"""

    kraljestvo = models.CharField(blank=True, max_length=30)
    deblo = models.CharField(blank=True, max_length=30)
    razred = models.CharField(blank=True, max_length=30)
    red = models.CharField(blank=True, max_length=30)
    druzina = models.CharField(blank=True, max_length=30)
    rod = models.CharField(blank=True, max_length=30)
    vrsta = models.CharField(max_length=60, blank=True)
    kanonicno_ime = models.CharField(blank=True, max_length=60)
    znanstveno_ime = models.CharField(blank=True, max_length=120)
    ogrozenost = models.ForeignKey(Ogrozenost, on_delete=models.CASCADE)
    kvadrant = models.CharField(max_length=10)
    kolicina = models.IntegerField(blank=True)
    biolog = models.ForeignKey(Biolog, on_delete=models.CASCADE)
    datum_popisa = models.DateField()
