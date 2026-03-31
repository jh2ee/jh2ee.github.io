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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZG43YQNB%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC%2FqMU%2FOr74UZGF6PnmlnAt%2Feb2n5lYGCV0EhE25D6INQIgUX3iCTiH3vPjPKfRmAz3cfNUKz1saqu3hWgdOZgciKMq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDOt0wu8nnwe16yeuDyrcA%2FYv6fbHJcpQ6DU6zaLZ8B7KPX%2Fzw74tPQdrWWERcikYof6rIALJ2wEbJUbibLbdm2bdCxHMXlgysycS6J6OggOlX1qeXo3VpzyQWtLDQFBFk6dVoA15fe%2BTgb0PCtTgyMSwDMEYeCgTPuag2n9%2FGFr1tR0VEKikbxsQpRqCSNfwvZChLzKs5zqsS05Rm8hrNQzrSeNmb5%2BouHDvx%2Blxt6rNIzC%2FifYMnxHz2DjAPjzo9t2AWjVJ6HEiyKkQeXhwwlWZWgIFVykm9RMev3bRPAtYAKE%2B1Mtsbc8NbEn5tbq9eDXyasc5b9OQs%2FzAfEcmMvlpvdQcJuTkz3XmCPvPC6xM0b3WD1vdm0E7PPUH0wCzmTcVsXUFj3%2BgnI43dEJpr%2FacSbsjHqMAQNauZwxXlr6kwzTJgDh9YetMMqs96JfOuSI4c83hKryTeL40g27yzcsmlC6gNtYtiUT9tshqTFquwg0jFzj7q7Do%2FagrqdULjr5vDOyZ1Suc4qT9aMsNyiIFldTC7KcNCSO%2B5flM9rTlgyS1YyWguhUDrqd%2Fd5TCaTrPqux3ZlpL9JOdGXQ9UvH3OlBlkIDQZiqq5eTT58zkxIYhrue7jyaLF%2FcGpK%2FQBT2J3zyf7fvD5cyWMP6ysM4GOqUB2QZOQKbfFWRB%2B9CEmCQ9aeuymg0BDnf0JE1gpuNncwMiWWCunIPYFvJ%2BL010%2FmhDjOfFRIvsSxVqC3IJwO5lq8uV2h8FyKFW4o0rHXsAQfleVRW2dSKiscUUZ2B43397nVo5IyObiRoAeQMo%2FTFHg2nUhmtdOJ8Cr9PFcwiYO34%2BupH7ky9K36qkJPQKS65JuEau%2BcCQ2U%2Bm4bmA%2FFEPB4uNHEAI&X-Amz-Signature=19711bb9eeb31762dd0f78c42698784c7d502c0326f7f9a2653317ca59f54c63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZG43YQNB%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC%2FqMU%2FOr74UZGF6PnmlnAt%2Feb2n5lYGCV0EhE25D6INQIgUX3iCTiH3vPjPKfRmAz3cfNUKz1saqu3hWgdOZgciKMq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDOt0wu8nnwe16yeuDyrcA%2FYv6fbHJcpQ6DU6zaLZ8B7KPX%2Fzw74tPQdrWWERcikYof6rIALJ2wEbJUbibLbdm2bdCxHMXlgysycS6J6OggOlX1qeXo3VpzyQWtLDQFBFk6dVoA15fe%2BTgb0PCtTgyMSwDMEYeCgTPuag2n9%2FGFr1tR0VEKikbxsQpRqCSNfwvZChLzKs5zqsS05Rm8hrNQzrSeNmb5%2BouHDvx%2Blxt6rNIzC%2FifYMnxHz2DjAPjzo9t2AWjVJ6HEiyKkQeXhwwlWZWgIFVykm9RMev3bRPAtYAKE%2B1Mtsbc8NbEn5tbq9eDXyasc5b9OQs%2FzAfEcmMvlpvdQcJuTkz3XmCPvPC6xM0b3WD1vdm0E7PPUH0wCzmTcVsXUFj3%2BgnI43dEJpr%2FacSbsjHqMAQNauZwxXlr6kwzTJgDh9YetMMqs96JfOuSI4c83hKryTeL40g27yzcsmlC6gNtYtiUT9tshqTFquwg0jFzj7q7Do%2FagrqdULjr5vDOyZ1Suc4qT9aMsNyiIFldTC7KcNCSO%2B5flM9rTlgyS1YyWguhUDrqd%2Fd5TCaTrPqux3ZlpL9JOdGXQ9UvH3OlBlkIDQZiqq5eTT58zkxIYhrue7jyaLF%2FcGpK%2FQBT2J3zyf7fvD5cyWMP6ysM4GOqUB2QZOQKbfFWRB%2B9CEmCQ9aeuymg0BDnf0JE1gpuNncwMiWWCunIPYFvJ%2BL010%2FmhDjOfFRIvsSxVqC3IJwO5lq8uV2h8FyKFW4o0rHXsAQfleVRW2dSKiscUUZ2B43397nVo5IyObiRoAeQMo%2FTFHg2nUhmtdOJ8Cr9PFcwiYO34%2BupH7ky9K36qkJPQKS65JuEau%2BcCQ2U%2Bm4bmA%2FFEPB4uNHEAI&X-Amz-Signature=19711bb9eeb31762dd0f78c42698784c7d502c0326f7f9a2653317ca59f54c63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REWZFRRI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDAyT6E8OmI%2BHhvEQG%2Bv3X%2FJwi6IULCgSQSIeOnCtBSaAiAvPWH%2FLwjZwfIIeUqdwROl8qmyTcgFlly%2Fe44HJKc8Vyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIM5QnsVX%2B4Z4mJjlBPKtwDZLnZuf5t%2FMxNiNRtMnpRHRbOxTA%2BrXXcdkVWv7N4fQgIU7gGvuzeTWtPEHdv27LIbLmaBlRVFDGMI7VCvxKTTrUEGB1vHx%2FR29lt2SCvs%2F0SWF%2FHXtovsHgfJDw%2BkIF43BHn%2Bl9gfuiBvrmh4mnh2ntGOGtY3RIYQQfW2qo%2BJbhNo1xhAiRDAuUVeN1W4Bm0D7q3kzFYeZBTF25XXM9PFgKuI8l9Lt0qsCBAjbIMNXTdG4%2BkIYvW2BWQv6Iqw9DzXxtGGlqxFHWS%2FYeM9NWPmf0yK7XQpk3ZrDKDB5NC9ofiFSaghwEUhadSwKBHDgpPZskD%2BsQD8zy6gH3NUHIHMklzBWIy0%2Bjy657DqNfK833uQK8tf1Nllt76aHANp8mElM5hTBvVKOOBnLoSTUZ0DC1z%2Bb8YAVNas46A67slCtzv%2FzXOzNEK4MMeURXmwvzjgPfOZ8X1chAyAtWld4DxhtMzQ1LfbualEB%2BhlawtRttnCaMhKZA3ygW7BZSH4iBDTV1fgJ%2FKR4%2BG81peGM2eGXcksDgdyNMN%2BIMvqsKWo3kfsYq3vDAFHZkssiUtwkPXPr1gtSMrDfo2OEPM41h56y2QxNSiJUtrgEJHkyZ0KZq8tDg9k4elVsbI34kw37OwzgY6pgFH1FGkOV9nVKmRCw7xPAZnRSFIFdcKe8VyQ9Foj6V3RTD10zYP5cuhB%2F2kaVWenvRULTN%2BKhr2c%2B7DWcEk0ujIqZXK58MGLYRnRYFFZOR3hMFuU%2BnnSra243ktF0fiDHf6bwvjFUtpisZd4WIHo%2FWDu5Hj%2B1sqHJsci5WxEpNgfgLjAyQdlSXJwRwpvXHT2PEjec6M2tZqQnhhs4%2Flvm1zSQP%2Frm%2Fa&X-Amz-Signature=ecfe3509d9233e625a3ec7e705d406c5b7425af8dc3758180361d65a6f0c6ead&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIXLSVO4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC%2BRpnV5v5oxq6VBw%2F9pY7X5TdaG4VKXZkmXHipaL3jOgIgMmJiuepqx1OJx4Nu8IGFSsYBuee22NSmrQ9U3nUphbEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBWZdOB3rxQsoyYIGSrcA01diFpGQ6RuFaYmjlWet%2Feu8Jnog%2BWo309KtJpc%2B3FIGSQdVteFmKoh6TADRBaOVq3kQaETGj7uBrVjpziD8AZNLSnjK1yvcoeTAjm%2BjZUMMqoxW%2BIzYcQA1ik1%2BvL8CPbpN%2BFw62hYPfVlUDMK9WXKj6WfDKQNez1TLJGVilAc9%2BEZb01TOeCuYa1MPskpbtj4dkjQtHZwBm1YL2ahmCmsClJeBx12Oz0gpityQULXuMBNILi89a3GQ3xk6RoVo0M2GVWtXOQ3NYdSLG%2B4Kf5ETIz%2BUg2AHfK2APtAo30IsNXAVAdqPvTLdDDypCFyLBIZRk7OB4H1%2FhB02uDKm%2FJRUB%2BHyPuTYF6mN3ZngIPUMYQ7v5iy6VmnVVhFGX90hx57rYlthRPDpa6w6e1I6NRLlz13I4vQv42qkEKy79KE5Qj2gq4S1C1DK24ynx1iV8mrZike8F3NZakP6UCJ6qjRexfjhuOxM3Znnr4HkqTeu0MCFbRtDbxO4WWJe2wB1XDkFlgOcyN%2B1lULZV2%2B11D%2FYi8hjuslmAYtjO7487DhkVdalRDK1zDpwCeakDrT0NnsQ2a5djlFDgHzEQVpbIv9GaARMXAzmiYjB9CE01EZb4nh%2BitP42alVfg7MIWzsM4GOqUBFtF4pCymRp4KB9z%2FwNof45hlKV9goy0n4JKI2%2B6yE%2FaaaHqjvxh3q6yz5jC4fARntO0%2FxCpUoUlWDoXTvFqGSa3D9U1JSWKdyRs3a%2Bdi8x%2BNZziNewOIygsW%2FoplxPS2fZnjEOIXznCDvUtWMLHZptbaFdwjNm1cwOnqJF4lcdzwMDF1KcvErnpQuxy735KZQODVWmA0av3K9xXQ6eLjUM%2FkQQwZ&X-Amz-Signature=036c5bc596a1d6787bbb75fa02156d336df71efb5fe59f045101465e2b860336&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIXLSVO4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC%2BRpnV5v5oxq6VBw%2F9pY7X5TdaG4VKXZkmXHipaL3jOgIgMmJiuepqx1OJx4Nu8IGFSsYBuee22NSmrQ9U3nUphbEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBWZdOB3rxQsoyYIGSrcA01diFpGQ6RuFaYmjlWet%2Feu8Jnog%2BWo309KtJpc%2B3FIGSQdVteFmKoh6TADRBaOVq3kQaETGj7uBrVjpziD8AZNLSnjK1yvcoeTAjm%2BjZUMMqoxW%2BIzYcQA1ik1%2BvL8CPbpN%2BFw62hYPfVlUDMK9WXKj6WfDKQNez1TLJGVilAc9%2BEZb01TOeCuYa1MPskpbtj4dkjQtHZwBm1YL2ahmCmsClJeBx12Oz0gpityQULXuMBNILi89a3GQ3xk6RoVo0M2GVWtXOQ3NYdSLG%2B4Kf5ETIz%2BUg2AHfK2APtAo30IsNXAVAdqPvTLdDDypCFyLBIZRk7OB4H1%2FhB02uDKm%2FJRUB%2BHyPuTYF6mN3ZngIPUMYQ7v5iy6VmnVVhFGX90hx57rYlthRPDpa6w6e1I6NRLlz13I4vQv42qkEKy79KE5Qj2gq4S1C1DK24ynx1iV8mrZike8F3NZakP6UCJ6qjRexfjhuOxM3Znnr4HkqTeu0MCFbRtDbxO4WWJe2wB1XDkFlgOcyN%2B1lULZV2%2B11D%2FYi8hjuslmAYtjO7487DhkVdalRDK1zDpwCeakDrT0NnsQ2a5djlFDgHzEQVpbIv9GaARMXAzmiYjB9CE01EZb4nh%2BitP42alVfg7MIWzsM4GOqUBFtF4pCymRp4KB9z%2FwNof45hlKV9goy0n4JKI2%2B6yE%2FaaaHqjvxh3q6yz5jC4fARntO0%2FxCpUoUlWDoXTvFqGSa3D9U1JSWKdyRs3a%2Bdi8x%2BNZziNewOIygsW%2FoplxPS2fZnjEOIXznCDvUtWMLHZptbaFdwjNm1cwOnqJF4lcdzwMDF1KcvErnpQuxy735KZQODVWmA0av3K9xXQ6eLjUM%2FkQQwZ&X-Amz-Signature=3ceff2123f2afecc9d651d3891cd014070a2baeddeb9c1b8f067d5efe3d7d95e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466443O74NZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIAX%2FF9L12Xew08bZn%2BH4aTjWJ2sIyqL95PiA4D0ZM9HoAiEAsxOC6S%2FppB%2B%2BQDDCejATvnjF4wcyfERVekBWMmZKtI0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDKhW53rO73Ml6dx8rSrcA5coE%2F0%2BLUu%2FAS7K2yARMhhGB%2BxcZ547ANgC6CPnLxaka3oadRA70xQsEVVM1Id9Nx9GqXZDojIYNCIqLZLcdazsxCKRXCurKDJjAW1BJ93dgosh370ESI3R7nlKEQQ7jRNnlq2yIHl9S6kYfUC6go8nJErHqSErz6YJotXZ8ZmNYJ73VYOXujH5nezmvToKqTFaCaubImtnLK2RuzEItC137DgXc14dyM1AoI47YXJUgB%2ByLfAJQwtYql65KpK6%2FBzGRWzL5BcX6dGGb8GJL%2BAtSz0%2FCjGqQsUqjBkicTy6i%2F52TDT4EVlNAQ4UuKOBlD4iEaF2EYWStTTtM6c0n8wNBVKoap9RcFB3JvkxFRjj0qmUvaeXhwPKbbJBFy2V%2B8a5iiC5C59JofC0sgrhKQDMMJlF2G45CSc%2BaBuGCT5OqwVS4A4MkbK3SmYNa2MWpngNWLETcRJLCiqGKrZF1RBQrxWNfj9%2BvUtW8mv2JInAtilp6BWEUGrrPeUtv0aoGw3jVvtmyQRwB60Gp2CRdabMP6%2BknzPu4HVQtTDWWhBNWGmN90CrSAU7Tgu3AOJreJtDi48LOw5BepUAMZjXtEbGO%2Fsx1wVRWrv7FbmR%2FK1HHHG5I%2BXRvcuRrnIEMJmzsM4GOqUBlSVdotDFNYK5L4KE52gijGRalL5onPKKN%2B4kbEXAmDPz9AN3qIF4cSIhKI6IC%2FwS9BJ4SiEF9c8%2FAhAdeCFZTZ7rAW40zbNqoTMDxVsy%2Fb84qrzqKvveayR%2BDyThKJ43cLBUURVwm8zGHPmYE6FbotTWaKGeiiQP2DZXq1RUQNiflldZuyNucLmaC8qUa2cHmsKhyCAokv2P80jTMMF0mmetADJ7&X-Amz-Signature=3b70f176f59de79a614eeb182d501af8774acdcd76885d915b344887a5118afb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YYBEPCZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDlzfQ%2FeeUx8TdF%2BD1b9SlP4ocF05TtFlX9P5qEE00hGAiAhJnKby8CLiEXR9WuSSDXm1cAWdfhar5D2cCxatHFfbCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMMR%2BseYHWoSbvIZv6KtwDixJVXEBYSOqa%2BKNKcYgjXWp0QXY8lPWZTXBlJZcm9MD0mZDdv0ubeFTjUNAU5nv7fNRtl6jl2aavv0s5wSIfOpxaLKpSchi1BsRckxIwIX%2F79r0j5ushbaCDAjYmfxdf8jW1%2B1wWY0sjQoEsZg0bu%2FVX8Iir%2FCPyECZgS07tlA5%2B48PcVu3v1Tx88FE9rXRIhi9tqCNgm5o0OzCvqIGa0ZyBT%2Bv%2BYAzLFS2h267GFxcsBEKs0Ax5GTbpkKkisO1bkmvUloOpnQiJGkcr3JRaW4b9PQMKdeYFZ6PLzBdMmB2xcFuA6RYLVcwQIQwn0hv2XVTEEfsJ9BRz2XTYpykD%2FDdHhapRNe1ErGVixyzWlaUq6qNYW9XwH6FsQ4M31NVCAssU4ya42n7vFZ7MvV8xX7ae57aNijNSItVT9TRp%2BwMn72tMec5lnLuBUPdm%2FxSAUOPuzNr4AqrW5haUSZ4LLX2NFozXKxBVH3vI9IErQ0Q7Zz0SeRi%2BAldaFFWQ3VsmksRQNHeDglv0rXQcUGfEQ6jBhuF2M26bExijZ%2FdVoqvHwoxR5LENr%2FadsubcY94NvQTjz3sM%2FjxEputHu7Vb6SwNHlxHt0qYPIeLnJCs97s6kR%2BEQwZYo%2BQLQ3kwnrKwzgY6pgFTxHinP8270u4HpfZtUOe463PEHwW%2F8VRkn22K002f7quhV9yr%2Bq2qoMu0XIUH9%2BHUv0TmDntNONgwnYMfGPF3QINwYvYdNxo5qm1iBFDVJ%2FDVV7hjpsp66w%2FV075aLofac9JfyUfctP%2FzQqSxxatobF6LtAM9mdcb7izZ74hFi%2FLVfI4hVe8gyV29Bo5ylTdSZT6HecjBOw5KbeLey%2FtdoMm872Hz&X-Amz-Signature=f9a204ccd7199f96245d161935d67bdcd45c28563135338854b4f3cbf184a6b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZLVAWS6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDieyDCMJaHfyjePiMbjRX0JmJ0MlydCrB84eImtMOtLAiBW9VIgGOJqdv%2BJI%2FlXZWqeIc4waO59sgUfcviC82PKnSr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMVWOF%2BiHWfn7wTUeqKtwDclGWq0WTR9abKkyAKVlYQ4m4Ylp5JOltnozvQLAZOgIt%2F%2FC%2FN5w%2B2OS29%2BgOzlIGTf1RyWuq6vSuJO%2FlXaBfcoaVCfjBpY%2B2P4SQdIsa3dXFvJD74jOXb%2FvBUhMI1%2Bzn8cRr%2FIruFBAZ%2B%2FLLZslx3b6A%2Ffe11%2BXEhUX5By%2B80viVqJRkrx56xahfpmd%2FAGCGmWfkCzbvz%2FTfc4WJ4RkjYLuf%2BxKNavqjm6%2BW9nUbpM8R00r5FTkuXoX0O8MpABW7BEY6lbmlAYRZ%2Fi6LePpCiEARNdxdfskoXBb7Ym%2Ba9lluYZT%2FIy8lapBLEc3WYvgAQvOBAWusaYA6kYQos2qghGnnl2%2B8g5Gh1n%2B%2B0cgNZ3oXHCplwbI4Ui9K4eEocGTnFnK0om5zTnceQSf7JJGkgTV1QilP9UDNGMXqrWf3LBCripIa0%2Frv49BttjNLEjYSPds9SeERiBUpTQZlOBcIs2Q1DykiPuwEEsygjxDT6kQc43soUbkKCaqom6Vu4HIzR4LJ%2BGbOuxbir92SMy8JBwX9GEiFuOg5bCpdKvVWKKvSPcSxox8%2B0xuT9MOnoBxgtDURaH62c7HEGHuor%2F7%2FYCEO0QO0Ot%2Bxolxvz421nvifvahJ5E9fDkDXXZcwnrKwzgY6pgGYRdwz0m6wBeEhCidUXAmsr863ZRBg%2FS%2FWisL%2BQR8IfW%2FVJQpPJb4guphygsh%2BiV66RkeaKcOTwN375PviN5xZ5x7SRq%2FkGmiOT1cQvknqJBPziUH7HA2sKP8rYAD%2FzYGI%2FFpr7akGPw0AuD0xn7p%2BM5GDfo8w4S5T3PN9%2BFKYT4MIiha9MghmkpQa4viH33RDpLP9VTOcAe0bUhuK8dfpRicTCxbJ&X-Amz-Signature=915cbb813dbf860ce42ef766efa05b08ddfc3fe2d6965689cc997ba7f882a7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JB673UM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDjMb4tuphJR0rLqAdTOBl9qkseWRdWh41KkqYIZRZ6qgIgWyd%2Fe72DrPtRNWCRUZvaH%2BSSnqMwgAZd8yRUcZA%2Bc7cq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNOFwWm9dZPlGsPd6SrcA8ksO%2BAwWALAG%2F4G%2FuYP%2FhDqJI%2BKG0HNbs6oF%2BuYjEtFygD3ir6%2FEDo9MIHwZ9gKhHVM7gyl%2Fu1P0FDtsxbpXv2V4cFI3a82a1xCH5KIiPFh%2BT7ZVdxmAsN2BbSRcff1MdgFhPGOpscfsBuO5KQ94TFpDvuRynHB4rET528q0bts1ktc3LuflXyEdsgSd6TODSYzB5OmEOOTr0mtUV%2B23QEIW5DUpN63P1TUKPvsAopzVhXxcSzxiQvwUB6OwSO9hGKDHemOBWB1hADp1uRp0z7nT%2Bn05BS5zobitce6R4kAWVrKKeCKhoiEqE5Uf4D%2BSWQVwIFQfbGGekO%2BapKJDCXCSDbQiOCSGnGlZ28Va7Ji9tOIZRtHEl1nsyD1z%2FyYGLKj0WhkY7yYv6QWpmuevCfir9J90h%2BDIaxuZHwIRRH9Copqm%2BY2waqHaa4bKOxakYvvFclLIK5K9hTEWIaSk%2FbxSmrDjxJOTLWSzbxp05bMUJn7%2FoRtZ37z3EZ3iINqGrYAZfFMqvvI7C5TU5HL5RurOS30RApsVpudXESijFqDaNNosaR4X8k9gP9U5FZGqbl98j5QwUSO7WcL0U5Djcie8q8VbOTrWi7M7Y4C2ehe%2F%2FFmA9HwvLUtp6xSMKWzsM4GOqUB1QDfHSHTnXvDtXleF3jVCodmatRKb1RhC%2FW1OttIY5VEnKyoqkuV2%2FIV3FUvuEQRR5MfvjW0AZYnS3M2VtRrJYeHdBYLe0Zr07xBSCKwI%2FOw268eMCh2CsLRwrS1W6leA5nJqifvpxF4VJe2la1M0IkuOIotWLS0fQeNlasMT57kzd0fY%2BiBmlM2SwAAmUMyAl7PboP4KIiZ9Det5%2FPWY924cXVW&X-Amz-Signature=44f78b75428c3a9c83a6d740e9e5338e9f99b9ccfe44d9f608bfe7099912a5ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JB673UM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDjMb4tuphJR0rLqAdTOBl9qkseWRdWh41KkqYIZRZ6qgIgWyd%2Fe72DrPtRNWCRUZvaH%2BSSnqMwgAZd8yRUcZA%2Bc7cq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNOFwWm9dZPlGsPd6SrcA8ksO%2BAwWALAG%2F4G%2FuYP%2FhDqJI%2BKG0HNbs6oF%2BuYjEtFygD3ir6%2FEDo9MIHwZ9gKhHVM7gyl%2Fu1P0FDtsxbpXv2V4cFI3a82a1xCH5KIiPFh%2BT7ZVdxmAsN2BbSRcff1MdgFhPGOpscfsBuO5KQ94TFpDvuRynHB4rET528q0bts1ktc3LuflXyEdsgSd6TODSYzB5OmEOOTr0mtUV%2B23QEIW5DUpN63P1TUKPvsAopzVhXxcSzxiQvwUB6OwSO9hGKDHemOBWB1hADp1uRp0z7nT%2Bn05BS5zobitce6R4kAWVrKKeCKhoiEqE5Uf4D%2BSWQVwIFQfbGGekO%2BapKJDCXCSDbQiOCSGnGlZ28Va7Ji9tOIZRtHEl1nsyD1z%2FyYGLKj0WhkY7yYv6QWpmuevCfir9J90h%2BDIaxuZHwIRRH9Copqm%2BY2waqHaa4bKOxakYvvFclLIK5K9hTEWIaSk%2FbxSmrDjxJOTLWSzbxp05bMUJn7%2FoRtZ37z3EZ3iINqGrYAZfFMqvvI7C5TU5HL5RurOS30RApsVpudXESijFqDaNNosaR4X8k9gP9U5FZGqbl98j5QwUSO7WcL0U5Djcie8q8VbOTrWi7M7Y4C2ehe%2F%2FFmA9HwvLUtp6xSMKWzsM4GOqUB1QDfHSHTnXvDtXleF3jVCodmatRKb1RhC%2FW1OttIY5VEnKyoqkuV2%2FIV3FUvuEQRR5MfvjW0AZYnS3M2VtRrJYeHdBYLe0Zr07xBSCKwI%2FOw268eMCh2CsLRwrS1W6leA5nJqifvpxF4VJe2la1M0IkuOIotWLS0fQeNlasMT57kzd0fY%2BiBmlM2SwAAmUMyAl7PboP4KIiZ9Det5%2FPWY924cXVW&X-Amz-Signature=58441721bf25b76eed0f2e791781f4036db5ef35d1839cdc01713ca023da15ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XNSQXTX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIGTthMFVdCTdwmuuf4EAYlUfkUYz%2FFejqFhtUchrdGAZAiA025e%2Bjl%2Fb9kNYHTOsca4Q4ByUDc0M9Cwy6XqIM8Hmhyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMvv5ccYDylYKi723cKtwDWFdjMcgZ3SUhtbDFgzyCnjJ%2FQ8eYHAGAwtGeRWBhL26IWU5lRHoRINyqe%2FO5Xv9WDtZPIvpp%2FgrBENYYk6JUfzIoqp9ZSNJzvPTsqwZFbmm%2FM%2BIOMXCxlmc9xTL1YBIAUyM5c5LSy4W1tz9Q5n%2B8EEKzvbbnF2pw%2F4a2luX1KTLgASRIpvrkof2vvez%2FsMX%2BgianlG1FRwTDyUFbS2naSBBrhBlhIS8f7QGhiIelD%2B%2BE1ZxOH%2BS%2FooXeMPmeNSR4P%2FAIX8%2FpzuXMrGhXVEz%2FbvRs0USVBxYgn8ImTOoPuFm6ErHq64ZDq%2BP6I%2F4dlRhjbDVdWAUO78D0rypLif0ugyRZ76rAHkE4mtF4dW%2FMZNcZJ0WccwxLKc17IBE7x%2FBGAUgJptA5zlTMAUn7bJnWpVwW2ytvit4MElHDZ5XticTlT32KkZvjWYWWNaMct2bdSDa2RW2%2Fsp5%2B%2Fbx7yNQWz61gA8Ll3inKW8hrOwvyp%2FSTmUp0Iy2hGjKWp5nZ9W9XxHfmEIijw3if1rQarC7c9uGJ8wqyd0n%2B%2FncnifwFAfzfjBcyU%2BIggDHYiuZjVY%2FP8ampMrV9mcLsVLxjHJ1TNe0K4XQTqIAH7IEWTXuw13Us6Y7kW4czo7uUUwwwr7KwzgY6pgFVKi8pmSqReZ2cL01s50VaRXeT08TTtK5KrIPMgAHwjn%2FjHN5bdgfeO4wVh6sfY7lvjOWcrLmLvWyQhVuISjDkvuVRqyM0EKLr%2F%2BGznCt%2B1uGPwpoQnY0EmUlg5rd%2FJH0KnbVqbZTmG5%2FIFoU%2FYcu%2FRJxhaukBUmZHugrl76FnQVXbDuAmjxvd15rtnit6S%2Ff2bXQFiSMiQ2O9Wf%2BIYssvdgNoWiLk&X-Amz-Signature=eaae129325330f8d3e0218b9f9accf8378b9e71e595aab86d14d3eeb8273133b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SU3I6MJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGjbmmDFzhmYZ7N3gs3T2DkfPj8D%2Bmh%2BZbwSJyV56VDYAiEA3oZC4ssU173dWAvzVENJF2S9%2FZTKcuJzp74illtPbLkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDOxQslZa6UkJ%2F53HzCrcA9m2SDNlUCj8p3kCauV3Bya7JHaFzo%2FKwyyVxorcdUBG8zkuhkeRl8ZjoLgGnGAeQnDYkDTm4uq6%2Be0SpoC079CVTUYODJO13wVe3s7T%2FkC%2BpN2Wi6Kx7tuAxIUPuezvspf1n0vvHcniCirr82ce5D9yMZE3eo8W7HpbRBOT%2BME51ZJH4nXUZsZvRVcZ4kqs2oKBvI9Qhv9cDmZgPze%2Fmf6NpsNwnszJy2OuQpAmtYdPM%2FvuQAkjofV1AsVeI%2BMJ3rtVa43fAFL8FlP3pBvUgR5quUBeU%2Bka2EdomZ4YxZ96aWbngrif1nFjYy9abvFaJrcVLvMn7%2F9eOBnA%2Fiklm%2F8ZDQjF4WNJfDxifzeHbcGX6jISq%2FxUr8WHfaRl%2Ffn2E%2FjDJn2yR81QYfp%2FiaLB5MQf%2BDn2OOSKLfOC2P74gS7CDpsW1gmU4EI1KdkbNSZHBivOVV3cn5Xuc%2FFTaTC3qb7iX%2FKTj1IwT48PE3d8F0MBIMKiF5y9J0b5COoXzRTuiNI6DXrxWP3yzTEpZ%2BduugUnnluGZrtwu82r4Y1kMxHmje2idwvGO%2FGtzuLsGLTr62TV1BsJZsJ13iUGaWrv1nJm3XGG7ZHXxAJHYarZXp04yHkVL8aEtA55epWbMK%2BysM4GOqUBadiwgo4g6FeqVIECK5hyGu8BRpNkVbo%2FWgV41a%2FPLMEkv%2BClrRe4PrJo83%2B02OUYyutcMippiGIDqwyWiKEQbgPgo4twCDlJWzCGl%2BPnXiveY8oISbGM%2F0i%2FQucVTxA8rJojbE%2BRr%2BPGAyRG6C3Rg9%2FY9Y9QcwA9DLPZVSfFkBPx4L4DBLSjIltl2c1ZObG2Z%2ByvaFJTRFenNIZ%2FykMZL%2Bik5kPz&X-Amz-Signature=43595fe7e100480b1edf3ba13ba4bbc2b036083ef62f1d978761dcf2c59e63e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SU3I6MJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGjbmmDFzhmYZ7N3gs3T2DkfPj8D%2Bmh%2BZbwSJyV56VDYAiEA3oZC4ssU173dWAvzVENJF2S9%2FZTKcuJzp74illtPbLkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDOxQslZa6UkJ%2F53HzCrcA9m2SDNlUCj8p3kCauV3Bya7JHaFzo%2FKwyyVxorcdUBG8zkuhkeRl8ZjoLgGnGAeQnDYkDTm4uq6%2Be0SpoC079CVTUYODJO13wVe3s7T%2FkC%2BpN2Wi6Kx7tuAxIUPuezvspf1n0vvHcniCirr82ce5D9yMZE3eo8W7HpbRBOT%2BME51ZJH4nXUZsZvRVcZ4kqs2oKBvI9Qhv9cDmZgPze%2Fmf6NpsNwnszJy2OuQpAmtYdPM%2FvuQAkjofV1AsVeI%2BMJ3rtVa43fAFL8FlP3pBvUgR5quUBeU%2Bka2EdomZ4YxZ96aWbngrif1nFjYy9abvFaJrcVLvMn7%2F9eOBnA%2Fiklm%2F8ZDQjF4WNJfDxifzeHbcGX6jISq%2FxUr8WHfaRl%2Ffn2E%2FjDJn2yR81QYfp%2FiaLB5MQf%2BDn2OOSKLfOC2P74gS7CDpsW1gmU4EI1KdkbNSZHBivOVV3cn5Xuc%2FFTaTC3qb7iX%2FKTj1IwT48PE3d8F0MBIMKiF5y9J0b5COoXzRTuiNI6DXrxWP3yzTEpZ%2BduugUnnluGZrtwu82r4Y1kMxHmje2idwvGO%2FGtzuLsGLTr62TV1BsJZsJ13iUGaWrv1nJm3XGG7ZHXxAJHYarZXp04yHkVL8aEtA55epWbMK%2BysM4GOqUBadiwgo4g6FeqVIECK5hyGu8BRpNkVbo%2FWgV41a%2FPLMEkv%2BClrRe4PrJo83%2B02OUYyutcMippiGIDqwyWiKEQbgPgo4twCDlJWzCGl%2BPnXiveY8oISbGM%2F0i%2FQucVTxA8rJojbE%2BRr%2BPGAyRG6C3Rg9%2FY9Y9QcwA9DLPZVSfFkBPx4L4DBLSjIltl2c1ZObG2Z%2ByvaFJTRFenNIZ%2FykMZL%2Bik5kPz&X-Amz-Signature=43595fe7e100480b1edf3ba13ba4bbc2b036083ef62f1d978761dcf2c59e63e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MROQSOX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T194413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIFPr8d%2B9Z2zzLisMLl4nnqzw8GnbCpoyav%2BejczbNbQ0AiBOoMNku%2BYguIB0ufEW3QlVQnL0%2BxVwU8X0ITzpFEIUOyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMtQcRA4IJXbp5VNOvKtwDzWslCfPJ%2Fjyzg%2B5TN%2BjSZ3Bf4%2BGPjbqC7D%2F7XIj%2FnzUDs9s2gNKp5LD5NBNaPv7VEN%2FyLpm1qXWxXDPdI8WRYnSiKjWrZ7MDRRfP54drUi7V02WBpn281pcvBhoXz0MXKS2yN1MbP400JX%2Fe4lv4%2FJV%2BVXUGtddUt3015%2BNaW746zQUUAZ7Zu4FtiF6HunUuRLPX5YuXCZkdn14bKGQjr33WU4jDCmw8ca%2BNA3aIgy3My6frjCxCrLolNAVnOv%2B8hUfabOqIg%2B6HmZvJCVDABCeH%2F0eowY1wdfUvPcARFwt4BdZu8%2By1o%2B10yjLXGVeC1Ts32C2MDdOPP9DAikccukCvVlsMGlmqar2LyfH9RZ7cYmDJ7B44msgWoo7x8TM9gTrTMrA4UUFhLe6nbZnjqvRRyKDmN8%2BgZ7KD37UhGJu4C2h30z2CBp9z%2FCb8sEA6ntvTOPBYDG2kYKQ2QqTPoT%2B5sGIHe5d7AWnVp1%2F%2BWI0zV4ka%2F%2BXHcNxMMWkgdC3Zq9vKyPJvNdkseEXu%2FGESo%2BJo2gQCleZcoRWjNOYnp3c8%2BATVmrxVYlMAruZXBuLF6HvArvNl5KydCWtGSyh0NTlMuLv6oIRjG7gl%2BJY3Zz%2F3htD07oYWteL7iwMwybKwzgY6pgFi8SiamNbQodzsG9anTYjguyDe4t32NAAv%2FIYWyJtiTqqgFpoB2mpeW2v0PjqZrhCl3vJ3KXL1iJaDOujfsLTCdO3yBLAzq0ST6uVFD14PdtFDJ%2BPZ9M%2Ft%2BK4rLvN%2Brc%2B4EMv7I%2BWdFjXfqYMAr9BYED6DRpPTj28NoOdzIBeJWt5wfxOhVkQ%2FRTRIgkE4eQ6rjWB1fkcDvG8He2Ds4rWFBgjAO%2B6D&X-Amz-Signature=cc01e961a3636827a14e7fa6d4e1ba6020f8615136680001e79d0c6ebea3c365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

