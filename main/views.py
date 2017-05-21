from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from main.models import *
import requests
import datetime
from main.serializers import *

class OgrozenostViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset, ki vrne vse IUCN kratice ogrozenosti v bazi"""

    serializer_class = OgrozenostSerializer
    pagination_class = None
    queryset = Ogrozenost.objects.all()


class UporabnikViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset za uporabnike (pri klicu na /uporabniki si tu)"""

    serializer_class = BiologSerializer
    queryset = Biolog.objects.all()


class KvadrantViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset za vracanje vseh kvadrantov"""

    serializer_class = KvadrantSerializer
    queryset = Kvadrant.objects.all()


class PopisViewSet(viewsets.ModelViewSet):
    """Viewset za kreacijo in pridobitev popisa vrst"""

    def get_serializer_class(self):

	    return PopisZivaliSerializer

    def create(self, request):
        """Ustvari nov popis primerka v dolocenem kvadrantu"""
        if 'biolog' not in request.data.keys():
            content = {'message': 'Biolog, ki je popis kreiral je obvezen podatek'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        '''else:
            try:
                biolog = Biolog.objects.get(pk=request.data['biolog'])
            except Biolog.DoesNotExist:
                content = {'message': 'Ta biolog ne obstaja'}
                return Response(content, status=status.HTTP_404_NOT_FOUND)'''

        if 'kanonicno_ime' not in request.data.keys():
            content = {'message': 'Kanonično ime je obvezen podatek'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if 'ogrozenost' not in request.data.keys():
            content = {'message': 'Ogroženost je obvezen podatek'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if 'kolicina' not in request.data.keys():
            content = {'message': 'Količna primerkov je obvezen podatek'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if 'kvadrant' not in request.data.keys():
            content = {'message': 'Številka kvadranta je obvezen podatek'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        podatki_popisa = requests.get('http://api.gbif.org/v1/species/suggest?q=' + request.data['kanonicno_ime'])
        podatki_popisa_json = podatki_popisa.json()
        if len(podatki_popisa_json) == 0:
            content = {'message': 'Ne najdem primerka s tem imenom vrste'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        request.data['vrsta'] = podatki_popisa_json[0]['species']
        request.data['kraljestvo'] = podatki_popisa_json[0]['kingdom']
        request.data['datum_popisa'] = datetime.datetime.now().date()
        request.data['druzina'] = podatki_popisa_json[0]['family']
        request.data['razred'] = podatki_popisa_json[0]['class']
        request.data['deblo'] = podatki_popisa_json[0]['phylum']
        request.data['red'] = podatki_popisa_json[0]['order']
        request.data['rod'] = podatki_popisa_json[0]['genus']
        request.data['znanstveno_ime'] = podatki_popisa_json[0]['scientificName']

        serializer = PopisZivaliSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            content = {'message': 'Prišlo je do napake pri serializaciji'}
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def retrieve(self, request, pk=None):
        """Pridobi vse primerke, ki so vpisani v bazo"""
        # Prisel je request brez definiranega id-ja
        if pk is None:
            content = {'message': 'Za pridobitev posameznega popisa morate podate id popisa'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        queryset = PopisZivali.objects.all()
        # Poskusi pridobiti popis
        popis = ''
        try:
            popis = PopisZivali.objects.get(pk=pk)
        except PopisZivali.DoesNotExist:
            content = {'message': 'Popis s tem id ne obstaja'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        serializiran_popis = PopisZivaliSerializer(popis)
        return Response(serializiran_popis.data)

    def get_queryset(self):
        queryset = PopisZivali.objects.all()
        kvadrant = self.request.query_params.get('quadrant', None)
        if kvadrant is not None:
            queryset = PopisZivali.objects.filter(kvadrant=kvadrant)

        vrsta = self.request.query_params.get('species', None)
        if vrsta is not None:
            queryset = queryset.filter(vrsta=vrsta)

        rod = self.request.query_params.get('genus', None)
        if rod is not None:
            queryset = queryset.filter(rod=rod)

        druzina = self.request.query_params.get('family', None)
        if druzina is not None:
            queryset = queryset.filter(druzina=druzina)

        red = self.request.query_params.get('order', None)
        if red is not None:
            queryset = queryset.filter(red=red)

        deblo = self.request.query_params.get('phylum', None)
        if deblo is not None:
            queryset = queryset.filter(deblo=deblo)

        kraljestvo = self.request.query_params.get('kingdom', None)
        if kraljestvo is not None:
            queryset = queryset.filter(kraljestvo=kraljestvo)

        query = self.request.query_params.get('q', None)
        if query is not None:
            queryset = PopisZivali.objects.filter(
                Q(vrsta__icontains=query) |
                Q(rod__icontains=query) |
                Q(druzina__icontains=query) |
                Q(red__icontains=query) |
                Q(deblo__icontains=query) |
                Q(kraljestvo__icontains=query) |
                Q(razred__icontains=query)
            )
        return queryset
