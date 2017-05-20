
from main.models import *
from rest_framework import serializers


class BiologSerializer(serializers.ModelSerializer):
    '''Serilizacija Biologa ki je vnesel stvar'''
    class Meta:
        model=Biolog
        fields = '__all__'

class OgrozenostSerializer(serializers.ModelSerializer):
    '''Serilizacija ogroženosti'''
    class Meta:
        model=Ogrozenost
        fields = ('kratica',)

class KvadrantSerializer(serializers.ModelSerializer):
    '''Serilizacija kvadranta'''
    class Meta:
        model=Kvadrant
        fields = ('id_kvadranta',)

class PopisZivaliSerializer(serializers.ModelSerializer):
    '''Serilizacija vnesene zivali'''
    ogrozenost = serializers.CharField(source='Ogrozenost.kratica')
    kvadrant = serializers.CharField(source='Kvadrant.id_kvadranta')
    biolog = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model=PopisZivali
        Fields = ('kraljestvo', 'deblo', 'razred', 'red', 'druzina', 'rod', 'vrsta', 'kanonicno_ime', 'znanstveno_ime',
                  'avtor', 'kolicina', 'datum_popisa',)

