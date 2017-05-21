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

class PopisZivaliCreateSerializer(serializers.ModelSerializer):
    '''Serilizacija vnesene zivali'''
    ogrozenost = OgrozenostSerializer
    biolog = serializers.PrimaryKeyRelatedField(queryset=Biolog.objects.all())

    # Problemi z dodajanjem polj, ki se ne serializirjajo
    def create(self, validated_data):
        print('VALIDATED DATA:')
        print(validated_data)
        popis = PopisZivali(
            kanonicno_ime=validated_data['kanonicno_ime'],
            kolicina=validated_data['kolicina'],
            ogrozenost=validated_data['ogrozenost'],
            kvadrant=validated_data['kvadrant'],
            biolog=validated_data['biolog'],
            datum_popisa=validated_data['datum_popisa']
        )
        popis.save()
        return popis

    class Meta:
        model=PopisZivali
        fields = ('kanonicno_ime', 'kolicina', 'ogrozenost', 'kvadrant', 'biolog',
        'datum_popisa', #'vrsta', #'druzina', 'kraljestvo', 'deblo', 'razred', 'red',
        #'rod', 'znanstveno_ime'
        )

class PopisZivaliSerializer(serializers.ModelSerializer):
    '''Serilizacija vnesene zivali'''
    ogrozenost = OgrozenostSerializer


    def create(self, validated_data):
        #print(validated_data)
        popis = PopisZivali(
            kanonicno_ime=validated_data['kanonicno_ime'],
            kolicina=validated_data['kolicina'],
            ogrozenost=validated_data['ogrozenost'],
            kvadrant=validated_data['kvadrant'],
            biolog=validated_data['biolog'],
            datum_popisa=validated_data['datum_popisa'],
            druzina=validated_data['druzina'],
            rod=validated_data['rod'],
            red=validated_data['red'],
            razred=validated_data['razred'],
            vrsta=validated_data['vrsta'],
            kraljestvo=validated_data['kraljestvo'],
            deblo=validated_data['deblo'],
            znanstveno_ime=validated_data['znanstveno_ime']
        )
        popis.save()
        return popis

    class Meta:
        model=PopisZivali
        fields = ('kraljestvo', 'deblo', 'razred', 'red', 'druzina', 'rod', 'vrsta', 'kanonicno_ime', 'znanstveno_ime',
                  'kolicina', 'datum_popisa', 'ogrozenost', 'kvadrant', 'biolog')
