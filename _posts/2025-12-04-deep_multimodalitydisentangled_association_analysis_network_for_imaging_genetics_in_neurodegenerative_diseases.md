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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652XO7OJH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYJlk7adhQTj3bOuCH0THgQR3pNUhdubGRlDUItL4BCAIgEt5Sjc%2FM2RMk6BMfAjFQHI36VzUZMbFiLpRsTFTY1CIqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCjsDzY0najU2fe9zSrcA1Tp98CeUgiaIanVEBGftQdfko68ugcyyh2O6uvIrdib%2B48c%2BT8Oa%2FfBl38InncvZzCV7uOzBg8XKNyjxldf1Q8bwBXXZa%2Fm4pa3EYkIHvXQr0%2FonxrMMcisD3dCt895DSzE6berSd86hGlrYNXTXoMjYcdGPvsfBgPtEShVwAcikB9R4QG6dvAwNNxnSHwWwPYp5dFaWyACchhHsTwxt6HBFLsEAEmKQYhbwoyjyQ5OBrHbcXchRrZEkCA2JZluBsFES24lMccDL3jEye8T6tLXZ7E3q22GAj2ZCmK4%2FmwUj2WKY9HdkyX685JmQ4FZ9jXxyWbMDls2vMThtgBaX1happWan1x3%2BeNdYy6RIt18YTVsFkTL%2BuACY6vbBH4We3EUjh2B6SnZeydYEPzui82OqWxd9HqRsqPwmnarrCWTJgz%2FgWDd%2BMuGXB2hoyr9qJgg0%2FeSNbdHFjEuH5Z3V8NNynmjp0xYZf44WLkZg9A49MRWDyCM3A2ijSvKCc0X7vhZbCSUnLbqyjvJnuhguCfv3AijFr%2Fk00kVkAvwV5308C0SiH%2F%2F72XrXSEFYl%2FS%2FTQlUOBzqyottn6s9y4LtxHZksD4nh7whOX0s%2BkLzT6jPTv6pOdMoYVIOwYrMLiuxc4GOqUBfHBznMGMTe67BgVSm%2FKXB3fV%2FClQ9JL2ZM%2BAbkxt8t9UL8ychOfYtu7F539MyxYnvd1szQDMVfTIi12CbuZJGS6Ag2HLECKBYOfPyA8DZMW%2BQm2oEHI%2B9opg1QddPxvnjEZML2U7zaWzChOzK57vR%2FCOmbeu%2FaMPlNYGN384yeghvBbqDkYQfMpOJTgDUYgLYEH8w7Nq5Uk57DG5kVNUxwRG6tJX&X-Amz-Signature=ecac78a4abb64cd0c1717052aa19dd0e158f38b7af4b33dc0ef455b919c4405c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652XO7OJH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYJlk7adhQTj3bOuCH0THgQR3pNUhdubGRlDUItL4BCAIgEt5Sjc%2FM2RMk6BMfAjFQHI36VzUZMbFiLpRsTFTY1CIqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCjsDzY0najU2fe9zSrcA1Tp98CeUgiaIanVEBGftQdfko68ugcyyh2O6uvIrdib%2B48c%2BT8Oa%2FfBl38InncvZzCV7uOzBg8XKNyjxldf1Q8bwBXXZa%2Fm4pa3EYkIHvXQr0%2FonxrMMcisD3dCt895DSzE6berSd86hGlrYNXTXoMjYcdGPvsfBgPtEShVwAcikB9R4QG6dvAwNNxnSHwWwPYp5dFaWyACchhHsTwxt6HBFLsEAEmKQYhbwoyjyQ5OBrHbcXchRrZEkCA2JZluBsFES24lMccDL3jEye8T6tLXZ7E3q22GAj2ZCmK4%2FmwUj2WKY9HdkyX685JmQ4FZ9jXxyWbMDls2vMThtgBaX1happWan1x3%2BeNdYy6RIt18YTVsFkTL%2BuACY6vbBH4We3EUjh2B6SnZeydYEPzui82OqWxd9HqRsqPwmnarrCWTJgz%2FgWDd%2BMuGXB2hoyr9qJgg0%2FeSNbdHFjEuH5Z3V8NNynmjp0xYZf44WLkZg9A49MRWDyCM3A2ijSvKCc0X7vhZbCSUnLbqyjvJnuhguCfv3AijFr%2Fk00kVkAvwV5308C0SiH%2F%2F72XrXSEFYl%2FS%2FTQlUOBzqyottn6s9y4LtxHZksD4nh7whOX0s%2BkLzT6jPTv6pOdMoYVIOwYrMLiuxc4GOqUBfHBznMGMTe67BgVSm%2FKXB3fV%2FClQ9JL2ZM%2BAbkxt8t9UL8ychOfYtu7F539MyxYnvd1szQDMVfTIi12CbuZJGS6Ag2HLECKBYOfPyA8DZMW%2BQm2oEHI%2B9opg1QddPxvnjEZML2U7zaWzChOzK57vR%2FCOmbeu%2FaMPlNYGN384yeghvBbqDkYQfMpOJTgDUYgLYEH8w7Nq5Uk57DG5kVNUxwRG6tJX&X-Amz-Signature=ecac78a4abb64cd0c1717052aa19dd0e158f38b7af4b33dc0ef455b919c4405c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HDP3V6X%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHyMIGzmDiFv6dum5Zs6rMD12u1u0tgF3Xr2w3jh43NIAiAfY79HQuquKEfokRmWG1ZWhtsyl6FBoGAonxXo2ezy1iqIBAik%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjYHduGKqoBbWFty6KtwDwiIZa%2BWWxb2wJzcCwSOHYmr4qENFp3p9XTIUkUFRYyTR%2BopAAV8GBcIqetEDVXj9nI2F1c%2BkZOW0Hcwy4SqFSN1zj5EYi5O0Zc4Sr7SKbPFfLm%2BrKBjLVdoZ7bAHZAnSPoWjeQ%2BsLOAGBXVtlb0Cd%2BiLFF3CeQpE8d6N%2FMsu1hCSnRt0582T0aF%2BGxivmWzBZuBAlNCI3ksaBxOlpKLrNlu%2FF8S69HAkYPTVMiVgdZJ6Bhh0KSTD5urX1mYjy7iyu8ZSK30bKuFhlaMUD0kofjnEbbdwB2LHgXjBiufIlp3gCoL0Svtgf5pcD5MiquIsab6CGF4TUAdEVOdO34AGpDMuvkTNUcBD6auP1bPg3L0PQXnS7IUNOqminKVscAY%2BKGMVCcdbYFaisVMzZGkIuxnsE2Aa6j29mXqwBLAvgb3mif%2BsGPMBPLgp4olFkKQPHuMBcbwPzvs5XrU%2Fht6teSrSzW4tZda7a%2FGJHTqzQwJ42JgOFrDwwzsrhXQYYzGeQZ3bcAwk0JfT2U6gLtiUClO3dAtiAJibH1hR2r6huURHzWjUCDEmBfQyPtqLyy0bg0625s0ZbdmPeCRXXWNqYo9IZOpfBxk2gr%2BamC9rMwTh%2FpkpFCxZjWEIxfcwgrDFzgY6pgHdNdyl4W9JHTsNvu7IA28v1lu8DL7t1ded0ME8zlOdmkpzeZKSlicEWmpXpKPLE%2BKbWUcTbxhRaWESNBH2HCu7iB%2FNbpQ%2BKm1qqlEYw2AV6fgDKBXzMdNGwpqRD7C2mWI0yYhAYe%2BkfgTCXsoM9CEYUcUGez0o%2BDB8tXCUKk1hlZb03H7ZUYzBsP5u1RnRtur%2B44oSBBvAFbmTGI4%2ByazEHFxjAgFm&X-Amz-Signature=eab0d43e5bc97ea585dc9a0e8066ef6a2eee75380e37ffffaa7337a2251328e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QO6PISS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgOF4pUIxok%2Ft2LxcrCrpJPtQ08YwsR6T1mMydluJRBwIgZu5JIJA0fXQXvNLXsOEn4cfnxSBYcvKKSarXiHfkJFYqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDf5Ij3tLXWdjlER7ircAyxxZ%2BO0eyPLBwadl1j02MncNGB%2F%2BETVf1sSt8OuqBT84tDjwODiIXhLE6q%2FAhR1Rmn5cqlMidk%2BPK%2BQWxgshNruHa5dKU6Sae1ktPY1tOVDuLafyR1gXza85gH6cX53GTUfnp%2FC4eGJLeCiYqbKi%2Bc64pFI8OvTHE9ATMyhLm%2FoKCxZzp%2BsunCWAvvt67%2FNbRLof8dYj6x%2BKVyOvd4%2FjyMIhSFaTazlM7q7YbRC4kEKKpzZb2bM1lNLhWfFkSPNCElLs0%2Bhjv%2F4%2FeQ8v5byettE76l1kz1tPtzlnqf1pgVvy%2FyNKUJiJOHIxXySFHnC6yzR2gF1wCUJgz%2FBclbsKnTNkUD242HJKKNTUQfbaY38ya8WRHUyAFzCxpo63bF5mPx7Oznx%2FlpQ2D24YWMjx6KQS4rCaYZ453JNkkJ9B6DdmGK9KW9ZxsLN8LZamyNvkmu1cR98d8%2BY2UBvg8p84%2BtZN6y%2Ft3jA0F1Awqf810CJN5%2B0vA10%2FGgB%2BTodLRJJTfqz%2F%2F%2B1wl%2B3V8HUQLFFu90K3QwPY6lucvyAP0nfGq6QVbBoxPHx%2B4nniT4dJM9bkDVAS5sGIyRfCwYl9s6NAt8i1E5rEBXweV7oaLkVIWmMKmZ6YYl%2FWlXncHfEMMawxc4GOqUBZ9DgeQZLbTjS4UIFUNf9snQO1ZS91VzWnoX9VC4%2FIpkr7S%2FFMXjrFe8A5I%2FHioAcns5kTUnN1dO3wyD63DCdOXuk1O2h0hGbGZNuPpftZhSGYP0S2C2DtW9XXR6pGLiMPPrL485BpjGDay62sOfh%2Bxyp8kR0CxXsUB%2BoUGipm7W6eyudTIZzyaOfgl4rC4PoeYMvh2%2BfTmcLg17OWzKzqB%2F2Zcm9&X-Amz-Signature=eaa119553b43a8af50993d5992da43d62996bfc4bc6c27ff00ac241b16cb6e14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QO6PISS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgOF4pUIxok%2Ft2LxcrCrpJPtQ08YwsR6T1mMydluJRBwIgZu5JIJA0fXQXvNLXsOEn4cfnxSBYcvKKSarXiHfkJFYqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDf5Ij3tLXWdjlER7ircAyxxZ%2BO0eyPLBwadl1j02MncNGB%2F%2BETVf1sSt8OuqBT84tDjwODiIXhLE6q%2FAhR1Rmn5cqlMidk%2BPK%2BQWxgshNruHa5dKU6Sae1ktPY1tOVDuLafyR1gXza85gH6cX53GTUfnp%2FC4eGJLeCiYqbKi%2Bc64pFI8OvTHE9ATMyhLm%2FoKCxZzp%2BsunCWAvvt67%2FNbRLof8dYj6x%2BKVyOvd4%2FjyMIhSFaTazlM7q7YbRC4kEKKpzZb2bM1lNLhWfFkSPNCElLs0%2Bhjv%2F4%2FeQ8v5byettE76l1kz1tPtzlnqf1pgVvy%2FyNKUJiJOHIxXySFHnC6yzR2gF1wCUJgz%2FBclbsKnTNkUD242HJKKNTUQfbaY38ya8WRHUyAFzCxpo63bF5mPx7Oznx%2FlpQ2D24YWMjx6KQS4rCaYZ453JNkkJ9B6DdmGK9KW9ZxsLN8LZamyNvkmu1cR98d8%2BY2UBvg8p84%2BtZN6y%2Ft3jA0F1Awqf810CJN5%2B0vA10%2FGgB%2BTodLRJJTfqz%2F%2F%2B1wl%2B3V8HUQLFFu90K3QwPY6lucvyAP0nfGq6QVbBoxPHx%2B4nniT4dJM9bkDVAS5sGIyRfCwYl9s6NAt8i1E5rEBXweV7oaLkVIWmMKmZ6YYl%2FWlXncHfEMMawxc4GOqUBZ9DgeQZLbTjS4UIFUNf9snQO1ZS91VzWnoX9VC4%2FIpkr7S%2FFMXjrFe8A5I%2FHioAcns5kTUnN1dO3wyD63DCdOXuk1O2h0hGbGZNuPpftZhSGYP0S2C2DtW9XXR6pGLiMPPrL485BpjGDay62sOfh%2Bxyp8kR0CxXsUB%2BoUGipm7W6eyudTIZzyaOfgl4rC4PoeYMvh2%2BfTmcLg17OWzKzqB%2F2Zcm9&X-Amz-Signature=316260c8a1912c9df973e9eb8f32374f4bbda82772baa7385be0b8c93d24fead&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT4UFXXE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWEdNIHcWtEe0PfgtuA4fefnY7SqA9J%2FAfB4YH%2B7FaBwIhAI4fr7wpKyo2Z4MP8dIdF1Okt4o1VP1M%2Ff3u2wGskIRdKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx51FUoU3YxxjNgsSMq3AMoAmEIp7CSG%2BWvgp9gaERuKWV8FhyW%2BydWE91NboTRs9esPAIeua1GBOhsq5a7Hd53WwrPBjUDiWKvqQ4PVotqoF0Q2ecT40Au2BIIlBKAkIPxP6kbAjJ67ozD0aV0aDz94bWgMCSPb%2BKOrcBkLzgkyFM5SYQPqvF%2Fexb8%2FSUvJsM9klalFebIa2RZp74MQJAcq6JJfQFHkQ008IcfY03wDxKY5OCLobBYiDjpFIf4A0lDD0orLWQs3RLGqXHdvWMF1lqTMu%2BzishxslNqCSRy2ElGjVM75%2BgvRfNwLAa0f7IVmo%2BxNqH5xOXIHrHU9p91XC75VbWzR%2FADht%2BItfGyAPK4J6lE%2FLDOBBFmj1vak9eAVDRGpnwXwnc%2Ba1o8JnhHHK3yPjqKY35xj9ClkSZWRh4o3lXzGQQMB72qlrGVbtvR5ZIx5jXOnQw%2BUlEYDEddeXpYaZLSRLlp5e1VjXAEkU6VsSQKu4lB71FXIYBGhoiEyWgHdQeJHWKxhh4uZ5D5lFGPmNk9dRkBoweUfradhpQ%2BjSDeGJMp68jbJjcO2UzR%2FiOxXe3EcvPJPPQ5K76CF%2FFZX%2FWZApm5UTgGuHK8qd5RTKWbpW3NSkVTxhHDtFuW9506ad3NuZUmETCmrsXOBjqkAZ5ePKdZk%2FTwCAdelMgWy71JQT9JgMtZvyzh%2FUPmmwvV9rYD2VYvleZ4J%2FEC14x%2ByFrBucdYaQ5%2B2wlGa7BmTcAaNJ%2FiNMlFzsHI7BjbY2uii9pxpToWU6TS%2B3qHhuFGPqXGKlVWGzYOyB%2BiEHtP%2FVRhxYJNhgyd0CPP8darUj3JUHWeuDNnp%2BigIm0hYfcr%2FOZrIA3dEHqwYPyLLzJlpJSrKNix&X-Amz-Signature=87aed96ba5a38811eb8395533165b37f562d01bedbe0fbb71225b5c34343fc49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYY7736H%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFWm9QTNCduIT53Pm7THROCHo7ZyCkfrmkSOA8XthNQvAiBvn7vskOSWw3Zqv5kRHHM2sgJDT%2Fp6EYpZ4BYtdGBA3iqIBAik%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnusWt%2F1rHhQZuL1AKtwDwICPAppUE7RtU3QROQ%2Brb%2FUN09uzI32gTC66GF5s54IXvUcfd8NL8AczDJdB36WHxVn6VDJncJ2066w2GIHpzCSUt%2FS7WakDlYOrQj5ayJ2v7BwONWf4JKwh2ZgipJ3Zd7%2BNqRTrmqvvAQNpjf4BzYVLXN2SRqszQTwNQvWngd3Z%2Fh7aAI59YUlaIdAnk8ZDeYkY3EkTxYLt71d2VLWN2tU898DA9soKgWBCUbLE6aZ%2B7vcz87ZLG0kidN1zKlMrj5Pft1CIyo5%2FHMijkC0Qe7MtSgcF7AyK9yOFFE8dsswZRtwjRbg%2BXVj4xnD52hAu%2B3Rn7fwzNVoNqcDxaPfIMiZwlccLLBjXlUhmCOp2xjwDEyjqigR3W9Ya6JSO02pYzcHUeyva5IG6BPyIff%2B3Sv3QAcesZ1IK5jOU%2B3EGE8AUwOYi1QiDNLStv5cPCBldXLqhuVroNpMfX0csn8VCIxpBD9L%2FFBx1EenEPt73jDDZHdKw3YtFxo05pY%2BoqGFdIIiqz2MfuLIpfl82t%2BzV5dNibclKnaITVtVNCFdmSP2VaeHqiN0pqJUdf6Wt8sJpwPS0tAINpslNei3K9BSS4zrcm%2FYYUrxiZMmkfuYAXz1VZcufHXGFlWxmVUowyq7FzgY6pgHEUPznuty%2B9qBpP6QDp19RRZrUkDRiOa1TszUXgPHCFTk9ed0LENcV5n5kTMpU%2B3tmp6c0nvJuT%2FOAiOgrE8An78oUzneXk0jHPAxWO70pmdg3gvNMxXajtCikiLjKkdPt2R3yJjQQxDE2lWfLcLjETi0AqMStFF6QG9%2B2OoiAYaVqWk9hyqNMPVihKbBXSAXYgrp%2BPtshx1qOyQ%2F5btJpHRH6z%2Fhk&X-Amz-Signature=45c592469f6b3c31ae34ec208bce72dea06654643d94a288eba911ba18827792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTU7VYB4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6Ex5xHFSCgBgCLe93bgnJ1nfvKmJR%2BFAAJEzhwP2SEQIhALoZTsHDqwqvOs9bTVvOSgpEVa2lQXrWLmKJyKtmuOzCKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxYrTmLkAPMmSJpid0q3AOvFUBJ1O7NKVKGilzJ5UMnOfqvLM%2BSuh9bJ5VkuqKDTUURBj4xz5iPgMT64Gd9TE41HVdz7H5r60zcR%2BHJg0COj90taKzg0KRuKvPVCaezc%2B6hQKLjfS4PQKA%2Bt1XSMvWAboeWgtqES4tmZE5eH9hDxmwadiBNPIhAFKGV1LOs%2F7IX2XO61m4Huqn6p3xwX%2FBDWKTRscP0VjehyxZmu%2BE96CQMRPSY63gd4EO1N1QQzaGnfVSVjd4gFyHZwMzhj%2F8Px%2Bx6e45rRFOHN8oi9II3n99SQM6gyZihZPRCvUQ3ZiBDsP06UBYOo6mfKlUpK%2B%2B9TZRNpVBgkF5fFltCMl9zKjNrE3iDqiRjnDw0obwsn9BQ9aoxcZpgEaU6H86c%2FGb%2F4gD22poTr5PMN0LGxg1FchLcnZjbTfj8aQ%2B3prtwmUmWRpL9t4hjiblj7%2F%2Ftnkl1nvwEYCJUC9D0zw8QuhzQY%2BZmqKbZxuXgk0HdVxZmHJLIOqd%2Fh1AG7xZIpqJSTwx4TZCUQQMM%2FsIMO%2FeDIAaMYEuWMjBswp1Y3XSq3H79mO8%2FK23CdSVkCeixeLBoLJ7juhQ5hHcMzW%2FRAxmqGtU4sft3zGlMwkanLkksrYPvn6%2F9vb9pDfW5xWhSuzC7scXOBjqkAWrTAIrGC%2B6Eiy1cYi58rsFbdvkhgGqLtPHuLTK%2BpwYVoCHJuswKq%2FU2Jrx8fPwJRaryo%2FmEwJQfsEn9bG6wQQ2ID9UXOgLG6BojP4DichCM6out0AqzbTdaz%2BljwoU%2BCHjHySsdPmQffCX3c87oE0ZJIkQwMW2m6swX5NJhgrVUJkGVQ3x6opXPwxmWiCT7l6njNsVFhFsi7HT%2FpaKmveCk%2FX%2Bg&X-Amz-Signature=aa2f49e989df79599ec30e7ef5e858ba6a92016428600de1becb1efbc8daf63f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYDQTXXQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEfUs6UJJDaaNrBZE6RpR8O%2BbgF6ySPC9lyYEdHnK3s8AiEAtst36Du4ktZmgW7k1ERb%2BsZGYTO9rR%2BMC0KixBfHkRwqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDhDflWfHqPFSQ7ntCrcA8XbB%2BI2NHvYvFUn%2BC6YpuPk1Bb%2BSc2rvCJIKqNQJB%2B2L05MrYcUVsDp2Atw8kAhLzMKuV3RiP7dhIKCJTgSOt8WgwJgbFHT34bGGetDMupuysHqwGnToMZZghVZi8EWH2AXknsLZXKBzdCxNb9Q%2B6sl5upPDjMdg55JN5Vy%2FKVhA8j8IEjecraajyB4kGNP7cNoi%2FFz6u9u1skeSLQ%2BJJJFvVZBPF8IVI2qx8eH8MJLKVJ2MzMt1YhtAxD0efM8vAPguP0WBDmmDn1U%2FPNRNiEQA2XSFOoHzgvk5vnlXPd%2BY3UFR%2BeYsZtsz5AORf7VFxA44KReD%2BShjItFb68JahIxKDAB95qiRSR6gnDRIwkJGQ7l5%2BJs38dPzSkb7eHAhxUphr9B1wN%2BnLWwlIB5YMZwh%2FJsijVtRVvSAPZvdHepc28oyDjDy4SJpaedXAVOI49Uf9OOFxf0g%2BHje%2Bv%2FRitHQHxEo%2FrPPH8Mi7AWlpYyu1IJUu8rKWG6dqhd2oC%2B6lN7m%2BHYvgwRsu5zwa3QwM7uCcBFyf2SWu%2BXqMKeeWrgfThe4f8o0hLbE49pnRROr%2BK7p7CkAiwYnCFA82zqCS27MACQLqej2FJ4L8ILbT4aKzEklbMvS3pPHVEqMK%2Buxc4GOqUBZqLVYlzA%2BZME1BGBdWVrSFUqtNSHDEbKrEAJcuMVhW1nuPrOvx8wS3kvwiLiDRUjdbPG7iGqP7UuuAckd%2Br%2F10ADWIzuGiGKTZ7OHuDEj7bzbl8Zq4eeAg6qdCtt6HkaiR7OCnq6fz5vnA0Z1xWX3NghjWsjOXynAOvFBkQLYhi8uKJy%2BJ9ltNeKSKYE0yoFmvhLiJhBzAbp64YdmVBEusu28wtp&X-Amz-Signature=2f9773c3bdd1c382acba5fa23c78359da4baf08f90d9bbc64e360688d3c4e80d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYDQTXXQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEfUs6UJJDaaNrBZE6RpR8O%2BbgF6ySPC9lyYEdHnK3s8AiEAtst36Du4ktZmgW7k1ERb%2BsZGYTO9rR%2BMC0KixBfHkRwqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDhDflWfHqPFSQ7ntCrcA8XbB%2BI2NHvYvFUn%2BC6YpuPk1Bb%2BSc2rvCJIKqNQJB%2B2L05MrYcUVsDp2Atw8kAhLzMKuV3RiP7dhIKCJTgSOt8WgwJgbFHT34bGGetDMupuysHqwGnToMZZghVZi8EWH2AXknsLZXKBzdCxNb9Q%2B6sl5upPDjMdg55JN5Vy%2FKVhA8j8IEjecraajyB4kGNP7cNoi%2FFz6u9u1skeSLQ%2BJJJFvVZBPF8IVI2qx8eH8MJLKVJ2MzMt1YhtAxD0efM8vAPguP0WBDmmDn1U%2FPNRNiEQA2XSFOoHzgvk5vnlXPd%2BY3UFR%2BeYsZtsz5AORf7VFxA44KReD%2BShjItFb68JahIxKDAB95qiRSR6gnDRIwkJGQ7l5%2BJs38dPzSkb7eHAhxUphr9B1wN%2BnLWwlIB5YMZwh%2FJsijVtRVvSAPZvdHepc28oyDjDy4SJpaedXAVOI49Uf9OOFxf0g%2BHje%2Bv%2FRitHQHxEo%2FrPPH8Mi7AWlpYyu1IJUu8rKWG6dqhd2oC%2B6lN7m%2BHYvgwRsu5zwa3QwM7uCcBFyf2SWu%2BXqMKeeWrgfThe4f8o0hLbE49pnRROr%2BK7p7CkAiwYnCFA82zqCS27MACQLqej2FJ4L8ILbT4aKzEklbMvS3pPHVEqMK%2Buxc4GOqUBZqLVYlzA%2BZME1BGBdWVrSFUqtNSHDEbKrEAJcuMVhW1nuPrOvx8wS3kvwiLiDRUjdbPG7iGqP7UuuAckd%2Br%2F10ADWIzuGiGKTZ7OHuDEj7bzbl8Zq4eeAg6qdCtt6HkaiR7OCnq6fz5vnA0Z1xWX3NghjWsjOXynAOvFBkQLYhi8uKJy%2BJ9ltNeKSKYE0yoFmvhLiJhBzAbp64YdmVBEusu28wtp&X-Amz-Signature=e364b422b8386c3ad192e786226d9919a8e2d158d97619da5d594cc8d4f25b1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK6ATN5B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICze5jCG9kNTcWFhM5IZjhUQGoTEbGnY0%2Btvu6HyI4pnAiEAsrTstctR%2BFDaT32b1NYyk22wo%2FDmwrlYyt8cyCUJ8OwqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOjA%2BUKsy2mKnaKyiircA5Ov7lKcw9uDTECh0J1Xpoy2ekgktuGZjqWCJiZZsZ2j8yjTNXxftqUBcP8rnH2h8tsztycm9jqpnrDAMKifezPtIZi%2Fj9wHgalhOaDld2HeP7D3BIXSD7yy3VrWKgc9VLOLziggzltPxqTHDv0hbuMGgt2THj1E2Iy5qwwU2UWBWis7mkGxSKM%2F0eeNgTS%2FgxXcfxyReQ%2FCC8CjsqVp%2F7IDCdQUl7EBc0NwmgllnzqZZdM550MNUegyk4r%2FofhOZk9rtM0GrGt4Spkyd3CgHZsAKdOS9o3Qv5RRyzwJyWigB3oVoPrybir1jFD8CibjGSn85AyBJtPgU7%2FxZz9U2TbOXmh6E34es1GxxNg8aS5g045pr1cfcHnVpCRsnf5GJkZB%2BbH%2BxOYreYlKPzQpXnJoEY%2BAAqcKzn4fXU4YyH5wJiqb6RXDwo1KSH0xcJDbMXXfiJqn%2FWH1r71LssoHXNm1KwNWch3uHUnC3qGHQS4b8PxdPKFZZHRTUxGaUqLQqVwvL1%2F7yVIrdKnUs%2FaS2zwDPMm78L%2FA9ZHxHG2dRkMoWEMTQMpX%2BwdtqJCeY6vkF%2F1%2F0sDj7yph%2BX%2F2RTCPEMZhmL3OF2a5PviVa6d%2BGvEareRrfI0ETuF31NPNMLquxc4GOqUB7iMVEgjAzp4Idrl1b0XJTqNB8MY758TaIB2e%2FrQT3ZdkxVmxSpmBvQNW%2F5sJ19WoO3qHLurt150XZ54ULG%2BIkSnNLpBX1wNl3DU2f2ZX2WzET7BgWPDvJWbtln8Ubm0we2aAUk3MRhQjyeL5kc2MYsWCfMUQBysQBhoHmhPxaIAwLRUWC%2B9Ndot7nSvl3w83q5KTVtn3TmVKILUEL4xdtLfXXhuS&X-Amz-Signature=72cd0c7c7ab6290e4c2918907b1eb0008091b79a67a17c8779a0716517d970fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUZ5YVVI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBbUUYSE4i4FSqiEEVbOeXOJ1OHSQs0kEci5fFUpg634AiEAw2aNm5kFri%2FGZZesaRnXU4b5OZs6HxzVs6zmPO3RHHkqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEAYmORp%2BL1kWmrMNyrcA2k3%2Fzk5OobV0uUKy03W0hm3C%2BYDpieouqXMU%2FT24hMb8QRC4gD6IGvXHr34FHq9EF4Ts2A6TyFLM1Wf4DnCfHTODfeDB%2BV3nU3z8TF%2Bgwj33%2FZFLGut8dYOzxnKtu3U12DuW5Pw4HJi0eDnewHgnl2%2FeW9mydigauZZLwwfdfkNj5z54u%2B0THIpWt1zuHBD565JSWPKb1Li69DdjdFLo%2F3B6xPnk%2Flfdrh1X%2F5gTgIG9QkKlsW1WEwmCWOMv6KuXVYmc8OOZ%2FDWJ2vf%2FXrwCn8ixi6X2Qlb4MyxPgQnb914TYuKD7keTy%2FWZFxmIXz%2B%2FGYnaABdjptoBFIExVdZEjyDEcyCjC5wbhMeJDAuc%2Bk4L6jJM2Awv7zxGTqN3c16nHjcrY5BhFdxchE%2FhwSLORLBJQD2PwNiNtYfTL3wQUHAEAdyZ2CLtru6cyKvIDbWi7Ap%2Fquh%2FOpEjYppkaq0ClnHdm5zeUO6RZGF9A41QJGuPJ%2FuK1UlhSNyocoN%2BKQhBZlAyX9%2F85kKC2s74B7%2F4fn2ePQ3Bu2nqbXbn1vIySgzCUf7ORmgtBzWH6TilVhTEMNUkeU845y9v3OiNWfu1DC%2BYjR9Z%2BaGAn7VD3z4xi7L3xoxe0jwHUzzjqNJML%2Bxxc4GOqUB7vTShQdE0lv0919k%2FsuoaDHb6mW2VACqmPTbp5L8mjAQvm9ihd8ntDDU5SlyZuHBmyEtYdGuZeg3fkb7E15REYN3RvVP5OBCe8Ldjgq%2FSFTw6JOOyil0yACmA8pqCW7SWSxT73Oh1MhmQaC6hExnTibfANTZz%2Be7sCBRibHE3NcZUEoz%2BfEeL1endFUTjXQlj7U0%2BHYTZyCdcNMX9KXlMUyV97sD&X-Amz-Signature=e9c616470b1b5d46f32cee2deb53f9ccb1db3c09f2aeee001782df5c315d779b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUZ5YVVI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBbUUYSE4i4FSqiEEVbOeXOJ1OHSQs0kEci5fFUpg634AiEAw2aNm5kFri%2FGZZesaRnXU4b5OZs6HxzVs6zmPO3RHHkqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEAYmORp%2BL1kWmrMNyrcA2k3%2Fzk5OobV0uUKy03W0hm3C%2BYDpieouqXMU%2FT24hMb8QRC4gD6IGvXHr34FHq9EF4Ts2A6TyFLM1Wf4DnCfHTODfeDB%2BV3nU3z8TF%2Bgwj33%2FZFLGut8dYOzxnKtu3U12DuW5Pw4HJi0eDnewHgnl2%2FeW9mydigauZZLwwfdfkNj5z54u%2B0THIpWt1zuHBD565JSWPKb1Li69DdjdFLo%2F3B6xPnk%2Flfdrh1X%2F5gTgIG9QkKlsW1WEwmCWOMv6KuXVYmc8OOZ%2FDWJ2vf%2FXrwCn8ixi6X2Qlb4MyxPgQnb914TYuKD7keTy%2FWZFxmIXz%2B%2FGYnaABdjptoBFIExVdZEjyDEcyCjC5wbhMeJDAuc%2Bk4L6jJM2Awv7zxGTqN3c16nHjcrY5BhFdxchE%2FhwSLORLBJQD2PwNiNtYfTL3wQUHAEAdyZ2CLtru6cyKvIDbWi7Ap%2Fquh%2FOpEjYppkaq0ClnHdm5zeUO6RZGF9A41QJGuPJ%2FuK1UlhSNyocoN%2BKQhBZlAyX9%2F85kKC2s74B7%2F4fn2ePQ3Bu2nqbXbn1vIySgzCUf7ORmgtBzWH6TilVhTEMNUkeU845y9v3OiNWfu1DC%2BYjR9Z%2BaGAn7VD3z4xi7L3xoxe0jwHUzzjqNJML%2Bxxc4GOqUB7vTShQdE0lv0919k%2FsuoaDHb6mW2VACqmPTbp5L8mjAQvm9ihd8ntDDU5SlyZuHBmyEtYdGuZeg3fkb7E15REYN3RvVP5OBCe8Ldjgq%2FSFTw6JOOyil0yACmA8pqCW7SWSxT73Oh1MhmQaC6hExnTibfANTZz%2Be7sCBRibHE3NcZUEoz%2BfEeL1endFUTjXQlj7U0%2BHYTZyCdcNMX9KXlMUyV97sD&X-Amz-Signature=e9c616470b1b5d46f32cee2deb53f9ccb1db3c09f2aeee001782df5c315d779b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNOU6YO5%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T231815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEksTKZl4lkPiyCmzbsqlyO1qSGTLvP5dU%2FxO2XaUw%2B%2BAiEApA%2B0pQhBlsvos%2BN%2B3Fi1vgNpNX2pIO1%2BVTlQtZ8X26YqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOThk3AF8Wvftvb7uCrcA7wR4hx5oOQDujodqrvtpOZcVC7ottSM7rOzKBqefr9i7QVtGasfjRSM4sr3yQn2hJbhieTdRURIy9yShrV4fDVYQXuUEhnpR%2B3%2F5DMLeqeOOsE6Qle6PVzoYuBemQWo7%2B1sk0Xf0xiTGLP75qu%2BM%2F5sYPcOYjM%2Fk1dQZyKZ5TxF6LO954XgOoqK1biaFqJrpginitKDB6M4fT9uXMmRgQH1mFVhuKAy%2BPZHAN33r99KXBaWN%2Fn2swWNfbHqzIeGSEn8%2Bk8WJzfMS4EQQHoBBAdthFCJXGY3xbjlRzj0peIRCwG0YkMM0oU57QkmojwRA6LgvcFvbYetmw1oHphqWx03VK72Rn5H%2Fp6biFRyV50%2B3OB%2BKhnPpxJOuhR5cdFFXucuGRPP9vDyWHPaKKimLEf6CD4vj9lneq1UU0%2BBcA2%2Bx%2BaIbeH9Ohoiyn%2BIGDC%2F4knZDNkWLGvFZi7cdvNBq0OrLGn%2F4ORFs69VU273AQM9XK%2BTJc3PQQ939pWzlcx56XuQ5R2U8fSrdIwJ%2FOa2bmhuxIPNmrFyfL16bV8%2BZKXh9JR0Y9wMgXVJ%2Bsg58szUUsChWrs7sp672As4H%2B%2Fikhr3osVRk0pqGWmIzVtX3Eb%2BeXbdSMTpF4VCLwnEMMquxc4GOqUBFJFTB5JGPq5yHbSnAWku6OM5ZV6ayB8NBcrqVGHm8GmpOShhWuRhOsK1beo97nb%2BuhM%2FnbJaxaQTN1hpZC17H486t1%2BNx5Sxv4ER%2BAWi%2Fv55qIXQyuvlE97ym8vImrarLyhRf%2BYyYhIkQKWfFztNPnHHCM8XOapwah%2Bhk0oxhkLF4m41%2BJNSYSRUviG5U2%2BezzeoYgjd6kjlJybitj6toWjnlL2x&X-Amz-Signature=35cfa109b047e92f7e6aacc62cc77dbc0b85139ee8556b9ca1e378d1b0cff7cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

