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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRD2GIYJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOBC4alcrjHSUjEC1x1TbAimsnI5Cqyvz71ouvaWPXzQIgaWDSczf0n1VWh%2B1lWbMqGx5yKsoQZ8UmM%2Fm4yW3adIkq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDDaOFNK2699J%2B%2BoOdircA2UFGNjSpruXnFWPQX%2FUTYktOrOj0gfO2L1DDCjgjqdcAEuIPVdUE081qM3RnzxtEA7og%2B6sZd3GZyYr6paEHLN7YeYwfhT9WlW0HLlrvaXTKa6iEuJC5xfZFk6auNMva33UPMuTXCivwKwOF%2FAon%2BJHRuHr1J90RrE8ryG4pf3cFKW%2Fzk5cE6UMY9QylOI9kzpB%2FxlG6ez3VH2EFonIHhdZzeP8fs%2BtM3qPyUVNjqmO5JHOVs%2FlL1JIiHzk2dgG6envKW9Cl1fpcDE26jSjX5LxkvD0KKRJDwyNSDyYzBIbiy3fU6n%2BCJ0u8tp8tDRffI0yeirZHRIYO8rcj7kqPOXv6P6DOdglahx6dA%2BRvkeAMSRWi5pNn09HE77RXQ%2FBl4qJwQi9AytkrRyuMqLpdagvM3axZJGROZbu30DsE6uDoD53fFojxXIdZjGyFDe4bAe%2FwJwxKmSVR6rxAwUCdBX167ayfxo4FE5McrXANn0XmThXQGGkLcBFcIAM5oUSMbpnSPihXUHZnUzWWqdTGOGos5O7za4LJ%2B2Z3S7A6dE89Q55jrRsmmv2hRxApmg335yhzoidFYLA97BYGLSeRtHDpay7intlBmZXsXybu8hZAH1aBWnVgbU05HY5MPi9%2Bc0GOqUBhNCLHuU6y6XYujUwVHTxQFn3lts6589uFUeZJuz4yFAczi391ZRicnlc59DXPCIwC65fCEP8hvW7Tc5tRGemKHW2LWRZQyqS8y%2BzJdqMiRFmYqYv6xN7IZEp9vLeKQlr2jS9CrdjkwPXNhww5yhF0d%2Bx0cZYRCNuay%2FetoFdJdgIyB62fQDpC4wfG0Km7orR6Ptsa%2FEQFmrqCv7JJHnPuDcYK89p&X-Amz-Signature=1dfc016458e20371ee4a16deec007629518e57d215500255f94b4cd26492fc99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRD2GIYJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOBC4alcrjHSUjEC1x1TbAimsnI5Cqyvz71ouvaWPXzQIgaWDSczf0n1VWh%2B1lWbMqGx5yKsoQZ8UmM%2Fm4yW3adIkq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDDaOFNK2699J%2B%2BoOdircA2UFGNjSpruXnFWPQX%2FUTYktOrOj0gfO2L1DDCjgjqdcAEuIPVdUE081qM3RnzxtEA7og%2B6sZd3GZyYr6paEHLN7YeYwfhT9WlW0HLlrvaXTKa6iEuJC5xfZFk6auNMva33UPMuTXCivwKwOF%2FAon%2BJHRuHr1J90RrE8ryG4pf3cFKW%2Fzk5cE6UMY9QylOI9kzpB%2FxlG6ez3VH2EFonIHhdZzeP8fs%2BtM3qPyUVNjqmO5JHOVs%2FlL1JIiHzk2dgG6envKW9Cl1fpcDE26jSjX5LxkvD0KKRJDwyNSDyYzBIbiy3fU6n%2BCJ0u8tp8tDRffI0yeirZHRIYO8rcj7kqPOXv6P6DOdglahx6dA%2BRvkeAMSRWi5pNn09HE77RXQ%2FBl4qJwQi9AytkrRyuMqLpdagvM3axZJGROZbu30DsE6uDoD53fFojxXIdZjGyFDe4bAe%2FwJwxKmSVR6rxAwUCdBX167ayfxo4FE5McrXANn0XmThXQGGkLcBFcIAM5oUSMbpnSPihXUHZnUzWWqdTGOGos5O7za4LJ%2B2Z3S7A6dE89Q55jrRsmmv2hRxApmg335yhzoidFYLA97BYGLSeRtHDpay7intlBmZXsXybu8hZAH1aBWnVgbU05HY5MPi9%2Bc0GOqUBhNCLHuU6y6XYujUwVHTxQFn3lts6589uFUeZJuz4yFAczi391ZRicnlc59DXPCIwC65fCEP8hvW7Tc5tRGemKHW2LWRZQyqS8y%2BzJdqMiRFmYqYv6xN7IZEp9vLeKQlr2jS9CrdjkwPXNhww5yhF0d%2Bx0cZYRCNuay%2FetoFdJdgIyB62fQDpC4wfG0Km7orR6Ptsa%2FEQFmrqCv7JJHnPuDcYK89p&X-Amz-Signature=1dfc016458e20371ee4a16deec007629518e57d215500255f94b4cd26492fc99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXPYVEAM%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwUOm3mNXwRemSl97FAd8LoBGElhjPcYgwufH6biaDSgIgc7gc66sjUhTj5dsJxZVczS8zChFXNlyHEG2cVLX3jIMq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDK7zndA7165%2FewtDwircA5VD2zBWLPyJA%2Bx27j5NZGsF8jg%2BGs8u1QAYYWWF15SY4ZmHTZ7JBkMEjA3h7cslzr64j1mDbmo82VF%2B7IK1lQwloAzBL2CeDs%2F8QqCP3oQj9Zt5NfsUChjdSWeZGBq0gGIXlufX1CcoNb6K6PE49GT%2FKWitLeGUWMoLcXOyY8arjHvQpxrz7%2FsdVmZb4TvwtGqv1KySTlPtSdTIlwRk1gFZfNBHv4oaCDHDCwnfUv3dtxclojICXT4ludgj4TygjNZYPu4YHjQLosXX4WG7OA897Sjhc%2F9MMLR9A5KnLaLq31dZmdLtXmph0JWrdJctyhsOVF38gFbNBnUlPJ87H1o45IO31vcQpYitVwTuK6BCJj8%2BIfLqKQA7FiKpE6MkLiWSvs6KFDXqyuInJuNDVejSF1bAEVYgp%2BibzeXwn5OOQrpIcIx3Dks1fW3NLZARjnVQtNoutrznwS2x8KJMjmuh8j8JSareuJ2SdWtih2IGYPo%2BC8AA8qO9V7nODlvif1Lci3Ukr8Yyn1WTq%2F%2B2m9PQdmPZcL%2B0jc5tnJif4KBseIglycz1fWLWeGju1BLDV4bthXlOuMbb7AqyCUdL8rI3PWzYwldkZ%2FJi5CsQQAQA4XP24ovXejjxEGvkMIq%2B%2Bc0GOqUB1KbmrpggHOBKLbLblUV0RzfjiznBq4lLOXH1%2BWzV9HzuJlgyQvtTysqfMrVGGqXeZ3hNBzs%2FEbk%2F3dzKiq2bPMVzpYv2U1QoeXf0yidJ%2Fh4JVXE3YCjBQ6cuJ7uE%2B8KQJPj%2FfIgNflo8x7H5nT13BBtIWZ6w2oiZ1x3qaYg0XyZZHxEguUnzdYT5u%2BHV5ydUeFPcZzTQOmoX%2F3c38nLQLDRP87Sz&X-Amz-Signature=37dd24074bf0f19fa3b7016e8cf3f65cbb71b9608cea948b018061d5ffc3bfb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QJ3KXZI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDllbnUj8G9%2BzbovvvFWaR00xN3gFcPDxExa0%2BljJG3WQIhAI0RDk5iMqtYmE%2FL0kWXaoAaOaZw2rUqr5zsx5%2BgYUO%2FKv8DCEoQABoMNjM3NDIzMTgzODA1IgxyHoxoY%2Bf48ow94dcq3AOLgHdmTF%2BNX%2B4hSmoICRrSVW6%2B5dvyyzvNVHFLlCgMc%2BkkA10u7ybM%2BVExs0w5OR%2FNtW%2BhUN7Dh%2F6JzjR02jBu7OoRt23pkK1L7rb8BkhYBb9QU9Y%2FvJo7V9umk5i78sRVphFNyJlzkfjKfKqOLMHd2OFnT5CbWrbREsklDE8t3zq%2BYnPDmZPEJVgjQvjhjnwd7DPD%2FutyExFNjFxikKCF24J%2BMqnWhBtG8OD38pGemIHEfaUgsRTOlQYy9lImH%2FjYfgQQ%2F5wvYmbWtKTtKTygouOHIaIKpdGxAvol7dG%2BD7lABi5EM%2FhMV8VUhLP9B%2FQjDPnnSAMyrq1XY3%2BnwPcim9sG%2BwY1jo2m61auXSU4wDvTi7cnBvbO5szVYWRTSmjyU1CynGqeBdJTyZe0K9aIQfnKrJoo17SNSotdTzB%2FyYnEmcGkWeWb%2BNNo%2F6J6w7PN9WB%2FlkodeZ9DM7Dq3WyD503wNLbyx12KIO1QDoLxMklt%2FeGDTtdXKvCzKwbnon3QrmmDBAkTt%2BM6Rq%2FxpudmhCTAMeSYZGXbAxcQebh%2BxYKo%2Bb3ze636lGoEvkUb4izzJ1d433Q2o1xwcb5qHHETlXEUKPvTlc%2BDrpDKqYCSIKECBlEWNjW5sCoFMDCcvfnNBjqkARNGsd6kMod%2BwVQtpQXuxQ%2BswUrjAsq4Ce42%2FXWgDifUvARIAFkAOzO32OwRHzTobilWQWy9IqRuNC4p%2BiSFo6kk0v36di6YxOrELiboOr6E7Mx7IK9lXw%2Bb1ThxJmy3Ge%2B66Sn8L1HO0M2Cz1P31hVBCeY5CUo6cVLY56%2BkGu2sEsLOVP0T2%2Fl%2F2APLauY7x31ce9UdEUczkOJAmi73ER2ZOTmZ&X-Amz-Signature=a08b4e8ca3ac07d022dbecc2e105735c6b7dfecd0f9f6c44c4c44fe361facdbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QJ3KXZI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDllbnUj8G9%2BzbovvvFWaR00xN3gFcPDxExa0%2BljJG3WQIhAI0RDk5iMqtYmE%2FL0kWXaoAaOaZw2rUqr5zsx5%2BgYUO%2FKv8DCEoQABoMNjM3NDIzMTgzODA1IgxyHoxoY%2Bf48ow94dcq3AOLgHdmTF%2BNX%2B4hSmoICRrSVW6%2B5dvyyzvNVHFLlCgMc%2BkkA10u7ybM%2BVExs0w5OR%2FNtW%2BhUN7Dh%2F6JzjR02jBu7OoRt23pkK1L7rb8BkhYBb9QU9Y%2FvJo7V9umk5i78sRVphFNyJlzkfjKfKqOLMHd2OFnT5CbWrbREsklDE8t3zq%2BYnPDmZPEJVgjQvjhjnwd7DPD%2FutyExFNjFxikKCF24J%2BMqnWhBtG8OD38pGemIHEfaUgsRTOlQYy9lImH%2FjYfgQQ%2F5wvYmbWtKTtKTygouOHIaIKpdGxAvol7dG%2BD7lABi5EM%2FhMV8VUhLP9B%2FQjDPnnSAMyrq1XY3%2BnwPcim9sG%2BwY1jo2m61auXSU4wDvTi7cnBvbO5szVYWRTSmjyU1CynGqeBdJTyZe0K9aIQfnKrJoo17SNSotdTzB%2FyYnEmcGkWeWb%2BNNo%2F6J6w7PN9WB%2FlkodeZ9DM7Dq3WyD503wNLbyx12KIO1QDoLxMklt%2FeGDTtdXKvCzKwbnon3QrmmDBAkTt%2BM6Rq%2FxpudmhCTAMeSYZGXbAxcQebh%2BxYKo%2Bb3ze636lGoEvkUb4izzJ1d433Q2o1xwcb5qHHETlXEUKPvTlc%2BDrpDKqYCSIKECBlEWNjW5sCoFMDCcvfnNBjqkARNGsd6kMod%2BwVQtpQXuxQ%2BswUrjAsq4Ce42%2FXWgDifUvARIAFkAOzO32OwRHzTobilWQWy9IqRuNC4p%2BiSFo6kk0v36di6YxOrELiboOr6E7Mx7IK9lXw%2Bb1ThxJmy3Ge%2B66Sn8L1HO0M2Cz1P31hVBCeY5CUo6cVLY56%2BkGu2sEsLOVP0T2%2Fl%2F2APLauY7x31ce9UdEUczkOJAmi73ER2ZOTmZ&X-Amz-Signature=b878b04f360f059d0b0df70103fd3dc734887731e4946d0ac8f696a3b8be078e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635JWILLG%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEhPU5udYNPhN8BMICS%2Fen0BeYPgpIJMmYyl%2BjyoXZ8JAiEAjxBfaY0PWggDqfDrbicavY2yFyod1YXuqFLqaugp6MMq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDKl7N0bdE3LX1CKVSSrcA%2FYZFNO34ClyLMVM02r4pKcSK5%2B0MrT28z9ChxMgcKdInWyITnWgTbTq15Y0edq36bSnXA%2B9rwPBss7i6QNZ6Y1lQ7O4zJ9CpEWoINmAB2mtY56aPycgB6k68ZbCcDexKSv%2Bumll5U3FT0B3LL2SV0aksIKboyRWF6ONsWSAMmB1kuVkv6w%2BKYlygJKadIfC30aczr0LlFc%2FD%2FV2vIItuGc5zhP4kPAR8a9roh7SBg0tEKyCHQGPe6DxzYvaztB92RRiDqeplKedYPC3tJNZayU%2B6c09Ub743CDMHyt4liPDp2n6qtuMnVeXp0bOXHoJ8iej2WK%2F%2F%2F3k5zkD5kU2wBrQOYIF35%2BiQy2NASAbXluk7z6u5aTc9yNQxAZoI8VdiJ4SIc1DstuRAJUgj8XxUP9I689ik2GFr0VkujRlCmMUblAGqNBDVuKFGo%2BvHG%2BKFEcxUohDCC%2FdP1e8lIK56qAppfS7n6BeQoj5fqyCiUe1WMumfjvOuX7Nu9vpnUe%2FOlIG4qHnamhC7c6f68l5ajUBwz%2F3c9qV3ICr8PotqpobKA8%2FVjRd7Ny6Hoj65LVgkZA5G9jTvxT5HISuds8uIAvumm50wgZhYhil9ewCh0VMKhm0%2FqZarb1jU%2FppMM%2B9%2Bc0GOqUBtpoIKCD0iBJUW7hWNKz4zzxyrR02lFBbK1futmMjIwxf0y%2BQzdldjw5eBVrqK5eRCmL8qP63xCDQzqjlCP42XkX7gkm0wBXPqDv7Taa8TyodgYo%2FO8TAxJzi683nsrIGM40Pn4E7Oey1QgWNxVdQBthN4PQMWiToOL6gNkb3U5OgT8tDks92Ua264I9Ja4Di3yyso0LLzjiG2GAiAHQkDgWsq7D%2F&X-Amz-Signature=be47e195fd9a39c2c28ddea4048169441d94ac8dfd912aff344135bfdf3e0265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROTOCKHK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoaGdEU%2FrsqUGPDGagwOcNmvugD4wAUZRXwtMZERZlEwIgIy43Jfs5p4%2FpqQJASXo0SrupphGrNUAq11ljeL4TjvUq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDK0X4Y%2FbR7NBOZthXSrcA6Er9pDmetB51I1c3vkSZCDdkUfzfxbJr9IWu1DNqtyuaW1MlSVHLxQ26vh3XNnKzAtAVfIDN1L%2Bgta4nW5NMEoGz50CFsgXXHAK%2Bhrr0wGZxXVdMJwV5Nwh10ZJocX65ca2XqbBPKVtWjH6okOEmzOGH2sInlP7hFlXhIyKkam56wzCwr%2B%2FlpnFGEHx0W3l7%2FVFYX3I6Yotji46JUhH39Qb6tUDykJV0uzu%2FIE4UlVs1%2Fb%2FMJuZKO%2FvCx3zX%2BBUjKy3QAp13sg7VGUC2I5ameuHQc9XJJjhstDZyrbIgNP3IMEN1Ml9iOmU4LZQPFisUcJktgf77BfZnokc4zydoYA95ve%2Bj1XC5%2FOn9pA32rQtgyNQ8ocNeZ%2BL4E47YAJMCRJYMGicG68U%2B7nh0dMOJFdFEJwYl1SMYAZiT9HrM4bbp%2Fbf9EPvBJX%2BJhz7KMRApBivdjJAoncvo1jVQmrh0MUT7ujv9ji7vOHrvvkYXzKdXFUAquRSOH2xwbU6MYxF11VAC7VH9h3yEuJW5a5zkyMRKzxyv4T3NYrHiQ8ZbE1d%2Fp0Mve6O5NeWqCy%2FLq9xM6MxO8yYW7HotHfF%2BVPHHCPEc%2BATPUSQXh%2BDL1hU843bL7XruqbJMwaPxIH6MPO8%2Bc0GOqUBCK%2Bq%2Bfz6w0m4ai%2BAI8YKBbRzIuKq3bTeK%2FCCeYPpkcT3UQzIAnXvzvGwCLlRSyRXPHjthJMIuwy5Wv9LGW9ZAnlKbuaaiBljQ1aDpJmtKYL%2B3aT%2F4j0dOA0KbRU1fOJqjBUKMJzaZeJbHSntjtIcV5VUHOsG5tY0JxHikJsRwYxePQK%2FxmcYSI1WaxmG2xbkhyDeQS%2FmSBxydrXGqUtqRqlltSf5&X-Amz-Signature=6bc7b6c19b812e4a86c6e42f73b7dad8651d4d1e6a77a19f6557609afd7d8b1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRHFUGVV%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG1mOHvgMAEhj03lbp7VCu5qybH0ltAUUIj0MeDXYDtkAiEAz%2FwWbf1kvbGKL%2B1fKRWDULFfV8PyI6Ki%2BJk7Pv4nloQq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDMmDBjF8YPSw7olSlircA3Nz1xmxU6%2FfAdJKR2uvcpRa4y0NdtI62DJmBs1eZgHWiJpQD2%2F%2F9tZCCm7k%2BdFJ2O2h%2F8itj8J4%2BwmyRa4Xm4FoazXWdCG11XjSoXWHu1UhOfeYN1N6296tWqsUa01kDcqcaSjD9qIQnzM6Q9n8YIRiEQJqH%2B0tBkEjXgij%2BZO%2Fiq5OHgf8ja4rqz3n%2F2KIdQFKOkUhloF8ZsytQVaARCa0%2BTW5DEdfA77khAgDKaJ42GDWKIS7wtD21UB9EK8wVi9L%2BRusQB2W1CfabCAuDaHRw99rx7XxjV3A9NV5cBW5s%2BBExJc2yMXaT7SVrXL2DebaYjo%2FUdN9sYa4m1niEGSlYSnScTCb4peU6Cg2bKOHdtQ4%2B%2BCidZELoxU9MtYAx8bganuPpPirzmBvdo4krPCKHYMXtK3IL3sV3Vy2gyRkyH9DE0O8eSD0U3fdD%2B3V7Qw60HuRK45lRQ%2F1xgwOeUpPMzwicdlg9Kkl1%2BumvlBKLMxL63cPSDaeOZLLwCUPs6FnPhwHGob47SH7WMz3wZdCpwbsJloziI4YeZnV9BK6vNXJRJsxvFMGaiTxOqejGyGtIGlhm63YbJBEvM%2Fa1NsFdDGncxGCrQ6%2FgfXB2zWTZ9YO4mjsu3qzeUIgML29%2Bc0GOqUB%2Bl2b0yyBE2arZfKxzzoCzapM4A92Apgh62AOkg6Z7DLAfS%2FVtTSjFJ7%2FixwszkvCTDPoEGZlSXOkqeiVfBnYaD%2FP7XFfL4EwWBZ3KgmAQvRbSlXa64YICeTU0vYrCfglrmGBbp5X1rvsUxCEAbBs340i7W1BGBOCIN1euHG5POs27txCJsxQcMu8pt3Hx6WmebVTAmB6kdHyIUCkiWj9vBBI6QPH&X-Amz-Signature=029e3f535b9da996d0670d98aacf08beed202c6ec10d11d98bdfde1676c4a94e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USDGSWVH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICuUJQ8%2BsBMuOscHjcxHoq5HKkyR9he9Z2EcwjqB05d0AiB28zEx%2BAOQWteYvRuWE1KsxxGbLMAzAMsN8cVWG%2FwTKir%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMKrFZz%2FSryItyTWR6KtwD8L6%2FbJQ0mcsqBZ%2Fd4STwkOE4tjoyFGlD0Xu97w8PZiYBiXmkKrVDQT9LwT6lWS1u9KX2Me9KOS6UuL9j4Pqh8J9EfYs9%2B7dRHwTfIH2c%2BZHTrSfQLwJNdN8fikk3McBziYnYSuvXceeDHRCBjHUNheiZPLL9WRMg99bKIuD%2Bup8oUVE9Qa36ZjghNtIYt1nTTw4oxXGdpnPW8M%2BDgGgoYTicUHArgY7%2B86WYffPNpyPIi01%2Bu6aP3MQvi%2F1VoY%2BplSqds3t9NB8MIkBBIVVEqzjlSl1SWYvyEQz%2BzXeDSn7oHmX5LEQr9zFxcWrPywWotO0o0IiYLuoe6r73LnUgbVSb2tDZngWAk4s1LVlsZbaUiOhfXFAFB4AfQQPP%2BdpFupimfdazSP5My5mYZlmULof5pab%2BZL0aIQWsiLOZkQxWnbLAlALkrO8EMT6siSpKU9Rg6J1wxiifVPgT4b9ZLW16h3bWRsW0KtfRdGJOtF93Q6XJ3bfcJzi9HVo4bMUsi8AFTJKN98kRlTKY4vtEhPMVMp2WfFVOalc2yRc6LNCvmaVSiuKv5TkXXPBExJWtliGt8Z3M47ZguULm8Hxw2V0L9OPRDajNAdQxWCHgmIe%2FjeMadNIn%2BzuEVs0wxr35zQY6pgFfJ7Rt1INI7SWYE8SNyihCd75Zg2AokqFwt%2FzF6VnCvHX94ixHUbhG6ygQkpLXdQoX9cynBC5AuNUhEGHvgGLu3IuWipaCacP5xiw6UJIGptePAcEdI24TGcRSVcTJ4VPuGsX3%2FQyqaQYgqLaV%2FJVF9MFWJMNDYg13Xr4JRkOdce6YiDETz8OheZRuYNehKmh1ihhpo46nEB9F5StegWwK2sgdwzaR&X-Amz-Signature=53bcc1b372ee71d8cdc4499fe3d67e65599f69534339a5322b45135981b6a3c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USDGSWVH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICuUJQ8%2BsBMuOscHjcxHoq5HKkyR9he9Z2EcwjqB05d0AiB28zEx%2BAOQWteYvRuWE1KsxxGbLMAzAMsN8cVWG%2FwTKir%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMKrFZz%2FSryItyTWR6KtwD8L6%2FbJQ0mcsqBZ%2Fd4STwkOE4tjoyFGlD0Xu97w8PZiYBiXmkKrVDQT9LwT6lWS1u9KX2Me9KOS6UuL9j4Pqh8J9EfYs9%2B7dRHwTfIH2c%2BZHTrSfQLwJNdN8fikk3McBziYnYSuvXceeDHRCBjHUNheiZPLL9WRMg99bKIuD%2Bup8oUVE9Qa36ZjghNtIYt1nTTw4oxXGdpnPW8M%2BDgGgoYTicUHArgY7%2B86WYffPNpyPIi01%2Bu6aP3MQvi%2F1VoY%2BplSqds3t9NB8MIkBBIVVEqzjlSl1SWYvyEQz%2BzXeDSn7oHmX5LEQr9zFxcWrPywWotO0o0IiYLuoe6r73LnUgbVSb2tDZngWAk4s1LVlsZbaUiOhfXFAFB4AfQQPP%2BdpFupimfdazSP5My5mYZlmULof5pab%2BZL0aIQWsiLOZkQxWnbLAlALkrO8EMT6siSpKU9Rg6J1wxiifVPgT4b9ZLW16h3bWRsW0KtfRdGJOtF93Q6XJ3bfcJzi9HVo4bMUsi8AFTJKN98kRlTKY4vtEhPMVMp2WfFVOalc2yRc6LNCvmaVSiuKv5TkXXPBExJWtliGt8Z3M47ZguULm8Hxw2V0L9OPRDajNAdQxWCHgmIe%2FjeMadNIn%2BzuEVs0wxr35zQY6pgFfJ7Rt1INI7SWYE8SNyihCd75Zg2AokqFwt%2FzF6VnCvHX94ixHUbhG6ygQkpLXdQoX9cynBC5AuNUhEGHvgGLu3IuWipaCacP5xiw6UJIGptePAcEdI24TGcRSVcTJ4VPuGsX3%2FQyqaQYgqLaV%2FJVF9MFWJMNDYg13Xr4JRkOdce6YiDETz8OheZRuYNehKmh1ihhpo46nEB9F5StegWwK2sgdwzaR&X-Amz-Signature=26b3f28b7122d4a72bc87434ade5d3bfa74d7b021e905f37837249f2e503804b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWE6L5XU%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEC4KYrmvEqVE4HHj3EsgAiGa0349OgIMWYQDSW9SHfyAiEAxDcobQv4%2FpPRLDrVtDqMT00KupTfNc3KsSj0frPwE1Yq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDN71wQ2gGZNQvbJe4yrcAw7m1ujwIfPn40uMkUCMxHy3iQqEoMOOdgbRdKwUJQUmfg3SF9oblOJNoYz%2FprT4yXofW3pXahfr4qXWSlA%2B59CIhIpbAa%2B53lVVcfqc4NDBCcOJIxpRHelN%2FQ0PX7g4nnKKA%2B5JwhfQnMvIGiLpVj%2BdTNyC5tgQoCL1im9UhDPhO1CBL1mBi7a4tTTGIntwL0G6UxCqox71Ap%2BHVx42bdgRWzbpV03a0lfUXUQrpuaANIXOv2SiswqdpOcuc1o%2BaZAcpeeIASx425If4BSpz3icZ3TO%2BCYAAYF7A7tn1X6mhwUFItmChpkPHwyjidF45ADPXHvQT9oFllQ50vRcl7h%2BoCLmp6PIsUhSGsPe%2BLdjNL%2F%2FKwszgZYqzB1NIh7K3RL%2Bw9tNQwsLnaRX7ztMMhPB%2Fu6eOfd85rDv59hE9Wx3VS%2BFmq%2B%2Ful5ZQt1H3fk4ERW4pAbtZwr3xtys%2BwHmB0mLxzbItOVCBKOwaLstcpXc8OdVx1mWa1pP1BKiSOfq%2B62j%2FRquZxzSyw0c9%2FxNKeMlpEjD4jThqAgdEwqCcOvf1HjJSMKUapSuRafGZ%2FIf1LAGFRtEKA8p5xjq8zKraSeff88AFD2bA4YNZ05H4r1owwLZYnnSA369o4mCMOO9%2Bc0GOqUBhoJv%2BhvqZ7TKQKi7xkvMrIV5btsJEqugUUwQBmXMkmN7FfabNNFIz6mBVFdd9ktFVOaXvrFscrXBIlQYiFLEhcpUIZWWCTvmPJ%2Baucr5aDCRSFliCIjFNS1%2BvFqVKx4qleTuo2OW3O3Essl%2FpwivaNcm7IX1LHYX168yisL4eu2wPmZV8Et3Gwtt9djm81zk1J8Fdx3RPsH7wVId%2FketpOxE1LAE&X-Amz-Signature=1d4ee49f2003b21a27871810b32accf7753c44009625f1adc88200db19921353&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6DUMNIJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGY%2F%2Fpoovt9FVzPLveO8UHr4JOL65KedVR9mnJHs1n9AAiAppKAaRBuDpU%2BgEKPQEx8OsDo5wOBV%2Bwv6ZX4Op8w6Kyr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMMSjQh0xk7suMeVB3KtwD%2FrmfVVFwMNQzSuuDIJ2am7E3MI0e%2Bv%2FxIrwnbXMD4fGT9I5BT7CgqIjk8ZARRBrYe9lY%2FA%2BOQOGhS8zCMXjMvE40YkWNYqJEK%2BsleLnD0Mj8KlWLxW63FxDn5IiHYVnLajWVPY0GfGbh7AB2SlZqWsX6zI9zezmZdN3e0hH2tjqW%2BHSbwuT3AtqZhANIDyQi5TqhZ8%2F3UXo%2Fp8%2FK7UhjvXzIlVa8vmZ5yuW97K%2FAYYUeceYrbcbGunEAVykVBR5llEdkx3aKLZ%2B2VQLLKuFEdn7WAI1lE88EgbcT22p7NqNYp6jQ6npAq2TPiVhCnYVsKRJnFQo5yGSvVmxdjnoC%2FQ2JrNE1eP3Ef%2BSVFCGqHmVI7%2FZrLQzwonU9QqGKBDM62oAy%2BFuBY9I8yaGROoyNb6tBTzJPQJetnMgfNsQK%2BzGS16cd1Tpo3wju62I7p5yKICiFoSZ0D67xPvI6M4FwVktV8Fam4UR%2FVOA6jvr7ytH37c%2BzwHTvjGCs2eHq0p3Eds8GJUmnDcKlBu%2F7NuBALcDwiwh5HNJAhML4XrLKX%2FHI60y7uAJ2%2BKpb9Rf9TsALufQ8cxJnPhG2qWks58xpofVrkQvhhfjb5wsPIgwDUVSsYinck4fxamWoVFow3735zQY6pgH2iafR9NJNbfL7Qa%2B4nhY0wsvb%2BYb9ksqLhgDq3SG9cbbO1W9d83%2B2JRGRwuvF0sHpPHPpG5aREMBpyWw9ksF5%2BULhMMit9rxjI8pcJV9ToNpwVljlF1%2FEbqxNE%2BVhGqQrLuZh06HefJlvRuXjBckdpOn9VRJxZ8b4zjj1NG%2FlvZeys9dnoE06eD3pdFaBEcx%2FK4%2BharVGDn%2FD6rMJ4rx0WaiVsSYY&X-Amz-Signature=903252db1da5b45e175392aa9dd45e00ccddaf94efc805727702d35bcb18d6f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6DUMNIJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGY%2F%2Fpoovt9FVzPLveO8UHr4JOL65KedVR9mnJHs1n9AAiAppKAaRBuDpU%2BgEKPQEx8OsDo5wOBV%2Bwv6ZX4Op8w6Kyr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMMSjQh0xk7suMeVB3KtwD%2FrmfVVFwMNQzSuuDIJ2am7E3MI0e%2Bv%2FxIrwnbXMD4fGT9I5BT7CgqIjk8ZARRBrYe9lY%2FA%2BOQOGhS8zCMXjMvE40YkWNYqJEK%2BsleLnD0Mj8KlWLxW63FxDn5IiHYVnLajWVPY0GfGbh7AB2SlZqWsX6zI9zezmZdN3e0hH2tjqW%2BHSbwuT3AtqZhANIDyQi5TqhZ8%2F3UXo%2Fp8%2FK7UhjvXzIlVa8vmZ5yuW97K%2FAYYUeceYrbcbGunEAVykVBR5llEdkx3aKLZ%2B2VQLLKuFEdn7WAI1lE88EgbcT22p7NqNYp6jQ6npAq2TPiVhCnYVsKRJnFQo5yGSvVmxdjnoC%2FQ2JrNE1eP3Ef%2BSVFCGqHmVI7%2FZrLQzwonU9QqGKBDM62oAy%2BFuBY9I8yaGROoyNb6tBTzJPQJetnMgfNsQK%2BzGS16cd1Tpo3wju62I7p5yKICiFoSZ0D67xPvI6M4FwVktV8Fam4UR%2FVOA6jvr7ytH37c%2BzwHTvjGCs2eHq0p3Eds8GJUmnDcKlBu%2F7NuBALcDwiwh5HNJAhML4XrLKX%2FHI60y7uAJ2%2BKpb9Rf9TsALufQ8cxJnPhG2qWks58xpofVrkQvhhfjb5wsPIgwDUVSsYinck4fxamWoVFow3735zQY6pgH2iafR9NJNbfL7Qa%2B4nhY0wsvb%2BYb9ksqLhgDq3SG9cbbO1W9d83%2B2JRGRwuvF0sHpPHPpG5aREMBpyWw9ksF5%2BULhMMit9rxjI8pcJV9ToNpwVljlF1%2FEbqxNE%2BVhGqQrLuZh06HefJlvRuXjBckdpOn9VRJxZ8b4zjj1NG%2FlvZeys9dnoE06eD3pdFaBEcx%2FK4%2BharVGDn%2FD6rMJ4rx0WaiVsSYY&X-Amz-Signature=903252db1da5b45e175392aa9dd45e00ccddaf94efc805727702d35bcb18d6f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXE6RBM4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T091855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAZUlrkXE03iF8GwClHLPNgkR5V2lj68V2LzFQyeGmPeAiEAgkzD2FrvxPjcuS8G7hBWqpUiSmvb6b92HbqY20zuVJ0q%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDKsiscdP6oUvRc4%2FbyrcA3mNPe7K2mAFFRuW4xoqMifQgQeRUp1TRJCjx6jrAcyqZGmKgtQRn50MUqyIQk78QShEP0jwhX%2Bkmv%2FGQpon93vGIkH5zWYCDaA85E9E8FakLC4h9WoIHfnB%2FCGNJIKuVKgm4zi90M9F3dVEz1q8UcModj4lvtNb5Q6IOjlMw9iji4pL0dXL5uT09snpfxb50%2FqmDizRELqHkqlEOq4tW4sRf8VwMRCf%2F1UuLv%2BO45irwBq%2Bj%2BIQVgn7WJgv9H58vdBiwyLOzZEr57ER9hJ5XayoWm8tWSR6bXVRNii2UgUSp%2FIT4tfPH8xoYg35LNkL9f42gGGiZcH3COx9p9tvpc9E5HK0rz5uQh1uXaoOR1a8VIiVjkTOp7kSobkXnxPQiVgXW48RW%2BU3HhQAEjt%2BgxSvHZF3KAKqsK56qrBcocAyPc4olBP%2FtAd9XrEVuH41JGMK8QxYl8tfTYzKzrNvic7IF5Cix9J22xYWiSfKZIq3qku9%2FlrTquY0WuNOKuXi1ZiWla5LK34TOIFckwQAvMssmiZaOSg9WGtKOM5aEQWJhZMCf9aw42DJZhduZID0k4cvBkXFO3YoALVJEJUnzAYys0hHbSTmCPvknjKzLN0S%2FwoTbbbYFF1U0aNoMJ2%2B%2Bc0GOqUBusK7eVM6Ohy5ojJCoUy2QatOpjd4BRCe85tZtr1Hq3dqA6s9v0p1AKRm9CDnRTxrVhdHp%2Fa9ojhA0PxfJGYorcvEudj9oQ2mS8Hd3ANzwE%2Ba7CJDHhCJiKbIdRGmZnZzMaN%2Fr3khM4U%2FoENJDlOHHzJcs1BdV3QlS0EvbwvpMWxpZXJlkRydMuDZpYtemGpiWta6a1OoQQYJLUJ3gU1cg3VarrPp&X-Amz-Signature=999adb003563f71c1d41fcf9068b871657831478961884686bfa1e7d2c640b68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

