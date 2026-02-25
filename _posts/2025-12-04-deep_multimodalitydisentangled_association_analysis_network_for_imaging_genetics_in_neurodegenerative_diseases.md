---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HZTIIXX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCaa1%2BkVClTKnzz5bSrM2dvusuic74kgy2X%2BoroU6VNiwIgSsB0dzh7M%2FJ%2FJObK4H%2F5jQ9sGb4UBT0hPjDrtDya4SYq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLrSPG8FVnnP4slgkSrcA34HtvIi34o%2B716nGLxPKkACSKYeXEBej1rcq3UsV05N7F63UKnAYkh2VU5cSPJiYzQEALw73WN75lT4yNgHr9ZD6PPnTkgwZrQO4JZJ7mqutxOQR%2B3uCQqu%2B%2FT60LRz6rBHnCse%2BJFFdLHKtzi70K%2Br11WW3BlLdnllf%2BwNG7N%2B3FX92YwlInPZl%2BSs7%2BzTkls%2FReOUkpimU6HmddF6lYLW6lGUcCoMy0ysDa3kCuJR51N%2B2bWMjCaT7gc58YdDAERQSeM1NH06sQcXuN%2F4sr0%2FZjuusHH9MbjeUlORjMcZOgdAr2Mi%2BNyXWHlBeXenDiozXxMeOCge64qb9alIJ8TvDZDaluvq1rViFv0YLDjLBa6rvW1SUZZr8Y9D4eemikVgUmlB7hTs3%2B7R3MzY6oi0SKaPiDBxrxApPOV9w%2B0Zg2bAWXyGE9I6WiKr52ZtqpszKtsAh8ROEECyQumVYL0o4DbC4j17m%2BB53Khj%2BMe9pHRaK27Oa%2BmbmPS7RpO9ppY8ZPv2bTlqUDxbL7gYOVr6oqEnZxPX0kOKIisDtTCwbgF5hxsfNwWm5oqQCCygq8yzpdhBuCIaxbEtsTYLomagRf%2BqhQdq4sAL4vrbQfkaPGlZafpxCzP1N8LiMKHh%2FMwGOqUB5SCW7OgS8pKrLKILhZgTTJezfF31VWakOL1qJnbS7qYNFSVheepDGKUOXfR64MVjmsj9wppgLHGDCw9pHC9w%2FeezNnSLRqrtJJqK%2BOApmd9gJ2jJkqE%2B337cF%2F5cFHU4ndwN7AsXZF2midu903NPsuxneIuHmqnGt%2BmatrH9M2yxKJnTvcXDp9ipl0DPaA2o9nHqo8BOvoyGfIM%2BYOzTh9%2F0YZcM&X-Amz-Signature=e2cf45563ba866780916dd22bd18b3a6e1d877c8afd11dcd69b01ed82cbea50d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HZTIIXX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCaa1%2BkVClTKnzz5bSrM2dvusuic74kgy2X%2BoroU6VNiwIgSsB0dzh7M%2FJ%2FJObK4H%2F5jQ9sGb4UBT0hPjDrtDya4SYq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLrSPG8FVnnP4slgkSrcA34HtvIi34o%2B716nGLxPKkACSKYeXEBej1rcq3UsV05N7F63UKnAYkh2VU5cSPJiYzQEALw73WN75lT4yNgHr9ZD6PPnTkgwZrQO4JZJ7mqutxOQR%2B3uCQqu%2B%2FT60LRz6rBHnCse%2BJFFdLHKtzi70K%2Br11WW3BlLdnllf%2BwNG7N%2B3FX92YwlInPZl%2BSs7%2BzTkls%2FReOUkpimU6HmddF6lYLW6lGUcCoMy0ysDa3kCuJR51N%2B2bWMjCaT7gc58YdDAERQSeM1NH06sQcXuN%2F4sr0%2FZjuusHH9MbjeUlORjMcZOgdAr2Mi%2BNyXWHlBeXenDiozXxMeOCge64qb9alIJ8TvDZDaluvq1rViFv0YLDjLBa6rvW1SUZZr8Y9D4eemikVgUmlB7hTs3%2B7R3MzY6oi0SKaPiDBxrxApPOV9w%2B0Zg2bAWXyGE9I6WiKr52ZtqpszKtsAh8ROEECyQumVYL0o4DbC4j17m%2BB53Khj%2BMe9pHRaK27Oa%2BmbmPS7RpO9ppY8ZPv2bTlqUDxbL7gYOVr6oqEnZxPX0kOKIisDtTCwbgF5hxsfNwWm5oqQCCygq8yzpdhBuCIaxbEtsTYLomagRf%2BqhQdq4sAL4vrbQfkaPGlZafpxCzP1N8LiMKHh%2FMwGOqUB5SCW7OgS8pKrLKILhZgTTJezfF31VWakOL1qJnbS7qYNFSVheepDGKUOXfR64MVjmsj9wppgLHGDCw9pHC9w%2FeezNnSLRqrtJJqK%2BOApmd9gJ2jJkqE%2B337cF%2F5cFHU4ndwN7AsXZF2midu903NPsuxneIuHmqnGt%2BmatrH9M2yxKJnTvcXDp9ipl0DPaA2o9nHqo8BOvoyGfIM%2BYOzTh9%2F0YZcM&X-Amz-Signature=e2cf45563ba866780916dd22bd18b3a6e1d877c8afd11dcd69b01ed82cbea50d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SPY5TWR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHY9z0XVJXC0WQ9SbhkwuVVMrhRynG0XkncoEn47xx6UAiASrhry8GWlqSAChrCpAFDJ%2BGEMW9Z0oB10v00bxdx7iCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMwrYrdTe6jmfJ6ZJmKtwDjWzz7IPcnRfjAta1ONgGNloatmLEHpIOrP1bbSBtBCOJWI1fPMD%2F5MR%2BclF4QxDbgyIouvKLoZ24NXw2pf11d1J4g%2FLV3Xh8SVqg0Zbeis9KC85tVgodLPC7iniNEnVh%2B5JW8OWXQUdepodDeFb0%2BS%2BypYJXYbnS5ex0pT3ShgjTiqtnh6sVSwWk80NAYI%2BNmLk53Gx5nCwOWcBBu5DLmSwtbi%2FsmPsbh5C0ZIVj44EuI5VN%2BR2SJEbg5fkoLKD6agHHvP3K3Y4ByoZImYiy%2Fmpo%2BRJNCkWVT37NGLRqZ5MtAHqPSW%2FZQ8rvIuNUWOd%2FKV%2Fp40cxxVCyVcuRQ1byzPR4Qv0G0%2BMBdprz42TJRKYRCnhph5YVvkZvJ6MBoudnzJKAWZQ9IXDSHtedtgJzE22QMy%2BnwTAgQhvIv1XtoX9vVNV13c0zatoyFoTW061EOnKOjm1WsZVDhadkQCp7gIH0iPWl2sny0FgGmFd0SuVtykpbpNR5UF7DtxRDkn1FGXdcFiogHGU5F%2FnQT7Up8DJJm9FBvSd%2F00s8CFhGCnNHe3gvlES391oUIR1r7EVmUt8XfT%2BCkhM%2FcTrD4ypxLCf0bT%2BHqPRC2Wsd4YwXeCZ7WLnxHGqLhh2ekwQwkeH8zAY6pgGGvFkJf5Tzg8VpqHkC34zY%2FFKmRJ29G5TgTKx4e9MraFODM1RHzPMyE6T8y8wC%2FQzmi%2BvaJrMqsFWPEU7d7ip7I7hrxdKPbFf%2B6O6af4TBn9t8oqr%2FkX4uumwU%2BOGJH1lGTDxvKHqnDLBXYLn2e4I9uPhb4ouo3PHVdOpjbd8PptzNDmXdgiazcVVYFNerMAykf%2F6EiXr0YSZWw1xuPlsGbxT3avy7&X-Amz-Signature=d5d43e9ec4dea8a273b942d83132339351739fd772fa03f3546ae5e74a19071f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIHGWLSS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGi9AHi2LvgFhgYCCOulNGmBTLcTIkX4B2DXpZfihtV%2BAiAS589AMw3PbJTWt5ogqbwZVDNd6tDainW%2B7iiCCaTO1ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMzJnIOCOcGYyLe%2FaIKtwDuwJ9LR%2B8HmI4Q%2BSjufUEDqvg%2BNMI2cgyfkBFPcTj7DIewe91GB%2F7PyBFdMJJdrwYt7ErfuSuNo6meZkz6hYd%2FaOCNze1STLQnV5IatH7%2FSRqG8q1rJuWlIytYyx3YzrnlbRdSRou1FW8BIHGHYghcKEYXMrPrURL1RC3LRatZx%2BraYJmX7VT6kzbTuL7f2DiELvMw5asKyOni2lW2XZfFS9nHo3eM072Y%2FYh4TQs3DEAIQR4De%2FfNSm7je6xnfm%2BHjdI4vDhP12FWD%2BvErLyR5PjbfOdK7K3yXBI18LGnwlcymFUYGYZFMpcI9sGpEL2BWkJRVDeSmxnapGg39lB8i1iSKkCEt5D6tBMD1SkhmHdmOZAj6CEA8DSDuKgX7mIZoaty%2Fm5PR1KLas1OnAgfvPwHk3w6S%2FMn4hNsSHl2RiljJVP4SD8%2Bzy7OIUmMt5w%2F3w1o47rJDbFVLPE9hsDP17GF%2FACxoTx9noE%2BP1v4BFPdu0MetqUszzAxWXIDunaKeWgSsfbW5klJjNHqReInHivN3XpbkjS1BV0emzUU7CA4KtbchJnZq%2BbuECS9HgBLnnES7SHw0Y1DL1IR2nTnvCxgexW519BKXjDwlKkqhybmh%2B3VLBLRbjmKZswpOH8zAY6pgGghqWE%2BpHo7cXK%2Fyx9WrqPcATrk0t0yuoTrKoLGcbmSDf4Tf10H4J0vA18ji6nSPBVMB21ILjCzD3x5SqvlZJlzvYVA%2BMYLQ%2FpUhA5lGcYNyzfxZi76HGMVwLy2Q4jZ%2FMGPQV5wXKpRDXmR9hPgo9qmeBMCg6jYCa2gGsLtlfTu2qgKNRW8GXNIpdIiKl1UHjfk0iLGlzg1NZLywTfA%2FkmhDtBq19l&X-Amz-Signature=adba8e8e511a5b1e564e36252d599b5b0ffcdeba082b642e6c362e633890a7ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIHGWLSS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGi9AHi2LvgFhgYCCOulNGmBTLcTIkX4B2DXpZfihtV%2BAiAS589AMw3PbJTWt5ogqbwZVDNd6tDainW%2B7iiCCaTO1ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMzJnIOCOcGYyLe%2FaIKtwDuwJ9LR%2B8HmI4Q%2BSjufUEDqvg%2BNMI2cgyfkBFPcTj7DIewe91GB%2F7PyBFdMJJdrwYt7ErfuSuNo6meZkz6hYd%2FaOCNze1STLQnV5IatH7%2FSRqG8q1rJuWlIytYyx3YzrnlbRdSRou1FW8BIHGHYghcKEYXMrPrURL1RC3LRatZx%2BraYJmX7VT6kzbTuL7f2DiELvMw5asKyOni2lW2XZfFS9nHo3eM072Y%2FYh4TQs3DEAIQR4De%2FfNSm7je6xnfm%2BHjdI4vDhP12FWD%2BvErLyR5PjbfOdK7K3yXBI18LGnwlcymFUYGYZFMpcI9sGpEL2BWkJRVDeSmxnapGg39lB8i1iSKkCEt5D6tBMD1SkhmHdmOZAj6CEA8DSDuKgX7mIZoaty%2Fm5PR1KLas1OnAgfvPwHk3w6S%2FMn4hNsSHl2RiljJVP4SD8%2Bzy7OIUmMt5w%2F3w1o47rJDbFVLPE9hsDP17GF%2FACxoTx9noE%2BP1v4BFPdu0MetqUszzAxWXIDunaKeWgSsfbW5klJjNHqReInHivN3XpbkjS1BV0emzUU7CA4KtbchJnZq%2BbuECS9HgBLnnES7SHw0Y1DL1IR2nTnvCxgexW519BKXjDwlKkqhybmh%2B3VLBLRbjmKZswpOH8zAY6pgGghqWE%2BpHo7cXK%2Fyx9WrqPcATrk0t0yuoTrKoLGcbmSDf4Tf10H4J0vA18ji6nSPBVMB21ILjCzD3x5SqvlZJlzvYVA%2BMYLQ%2FpUhA5lGcYNyzfxZi76HGMVwLy2Q4jZ%2FMGPQV5wXKpRDXmR9hPgo9qmeBMCg6jYCa2gGsLtlfTu2qgKNRW8GXNIpdIiKl1UHjfk0iLGlzg1NZLywTfA%2FkmhDtBq19l&X-Amz-Signature=37c71faab234c21ffd966516118fe0dd23386e0df8f5fc1cadb5009d923997cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5F6S7F2%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDzBqOzONBfUEWTCWqNOniamlGqQHpegqebm7Vy8oIftgIgCWVFK1%2F5hjjNcjFPKDxWSld6T8YY2jAAEve0iJa9e8gq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDGMIgGarxNjOeYofjSrcAwHM7%2BzEvklSwCsJRKUjW9flXjvcjmjDD6Hoc2v07UmIawTXFBRcRTF2KNVEnkc0yodofIa6YcFkUecIS%2Bf35h%2FASe%2F1XGmoHjFKhb1fklNumvOvHqIDquO9n2j8qRCxHmdYzh8tMChRbbW7gG1DssM9uf88owhVLPsjF1RmevaE1OTmnxYy8O6ji%2F1lejJPckjTZepX2iEm4P0F30NoI4gIISuJyKfi2iDnyS0wDtekRgHlsB0ZQQ6hU1fyFx4ZN9hWXDwf9qriB2SFv6jSrLiNa4dLRzVAI%2Fq0wwP9lN3w19QQoXb0mWejNOkg3paKLCKV%2Fg3zkYQqQKLzvxcZth2unYARUrED2OJKs8cgEqP8Ux%2FU7abur6spYzXqTbXTqrHgQQC73WHDygpIqZLAUvKqOgFcSy%2FAJyoXorqtjS8ZOTJRVTIb%2F4ylNo9s4PFHp23kN20M0D4PbWOuO8HPtExUJQk%2Bxriin%2F5b5yAFyGqArl6HOU2JKoOJJBHGTA3XlvdFYjFo4dOB%2BgOWZljfM%2BDlPsyalnUEojwYy5coDBbnkLURzwunzNIKXieihGcMQ5U9LERmsnTX7RxfB2Z%2B7ReDQQRasC%2BngtDq5M4ab2CTeqUJMnijjvyDx%2BD3MPvg%2FMwGOqUBcLUzXI3FBGd4GWwaE%2FHNdCKgxnnOH9I1%2F600D3t11SpLYJwUPknogZdv8A%2FINkdX8tVsEdRC%2Fwy%2F8a2fjsPJ5H%2BmAGK5oqiCpAtGG5Ir9FHrR%2FGsbtt4sTQ3wvUyMzDjEWWSWPTkwelABbj%2FNqpgjDH6DHwRtZg81c3vvNhEuPaqQRKQELu9HRAd3zrUU5UNe1T38DK1Gh7kgH%2FaVPSP3WTlhq7O&X-Amz-Signature=53c6a8495bd984144f0ebdbaaebc74ca43c8616af2df08018d27a2bc98643943&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KIUTUG3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIANSakbSxjiZ3ogokM6HgyUQmLnQ3KkvCvbRhDbwZp%2FHAiAK8T6wEyNF%2BE6SYhmGYvoj04aq7kpAzGrceWS4QrDHgCr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMv15%2BDUAITa4qdr4OKtwDXV%2FixtZ%2B87s267Yc%2BWi81ZJhTk%2BM%2BMXnFsbKex2ZnJo0dg%2B2GFDV3Qv9ngQsCbZ7XFoIxDmHg6QO8V9Smj2Wd812EjLgKdMWDgal7Q9%2FMkZKwVN19Rw3EVi4oEbIk8vrzCLK6CxoiSgyK1I0O5J99O3FPVBrKdrRvHOCLL%2BnXYb%2FSmwsjjYtlJ7TBfTs0wg%2F5VCIdeX2r5JvYUZ9E2%2BwwekmLPP86Js3oxfXNAfhqmEK5Od9rgnF%2BLzIkW%2Bk7rfnELWJpyGDMYSIVfW8ArxBNihOkqAhMniKpmqRExHlHma77fn21N3GgWgnwA0afQK%2BV0D1YUoV4LIHQvqilzu%2Fq9zXsFoVgwoat7zKIp99AhfnCoJkmmFrN%2BHRloVQVlpnuavSHlpUVE2a8uqaxB%2Ft0xtN6p3GvlKe3D3VqZV4A2QAr2nsCvVpFlDareU5mYktmcxfKWfSjoWoZUi1D1cb0JAyaQvwkYq4PQZ2I0TW0k64vngigdmTQlq%2FS0IQlwEXbJmDd%2F0qa4hxJWDJvm27cKtCMCJjaQUlJ%2B3tpcdACxsw3%2FnesaKTOzhNYc2PvIAjzHu7hUK0YyTxQoyDP4%2FIzZ9Z7W5k8kqOop269WanuG61kSDkYz9cNfrcP3Uw3%2BH8zAY6pgEkI9yqTN4izdlTdOddkziyc743UNbD1WWfgj0UeGcaKOvX2nqf%2BGvDBQGuu5jaUGtXGA4I4KlAt4iL5NbydQvsK%2B2CUQdvaGBeGB0tLXt%2B2fyuBcQpSlz1a9dIAqmSZe797Lz7Did7DPNI5p%2FyzfoQ8XHinxDWVwGdQIIvCX0b9xOp1drXjvoDmLCtxudCjgBvGlRmFjwqqPMbvowPNeLBOs7eJCQP&X-Amz-Signature=2aa287fbaedcdfa2148feec6e94c214e290e20d14d2a8de0bd0f1e58e5b81f3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MXEYYKZ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCiE5MBzZcTErnFQx60IsLu6KSf2sqFMiprkdzcKTMRMgIgCb%2B34u%2FI3CVPeBZrvbOhpiAJjrJlptV1LiyrSB8UPQQq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDDUsxU4OK3PdAZ%2FmECrcA6OezLvzcv77eaKCojZ4yRTDaEBXhAZJDn8PwfayfemiB02lwI%2FH%2F4ITxYLtvo7cLverHY4YY3If6ZuZaz3cLIAKEPyZcugM6zLqBj8jTR07RPv6kwCkb64OafaZabJFCsfYr6T5%2FAknHlFXOFL8hSemZICAMouyvZXHJpju6ICvqmLr4odNlb%2FXlgBpzugiD3%2F42MUt4kN%2BuZXjspvw3wNsA6lak8QIum7TTxRKzx6%2BSM%2B3ZfhsXaP9U71tjsT0Y7PbmeERZfphv%2BSoEX4juw8c%2FEeeZkrZ4BOjdwJ9jQnCdhCmuMPnYUc6Anj11dkKBqXVI0CGPnruIrVgA%2FZwcIw59KOSualP1%2BAgJrLKLsEP2ixp9u4t7jJiRm%2FFAm0hEEmIF9lsr3qk0m2oBkUpzwKZvixS24m%2FlYt9BFSZDTn%2FKegEwVu5dg86WLmy%2FcvNpk8ecev%2FYLb1SSdr2t71JtNP7tmOL%2FZiyMs%2FTGbejHx7Kx0QYrT1R3qW%2Fas%2F5WiS4HnaORPHV7II5xFUEwzpfxOc1XHIfYaXONzXg69nu5mOjst7SovJeBtmrl%2B5oAJEL%2BNunQkFvVLv1ovvQeq8WWhZkn1sgqcDQjci61LaHKNxA5pVVAlE1JUdZFvpMJji%2FMwGOqUB8WDVQplocrUJH1hCQrrMbnnUlM3HBpUWqYtVejEHxuG0LG6PWs9PmyWUgyZKgmc0LpuvIezrFew7FvavmGgJ9iCkRxuw2dKNPt9Of7ybLhzSE7K5dz3uuBMfvmSTKHOzcvdKxYc9qRxzM7zpZd6xerdYwRO%2FBjDLhMfUd0dM2BzH%2B%2F%2B5oR2TMZcEE5SYyBlHb8qyKAFwd4P127zK0agRk%2FBCJBCh&X-Amz-Signature=ae5f1fb2e0d605f8d9d307769f180628315b6d087737217ee6466074caead2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCITW2V%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIG7dKywtBxwd3Xudvl%2F2xQceFMTXQyBykxXO6UlPiBNxAiAbGcbajge9vMfKpoHFOp8R1Yzy1Xj%2FHTL2N7dogJSouSr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMCSjH7XfeA6W3xC8hKtwDH%2F2cwRwd8mJz7AOr0xt6YWeI9WU0PP0US9NULuZ4sLdY5uyu0rDQC8qGHLTKr9kdxOx08aCKjQVj1qruCIQqL%2FBUfkZtgZuEVdo1xdOroXC9Rnok0CEXL%2Frc7zh5BPRl48LbhUAS7WICutpPWH5YbQ%2BYAs7A6fayTyoVIlwAH6%2FojQnbnGZv%2F%2FZlrI6racHFLPgdmFHyIx3dglEQ9exiBECConWTaRXrLCVlzWASK29hFkQcAIT98AbYVrqJD7puKZGgoW%2BepLRtPQt%2B8m5g9y5HgscW3T6XzDLomGDWitF8SeNTjb4%2FgbbOS2q3BgizFczr3PV7ynMi4axYvvd6NL6p7z%2B6OiQMBCpmtSrDeoyeT8j251GAlpPoymW6cKGAi6JhLJGlDCu77sh83BrgNa8vw1wAurZFmWT1%2Fqg9sDIl73QK0sJoUopGibgquNKqFn0fE4vD2Djo36PJKfro5SCzwBrsciSmb7azb5DVDQT6f%2B1DDDGZyAC8%2BcKkXKSl8xn3ucyARQNBNQFJjfgntrfrsA%2B0hUtZNTW2LpdzITvwXY7Hd8TRdvRPVR5ddH%2FJnqt0%2BvcBWsyS5UBK3pW9XBWHjJ46SSmCwY0SJWaxOmELaw37kWiZYlPpokUw3uH8zAY6pgF5OIF%2BDeY%2BHYYgtN7BW%2FyGA6AzGsqRkjxJW9LjltBI%2BUInIhWSqW5nY5DrUaQpfR3w8i2RiSOVgkOARrjodMJmvir7hlHstJcGW7ZMheTPERe7jBQg9Npq%2BPpP6%2B%2F21l2TQbHNH8cnhQUhLO4k7HUAdB7mGOc9xUQ8B4wxcAMZ%2F9cDd3rOE3KVdCu2E1va8UrCSuze0MgVxo%2FSILI6YU4WB3EUW1R2&X-Amz-Signature=95046720c741df677f217343b0b394b44733a3953731e71647e8939b2a16984b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCITW2V%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIG7dKywtBxwd3Xudvl%2F2xQceFMTXQyBykxXO6UlPiBNxAiAbGcbajge9vMfKpoHFOp8R1Yzy1Xj%2FHTL2N7dogJSouSr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMCSjH7XfeA6W3xC8hKtwDH%2F2cwRwd8mJz7AOr0xt6YWeI9WU0PP0US9NULuZ4sLdY5uyu0rDQC8qGHLTKr9kdxOx08aCKjQVj1qruCIQqL%2FBUfkZtgZuEVdo1xdOroXC9Rnok0CEXL%2Frc7zh5BPRl48LbhUAS7WICutpPWH5YbQ%2BYAs7A6fayTyoVIlwAH6%2FojQnbnGZv%2F%2FZlrI6racHFLPgdmFHyIx3dglEQ9exiBECConWTaRXrLCVlzWASK29hFkQcAIT98AbYVrqJD7puKZGgoW%2BepLRtPQt%2B8m5g9y5HgscW3T6XzDLomGDWitF8SeNTjb4%2FgbbOS2q3BgizFczr3PV7ynMi4axYvvd6NL6p7z%2B6OiQMBCpmtSrDeoyeT8j251GAlpPoymW6cKGAi6JhLJGlDCu77sh83BrgNa8vw1wAurZFmWT1%2Fqg9sDIl73QK0sJoUopGibgquNKqFn0fE4vD2Djo36PJKfro5SCzwBrsciSmb7azb5DVDQT6f%2B1DDDGZyAC8%2BcKkXKSl8xn3ucyARQNBNQFJjfgntrfrsA%2B0hUtZNTW2LpdzITvwXY7Hd8TRdvRPVR5ddH%2FJnqt0%2BvcBWsyS5UBK3pW9XBWHjJ46SSmCwY0SJWaxOmELaw37kWiZYlPpokUw3uH8zAY6pgF5OIF%2BDeY%2BHYYgtN7BW%2FyGA6AzGsqRkjxJW9LjltBI%2BUInIhWSqW5nY5DrUaQpfR3w8i2RiSOVgkOARrjodMJmvir7hlHstJcGW7ZMheTPERe7jBQg9Npq%2BPpP6%2B%2F21l2TQbHNH8cnhQUhLO4k7HUAdB7mGOc9xUQ8B4wxcAMZ%2F9cDd3rOE3KVdCu2E1va8UrCSuze0MgVxo%2FSILI6YU4WB3EUW1R2&X-Amz-Signature=3ea036d6ac841c45370fee28f6df0414d6cd69404a8c6ff12a4fba3fb6f3ca79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOWGF2BU%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHXhOqJkQnY9Acn4Js%2BwO0KFnaMyaqhHxczu%2F2WX0f7jAiBIccjc4%2BqF%2BOCZkNKF01k6f6PN7uHgtBFAUWHaWBJAZir%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMAp%2B1St9eJH6FPkSEKtwD2YByZql5RwHWRmxLyqKa0ULDhKM8RkUUgTIIuU%2FyaE4MaX2JAAc2D6R4yMJZItR%2BBpLLBcP3GzR2EbTUA52lKVHjdwCf6VqGn6%2F43D2DDOaKpBpCs7vBLjpIdI4fgyN7HbMkTHLephOLjxEEY1FebXfH3bMi86DbiEYmSrnnIlOQEAvVoV80J0lzY8R%2BJ8r5bXP59RZE%2FDoujJOmoJWcRaJZutGwCGw5TX8Q2fb%2B3tZBU1mtczUmOVrAWYdNWOotp4YNbzOtS0UfewSbN2bRG9XYmhPu3ZKzda4C5Jfm249Q461bSs1CshCV8plhSkXHc3ZqAG3t5lYmF1nQN9ZHbs7sHXmWWhbj76jfcQPYD%2BeNuECUolmvn7RljnEChv%2FPwF%2BEF7IogNZCyvVbBfilkfCTCoBUGCap5SyisEdwCqMrx6roOhGgcoWzMjnZAhalWBXFUpmAqggJuRS7CYSaUyRLHVNpqQVHsRFl0RGet0SBNqch0wdzUW9YCa0%2FciXhH398a4Vukpkei2RWgfzBu%2BjhoIMwUbd9WivKeM1jBoleSa7LymjB0HpAt8fi5%2BaArsFTrB7huL0NB5sWojji1BtPA243urnYeIBId2jjI0VYuUIwirfbQrCk67Aw3uH8zAY6pgH%2FxNnbthEk5JpXVNsHj1qkzj3IoHLUJwIoiE0i5u7xygK9caxGVFqiwfSlLKpSAQzERJozjyJUnwwBHa81SINJvZdfexbgr5hXa4J9rQzknxud2e8pi1AZEix7vufHleTdsTXBYMB3ZBt1rECVtJv0%2FfS8pci938W1Aly74Wy43Ur1AKV2Bg5EOiGPaYoDDd5ffINSskROTWnQc4WDuOmuUxweVCKq&X-Amz-Signature=643af4db4453c072a4beb4b2357d6b7b6fbfb8aa845f618be88d26a838a695ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPRK2BZ5%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCSUBbt2OO5v5PoQBoWPW7t18NFY%2BAT5KmLYW8Jao4xMgIgELSIwuTVMUEt%2BSVLNLCfpEhfYvmyfXMuLCh%2BemHYh4Aq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDGCn2R17uTfyImjzvyrcA63UVV%2BgpDdWeGV5jwm%2B76T5mQ6H0id2wp6f7KGrIjBqGhjoYbW5ZCMapugevwl0Fjpgep7gBBtlLZQJJyZrsnJzdeMSf8bo5JZzYEt72v%2Fi0hhEMX5YdN5qA9bBMXUGCLzZ6nA%2BCx5TLSb4tBGidNDZ84fsPhNkakEMtuRzRPSPY%2BB%2Fw8Lp4TNQQqIDfGGPNWMGqgTYYTmDvpR9XmxjoTyv60%2FOp3vF%2FDQkd57vERBPjJda3%2F1mTqIdlrB5xwW5P2CYEO6kDnFKrRqovUhpgqxRFiH562m0PZI8FCKESrNIGcnUupWVFbfV1tQeG1Cd3%2FDpH2c2xMmZEy8uxtwQzWPkj3NU1nX5mUoTdhaQTQXu8UBBtqdO2z0U19JXoIMWIwC8XC9d3ASt%2F%2FO7pRRlCJvUOVypJNUtOT1pkiofg3SkULJXRW9C1yJCpbdYLvr7W5aKQ06HkNbABUOZTb%2Fx%2FD4zhcUw5d6KWiqp9ec6ckibad%2Fz0cYWmwSU34ncStAxA5jf6QOjzBzWWsUocERlObKEIsHjIz9yhyhx%2BrlmMAsTzd%2FeKGN8R%2Bg4CR7VmftsKb4PdFLUs5TLbrYQSVjxvJiUA1%2BYAEaCS9ujLpGKVNyeHNJRW8dNLF5en0VbMOXg%2FMwGOqUBrXZIzLqqjKEQYPcYeTIjNblcS6SBQnuzfGS525TLmMruH16aoU%2FfLWuS48tqNAXdyFYF8GbM3E%2FhjiIQ5EpG5ADebb%2Bpt8T%2Bu%2B%2BfjxE3Xy2jACHY9ZTaVM3ky7dFj1AcLctQShda0nH2oN8tOXS64JcKBUn63TLQ8IHHLt4t%2FTdb%2FdD5T8kOtJlK%2BioNHYQEqje2V%2F4RXt7hTDdKU1%2FirSv0hefe&X-Amz-Signature=1ec4e6efd34fc608248142af91de595cbcd5fd736ef07154c3e932202997dbc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPRK2BZ5%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCSUBbt2OO5v5PoQBoWPW7t18NFY%2BAT5KmLYW8Jao4xMgIgELSIwuTVMUEt%2BSVLNLCfpEhfYvmyfXMuLCh%2BemHYh4Aq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDGCn2R17uTfyImjzvyrcA63UVV%2BgpDdWeGV5jwm%2B76T5mQ6H0id2wp6f7KGrIjBqGhjoYbW5ZCMapugevwl0Fjpgep7gBBtlLZQJJyZrsnJzdeMSf8bo5JZzYEt72v%2Fi0hhEMX5YdN5qA9bBMXUGCLzZ6nA%2BCx5TLSb4tBGidNDZ84fsPhNkakEMtuRzRPSPY%2BB%2Fw8Lp4TNQQqIDfGGPNWMGqgTYYTmDvpR9XmxjoTyv60%2FOp3vF%2FDQkd57vERBPjJda3%2F1mTqIdlrB5xwW5P2CYEO6kDnFKrRqovUhpgqxRFiH562m0PZI8FCKESrNIGcnUupWVFbfV1tQeG1Cd3%2FDpH2c2xMmZEy8uxtwQzWPkj3NU1nX5mUoTdhaQTQXu8UBBtqdO2z0U19JXoIMWIwC8XC9d3ASt%2F%2FO7pRRlCJvUOVypJNUtOT1pkiofg3SkULJXRW9C1yJCpbdYLvr7W5aKQ06HkNbABUOZTb%2Fx%2FD4zhcUw5d6KWiqp9ec6ckibad%2Fz0cYWmwSU34ncStAxA5jf6QOjzBzWWsUocERlObKEIsHjIz9yhyhx%2BrlmMAsTzd%2FeKGN8R%2Bg4CR7VmftsKb4PdFLUs5TLbrYQSVjxvJiUA1%2BYAEaCS9ujLpGKVNyeHNJRW8dNLF5en0VbMOXg%2FMwGOqUBrXZIzLqqjKEQYPcYeTIjNblcS6SBQnuzfGS525TLmMruH16aoU%2FfLWuS48tqNAXdyFYF8GbM3E%2FhjiIQ5EpG5ADebb%2Bpt8T%2Bu%2B%2BfjxE3Xy2jACHY9ZTaVM3ky7dFj1AcLctQShda0nH2oN8tOXS64JcKBUn63TLQ8IHHLt4t%2FTdb%2FdD5T8kOtJlK%2BioNHYQEqje2V%2F4RXt7hTDdKU1%2FirSv0hefe&X-Amz-Signature=1ec4e6efd34fc608248142af91de595cbcd5fd736ef07154c3e932202997dbc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBZO2KAV%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T184459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDkqnEO6xQ8hMlFWhIUrPaL%2BVuhCoPiu2ksIzRdNbdupwIgR6eo0qmte4qKVD05d9NK%2BV9X%2F8iNkDLEo3B3vypmRncq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDEXbfiFM6Ptwz%2Fr9ZCrcAxS%2FC0kJTWLSk%2BqoMCXm95lkNxcty8Z8LZ4POWCGMTlLIYjl8NGrn52mAEuoVzdw20%2Fi9aOGhG%2B5XntyHm%2Bd8mlDhNVh%2FUxomkE6Ny5lB7GDn0HNVA%2FvWBaEt08wlQ0MEN6x2FB%2Fglrs%2FFXQikELCqY6Q9uLJUI%2F0XoQNQ5RH8RrNe3zOJbN7qaj7ZJOdXM6QUsVPzHjs54CCdi%2BNtqCCj3MNBzwwcrmLQd7EsluMsQkNkx%2F9MLLgy%2F1XvMsLiFWnYuUQ%2FkzlcJDySSIDkaZTQ72iRwOKN1xyx81bJX%2FFvBsziH5tVBg3T8cuAo%2BeD1yBJZL3srlD%2F8TgFhrPF9DHNUD4zCXUP1lJ3vZ5eTgGKzz8JpcOlA9OHJphXS9ro0TJ4nPATPWq7dLURncra07ERjKh5099F8EH7fbeFGWh9JPi06Jm1v1C9RvPHDOqT%2BngXKmsIE4ZdMER2MzMnMPOUX86%2FIx%2FG0%2F%2F8aPAhS6n%2BuQBdn7g%2B%2BCmbxjoR2%2FbJp0cw6WfZXw%2FsMbhPhQ%2FCO5baDmPQQK2JLcmkNflCZfklMmjdHTMDdPjHaToVcqS2QjrCE5vfxrX29ZWDJ%2BnVVQcShlg9UgtiFCE%2BhKFcIXKgyLDMUbs8BUnLL9Kc1uMLyF%2FcwGOqUBkVoA1mirtWdc3N2BEutUurSBDxlPQMjdDC3QPCQfVDA0ufRCCk7AkY6mCzl0%2FJeEB1ELpYOPspIOpo8g32tQjaaJ9Wh1OCzE66EhatS4%2BU3Qq%2B5PpPbhaHiPeDGGwIx5cok1VUEZMSUiI5uZq0HLxbqZm182aW4icsWXmGWHWebtzQqmxRhoKHYQ2taKJQX5Egusx6pR6Q1D92oMxYCrQ3kJfFys&X-Amz-Signature=a04be423b607588d4b6510c57bd7887037452691d38fed63eab6530fea540184&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

