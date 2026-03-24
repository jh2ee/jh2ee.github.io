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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RFHF7Y7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5R%2Fxf59%2BgczOJzUAOZOGYWL4IHAp1YnqabJTK%2FpaQAgIgfxuznMq%2BBvPO%2FIVNI9EykJEJw%2FghGlAVw1IRxcPFig8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIIZVO2iiNmawcIM4SrcA4FzlpcXaCIMYQEEZm6u%2B1crIIpJFf2rOxBY9ymlqlpHb1af9LOAHpGoIzI6oLUYN4XKPWGdVecuKA0a%2FfEen0gNyyaYWttIARo2n2jdPKCatWXSx7yFdEG581K%2FjkLR6PHeECCImiUQuVTAw7eE1dHDVAGz%2B7WqFLAFvc416B1yPFk4BN5Oi66iiZb73WfVEk7pU3RIxNzdQbxM0Jz%2BHDD%2F%2BLzaFk8nGlUBLO6Zvk3BQ2RTH6jjkVkwbL1ayHqryqjLeo62e%2BhP%2BV3JSm%2BY7GPOTC1y9Z2DJJerLmYKIEzwvlqWNH%2FTOsRRAhg29XckXa5CeZhNC%2F2EpOR5NtBCgxw0xRqTJ9BPBV6MGgPgaDjUsQdyXHCXqRRIui%2F8CJA7sxuEf%2F%2BHYPDTP28cL2kEI9nVaL5pnKTdwU7gTfXlNBVPI6vfldnQy807If8NRZ3Is1%2FrCOKC12XNDHO8ir0ZYy95WqBou%2Bifxn8qwBKdjiq8SovoYWfCDIa2RJ6TWEtjL46QfvFBF4ppeJfiAP%2Bqs%2BtzbjWw2g9bVJtHVVaxUeJst6p6%2FrdGpELDdtORB72ITedFtBdRNwPIxHDFe5GzkXBFSCvPSEoR3LreHZKCCMDkHfqqTfL5RX%2Fgc4o%2FMM7RiM4GOqUBuHHreo0X5Qtm101vey9uPTpXRCISHHWYuzB85FIeJy3LTyGI%2FgDsC75sgL709BroFQg6ZVtT6fYXiKhphdzj57QGhT7nXBBuiJy1dPqUlyg8l8cYYHT%2FzgJD26p5jLWgWtuIQ26KkjLiSLvrtWyo8ty47st9jWM9g50a%2Fc3N1YYTJcAr%2BaIq0m8WteVjG6wKdjIzPH8jmtqHu6RMJmP3tYge4aj3&X-Amz-Signature=06e1dcc989207fea8e98f70299c59a5e1135739bc9e7481787170bc4edf0324a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RFHF7Y7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5R%2Fxf59%2BgczOJzUAOZOGYWL4IHAp1YnqabJTK%2FpaQAgIgfxuznMq%2BBvPO%2FIVNI9EykJEJw%2FghGlAVw1IRxcPFig8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIIZVO2iiNmawcIM4SrcA4FzlpcXaCIMYQEEZm6u%2B1crIIpJFf2rOxBY9ymlqlpHb1af9LOAHpGoIzI6oLUYN4XKPWGdVecuKA0a%2FfEen0gNyyaYWttIARo2n2jdPKCatWXSx7yFdEG581K%2FjkLR6PHeECCImiUQuVTAw7eE1dHDVAGz%2B7WqFLAFvc416B1yPFk4BN5Oi66iiZb73WfVEk7pU3RIxNzdQbxM0Jz%2BHDD%2F%2BLzaFk8nGlUBLO6Zvk3BQ2RTH6jjkVkwbL1ayHqryqjLeo62e%2BhP%2BV3JSm%2BY7GPOTC1y9Z2DJJerLmYKIEzwvlqWNH%2FTOsRRAhg29XckXa5CeZhNC%2F2EpOR5NtBCgxw0xRqTJ9BPBV6MGgPgaDjUsQdyXHCXqRRIui%2F8CJA7sxuEf%2F%2BHYPDTP28cL2kEI9nVaL5pnKTdwU7gTfXlNBVPI6vfldnQy807If8NRZ3Is1%2FrCOKC12XNDHO8ir0ZYy95WqBou%2Bifxn8qwBKdjiq8SovoYWfCDIa2RJ6TWEtjL46QfvFBF4ppeJfiAP%2Bqs%2BtzbjWw2g9bVJtHVVaxUeJst6p6%2FrdGpELDdtORB72ITedFtBdRNwPIxHDFe5GzkXBFSCvPSEoR3LreHZKCCMDkHfqqTfL5RX%2Fgc4o%2FMM7RiM4GOqUBuHHreo0X5Qtm101vey9uPTpXRCISHHWYuzB85FIeJy3LTyGI%2FgDsC75sgL709BroFQg6ZVtT6fYXiKhphdzj57QGhT7nXBBuiJy1dPqUlyg8l8cYYHT%2FzgJD26p5jLWgWtuIQ26KkjLiSLvrtWyo8ty47st9jWM9g50a%2Fc3N1YYTJcAr%2BaIq0m8WteVjG6wKdjIzPH8jmtqHu6RMJmP3tYge4aj3&X-Amz-Signature=06e1dcc989207fea8e98f70299c59a5e1135739bc9e7481787170bc4edf0324a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V3B4UMZ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSt2ZuaL62zBH541nrt07WA6xXyAKRF3PktbRMCZE8sAIhANCu0bupgp0r6xrtQe%2FKtLIbrWgfPtk%2BXyDWfAVoA77oKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo5z5IOi%2FA2%2BIle20q3AMTYhBnbcy02RrJApkUpa4LsCDv%2FlqIUEaS%2BPFSCyZv8UtMiHoOau9Og8wR%2BqZn16NYCq97tv2ZkqmjxVoPmn1to1HgObGdFp3ljx209D8Wg7F2Sel4nEoCSr7fkD%2FTbPL0DfdiZD4gDaxtFn%2FNVj4T8PR9ObW5%2BTRlrwjWj1CLwd5QejQMTZ%2F2FwBZ9KmG1TW6GOuiXjH9Lwcy8yClkuex%2BhA6kSASRHHay48Ubqy1bCKB96UslnDhrMLgi%2BtDYWe23mWsuNMhRgbOkn55Qn42DDj%2BSyT4jMInXY1k1q4UUvqWMLQZ9MnzfnWzw9Vvln9kAYqZQyqc2Tz2S64Ld7wEUhUmcTY5mbDyLfD6ATrg%2FL18pC5etDZLajuSlG0n%2BOLDCc2T%2BZQPuFKk6Z79Ws0u4sTqwXZPcKX%2Bj5OL9O2TX8EyMbniT8%2BKiiyZByKprngidStU7fiTqXy9jLbILAzmc0gOtfl6YvWDtfHJ6DthsfRCDVkXgSp26j9NlNtoujL9tXBJa%2F5aqHFzVJp%2FDYU1lpo%2BN2kt7QBHXvC4t4PpXnF7z0tP0X1kkk7GHEkxiE%2FHv6Y1GHXlpihBg7sQy0IFMgnVejGbO1hJ%2BinTDIAD5xVi1aaMCf5uJy60njDb0IjOBjqkAd1yVDb3SvUojyaI7vMga7ToLx8ndk%2B0yA6QVdQgf7RZWop%2BxG%2BLJbcB%2Bemf5K6dImFwfGk4DsXGHDF96vbZzBvXeC0%2BpCbEiVXJTgN%2FWPODZM0WEmzcnzMER3CQSvnfDzuvzdZeLgRDt0B7tvVohFpHibdgM46qelGz1bmHDXQk3m6Sl%2B2d6zk92N9t%2Fdc1l4xR6mZxREyU2Fz9JwQquJp1ux%2F1&X-Amz-Signature=558b6fbed1e3c58f09642939384aee85960ca0a0e9929823c4404193009d5f5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVNZLMEK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDOdDOvaekj1AkOwzZKoTJrGoBk%2FZKE2E8tq2JTxYOT0QIhANVolyYRs2bKGgXhJtytYgcUNMf%2BscDIkbNxTm0vySJKKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwDWYR8LUHgbAkWptkq3APXlv8X5as%2B%2F7LnYieUg%2BtVaz7l7PIeEL5gzzZ4WgPx81heHQvewqqXSV2YN26MYtEWuCS0rgA6dg1badtdKjpNCfq3Uz3D1wDKLXyMA1UH9fF8jp9w8P2MVk%2Fbs5dyKvMEKXEuShhEwfgcFZHEb2CculV2LDWKxhCHnFvUBcde22pmbhnborZlNOcaps5faeuvZ6hKOK7QQeYAUVb%2BXuH9xzIe2r2uW2js%2B7EOKglY97XP9KkJtLKihHVhagw4DOAAIynoaV6lrVzNjex%2BFGcALhAHXMAASnlQ0xDTR9IFndeH8ORcg6YmvCwrGmUXKbvekNYmIh6NOY8s1Mye5xyZVYidzAROsGWP8ASd0oGYq06JG2vLVIppl6FmBXb5CPiyx7Dk2C12qBILZccRHi3BDJ%2F8tfdowQH8UOP9IOcm42OuAm329Y0gu5%2BtLIynmVcDvVIKbFUWFs6sh4jpTduJuXsXQECh0tGr4Q4blZ9SLKH0Kbe0dAFXVTT6sF2KIs0ODP6OUqZ0Kza7TLakZ4rliSdi02ZmWgTq31Ywp1bip7SvPoa%2F5XYUlgEFefVbRg1QgHMUJazy%2FPZqZVcRm%2Fu0Yzuoli0%2B3ajh4mJMCAAIRUuNndmZXw1gXRFPiTDe0IjOBjqkAZPI6ieCyYf6SKoLv3%2BwlQJPiVRzmRCIqsy9UFDb6UlZM4dbm4vlvV6lNKaGJzaLoU4ILoozS5xnnh8I%2F81yfTwa6aVs94dPv9kL8DxoBGwIy6s1sHFnxot7WSG4Z7YPzVEE6fLlJ5oeuTg8KmctUB%2BXufqoGHnwTV8p51vcZuI3VjLbL49Gmk%2F%2Bk28hw%2BLcFzyJTxjvZpfi2XIrzbhztVwG8kLR&X-Amz-Signature=15a34d757372ecd9ef5551cbb50ad049ff1c80342ae8a5698c573baa61184062&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVNZLMEK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDOdDOvaekj1AkOwzZKoTJrGoBk%2FZKE2E8tq2JTxYOT0QIhANVolyYRs2bKGgXhJtytYgcUNMf%2BscDIkbNxTm0vySJKKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwDWYR8LUHgbAkWptkq3APXlv8X5as%2B%2F7LnYieUg%2BtVaz7l7PIeEL5gzzZ4WgPx81heHQvewqqXSV2YN26MYtEWuCS0rgA6dg1badtdKjpNCfq3Uz3D1wDKLXyMA1UH9fF8jp9w8P2MVk%2Fbs5dyKvMEKXEuShhEwfgcFZHEb2CculV2LDWKxhCHnFvUBcde22pmbhnborZlNOcaps5faeuvZ6hKOK7QQeYAUVb%2BXuH9xzIe2r2uW2js%2B7EOKglY97XP9KkJtLKihHVhagw4DOAAIynoaV6lrVzNjex%2BFGcALhAHXMAASnlQ0xDTR9IFndeH8ORcg6YmvCwrGmUXKbvekNYmIh6NOY8s1Mye5xyZVYidzAROsGWP8ASd0oGYq06JG2vLVIppl6FmBXb5CPiyx7Dk2C12qBILZccRHi3BDJ%2F8tfdowQH8UOP9IOcm42OuAm329Y0gu5%2BtLIynmVcDvVIKbFUWFs6sh4jpTduJuXsXQECh0tGr4Q4blZ9SLKH0Kbe0dAFXVTT6sF2KIs0ODP6OUqZ0Kza7TLakZ4rliSdi02ZmWgTq31Ywp1bip7SvPoa%2F5XYUlgEFefVbRg1QgHMUJazy%2FPZqZVcRm%2Fu0Yzuoli0%2B3ajh4mJMCAAIRUuNndmZXw1gXRFPiTDe0IjOBjqkAZPI6ieCyYf6SKoLv3%2BwlQJPiVRzmRCIqsy9UFDb6UlZM4dbm4vlvV6lNKaGJzaLoU4ILoozS5xnnh8I%2F81yfTwa6aVs94dPv9kL8DxoBGwIy6s1sHFnxot7WSG4Z7YPzVEE6fLlJ5oeuTg8KmctUB%2BXufqoGHnwTV8p51vcZuI3VjLbL49Gmk%2F%2Bk28hw%2BLcFzyJTxjvZpfi2XIrzbhztVwG8kLR&X-Amz-Signature=9601025e00fa117cff5486ae5affeba109bd48f863781bf168c9bde8b3143311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5VAOAT2%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEYc9kSW0mlDnVwDMTxP4VjVYnZ%2BnU05dq6BEpEe70yGAiBHNO0oIAk1Am%2FhYAsJUhi5DhbRm%2F7gv3rEwav2FpN5pCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOTT69VgdVi2H53xLKtwDgUeRdswXgUUGya9w7asmzZSypckjK1hr%2ByAdujG2%2FS3APx6C8Fxoeil7E19xCK2LNqns0RyuI%2BJ7hYrepWe3%2F1aeltdqu9S3vzcL8nlASsHgxMt55ZAUAM9Vu67l84mqG9Qlupve1XiLUd9C3Q69j3oXuBg9lOS%2Fqo9K%2FmpJ96GvpnZAOEqg9XZpVgW7w2l17w%2Be7zgGT%2BKAPZFYx%2BIS0feSwRUi%2BY5Zn7reJPqB%2FCemTTrvXG8gJvSSJc%2BoQV8PdMddYgxMekB02EqzVvYPmeqgzlRJ6RV%2F%2BY8Zbzq5%2BBwwc2qnX3traEXXGnLH89nAXPBwoqr%2FwXd86jfHtsKwraCqxzz4edYqmjn2wAGtNTdz7l5xfJKq09bmQyR9bSGvA0HQyjeU8u0HM9sM3rK7LYrxjU4OGkzLyMMSVdxEjJugzR4eZRwimtiDplWVJv3SzK%2Fbw7FSFOxc6Je%2Bx3UvuJfadleBfPnnVdL1htvPCJGGxxq%2BtAEY4wnGjZ7EXVlBN%2BoC5LK%2FPnWr%2Fd%2BRxF0wtpWjBeEBKxr4HgkUzU37dYhow%2BsB14hZOniUtlrUS9LYdh88WGQhEg2%2BcEgop3YqZBQEfXQ3bImLb81BUqJh16eBGcRwdSpae8KPBy8widCIzgY6pgGu7QgWem3EXiyT94eiCStIrWrqTcbtTp9%2B1vczp%2FjJ6q9cj9pO7oe4oiuybqYeY%2BdAFuXHy6R2m5s68EcytAw%2Bvns4mgD8drv1pOjvpcOqiEGrxV2UeSVeazhYvPSExYqV60HM5fqSB%2FZrQf9hvKeAEihhhatlU9As4ELIv6JcbVfx0p6sCXsqT1Up4QMaNNwdDXj43tK9nZcvgUJ3QnvFm%2FnRCfVN&X-Amz-Signature=9c535b41170e3f6820e96e8b3a800f97774b194b1923fdc384b1c70d70edf739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWLI4FCI%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPrrlpqO%2FlcErnqD3WwWmd%2BOQmHhs0T6N3%2FNyYfKn%2FPgIgH6e3MrjmCGueLwKqR1RUfsKgXYHB%2BmDTDJ5wXEjFzuUqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGh0hxGr9AkcmrL2pSrcA5ootqdnKq4mXTompRwg0MhnXvjJv35Yqyme0OceqRQFAm9LLCClKWpVLOClD%2BHTSwTNHSQnBReKlk%2FidIgo7WXbmV16n%2Ff4Pvo98qA5c8MVsTvZTuWa2ADTLeSjy3fxfIdg45HghFga5J%2Bk%2FcPX%2FZqXsMeAvSuHu3571DPhufV4lQ7c3aVdvagWH2E39mTphrj%2Bw9jdnz4aPKrFewI2obFqVZSG%2B6mZWvWc0YbW%2BtFx0%2Fn9iR1o6wFDfDmThFMXISlVxlR16AgCEpG3vqYY1dTX2hP3dJQqZxg%2FeSY6sBl9boU6wBDditHDToi7k2SoJMkqkw6pcdUxKFayL8l2eguA1JJBRU%2BXWJ6qveeaYKEHSzm2i0alfI3yZ9VQ6oOIGTYJMVcPMyMk4k802X%2BGea6lZx2%2FTi%2F9o3M1E0VXfAUCpYPiGOUp%2Bc%2FGcs4GH%2BPQHdci2b9yP0S4We3fHrBaxM3L1hqLY8tc8cLD1N54Bv4IRGOLoWQwHhPDCDt242VOKVPssJnfgtkqUBpzA%2FIUeDamhQ8ILTWqvG50e3WNWpRYZaIrK2Cnw7ILPkCv%2F20uq4Leu4v6vGM5c7LzUUX0QYEHMnFisD0C3S1f5AQTja8mqj5OTvRo9gEYu5P3MNnQiM4GOqUBMzBnMQJMAg3P4qIrtJSSTrAIdjKATSQwyqJ2sUI3glL5zJD5xuK%2FooUR%2Fc%2BhKV96ILGzVv9BmR%2F%2FAlQCPC4GO7bDkzjJDvmYHblCaUnwa6bT8M%2FdZzn1ZiHRFuaVmtbSHGHxMvxHmpi1m7GEf9N9Wdk1TvytYTjOQpjIzKaGZ0j21pRwedGjVMM7JACqMDHJh6ymJvcsSzY%2B0RnAK16Y%2Fpme2bFV&X-Amz-Signature=2830830d535e2b35914ab6b2da52fc730ae6554ad8274635b59d588ff325a8f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UX756JT%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDzQ%2BX3fR3%2BJD7JXYoqc7C70KFiNdHTHFY0l%2F3jndkmagIhALOO8Ui22v9A589MH1VfkAzBGL4QkTCyellYr3uYMtiiKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwE1LUU4mjtQDw15OAq3AM6RYlN5j3wIOZEk%2FDOO3fARnHtYt%2F3n2iayxlII7vmEkXW21s3VXo%2Baby%2BqkdEBtvc2gKC9BlswTZWdG%2FrMFpjlrcznN4TjdnMrBmvSD2sOb6hOzyhjO4pnrJQMK6K%2BbwQR36BtndPQPEDLyyaRAzKEfGM5X6qljaKOAPTGCgLIyrHcc2pv0sPDZ6W03WHYUEU91tbVf9nceqTwl1YdETBywXu4fsWekk41flBxoKTA6lWHShcJOTOa9JVe79AIUGA%2BF21wmi01P%2FJoibMj5qTXauCR8Qhou7hfzSpuUtQCQGPQ0jdXY%2FjcOY9t9q9ssQtv0Kfh1SoJ%2F80zpFUGlSvNS75ODaoXadGngD7gBAlrGta9JbzhdzGirFKTvd9P9ZXKPEaydsFftFUZb65Y9ZGWyzoTj1Kts4AvM8Y%2BZ4gJIUMWgpDiR%2B7e3Sx7q1aHB83zqeLw5kT%2BUz9yJYVTRU7tFEoLFKMPvUrmo%2BihWTDctNHIXpceRA4BdMAYXU9hVnPqBHHavKKFnj9Wgeenju6LyR05657i85NY1GxY1y4%2F4Yu2iLWXjriezrqVy09eJn8awALCbgM92Lg5rBPAmbcdrm01coFlo918mmiLHDLcPPkyz%2BiI0pZnN08yDCC0ojOBjqkAXYapMENOxcIUylpvHtE81KbzJJZ4spoCyslrU3GYxkhDo4gUzAhsdaSxi1fLa9UmRzyW1gBkOacCThtdKcaBnk7ESR72ZdN3QzHe%2FHQShezKcXiUNfh8uWN0XVW79MWXcMZizKLb9iSiKaJwEqubI7CprXtGADPNA%2BMq3T5n%2FlNTzP6rKGXQrX5G1dKg4XjEJPo%2FHYlFk1GigJktok%2FSLQc6Mlq&X-Amz-Signature=774a0de9a3a92a2b19e19adb87b7f32b7b5c5e3cf48a755ed533dd54187325c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKRXIDS5%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFzpJ29Od5ueXviim5ZjVDXlVECZEe5QmOaT9mi8oOVPAiEAqEZParoLOu50xdWtcPRz85i%2BEI4c%2BOGkwpk%2BOOmrFqoqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBC2FsciCTyiC%2Fn0OSrcA5pVO9jLEJk%2BD2K4qNFNxhdZ7i4b1j9JjPclmAI8VWdBAOwZsBXW6lPleIPgggRO801g1d%2FcFGrF47a6ibqJpwLaoQU%2B%2BpBsqG1taJID5v4TkyX2hqOF5CZiG3Dp1U3D1TxBkyHE%2B7vV42cTX3zkauABSgHK%2BwyScu5Fy%2BAmC1rllrvmrY2rrmfeFH284ergkhGYzBt%2FXzpKAXqMaRozXAe%2Fcs4PXSOCv3x2nKACyxfUhxZmHzzpKxjyYcItcMqK4ZKzpLREMIpfvluWb9T7I1h7FHn8Ry0HLtQsunf8gSIaON2%2FfiMDXbnl4GLJknM5V4q3UFOY4Y9uFw5pk%2BqbbAsDVQ%2BOos8m04gZmrnha6Kaf3E%2FekXPHBMGlcuNHFEZOkAp%2F67PJzgJN3BPWt4ZvfYse4wBi%2FNfqyLG0IH1RaKDMphvcZcWsPL60vNa9F10r%2F9vBxgnFyFvWFjoy5ndI5n3HpGjc837SWX6KnHG9iGnmeYQyWZQJqt8NTpf6pE4XGMPF1ugkM%2FBWDeuuI3zJJI4dFEMCJeh2zxJCPet35YSv2uRKamj6tEIrlk2L6grVm%2FrO7kTm6u0YizuEisGDgGT0t8J7%2FRBRcXKE46kWbH%2BU6BPzIvmRZpmx0nAMNrQiM4GOqUBJ6FDDcC%2B4S3JYYQ5EiuHPhpQJl3fPXmzdjS13OQdtNo%2FIMGg0TAOQymMHdm7ESBMBkP1%2FS2VQTAk5C%2FZls%2Bl%2B2lBBTq%2BfD12b3X8LNZpOu0VEGyN2Nzp2t0lYq3MIc319nN8uH%2B8Z3PJkbiNMx6gCygApC70Hm4kLvS8YGCkXJVWuiQ5p3GOjgtFTPdE9jVjgw3Q6rNuprxzBtk1yK3GvhuDuJMX&X-Amz-Signature=bb8ab1bffc7a2caddaa10d350fca5c87c7251ef1152cf46b25416a3d5ccdad6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKRXIDS5%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFzpJ29Od5ueXviim5ZjVDXlVECZEe5QmOaT9mi8oOVPAiEAqEZParoLOu50xdWtcPRz85i%2BEI4c%2BOGkwpk%2BOOmrFqoqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBC2FsciCTyiC%2Fn0OSrcA5pVO9jLEJk%2BD2K4qNFNxhdZ7i4b1j9JjPclmAI8VWdBAOwZsBXW6lPleIPgggRO801g1d%2FcFGrF47a6ibqJpwLaoQU%2B%2BpBsqG1taJID5v4TkyX2hqOF5CZiG3Dp1U3D1TxBkyHE%2B7vV42cTX3zkauABSgHK%2BwyScu5Fy%2BAmC1rllrvmrY2rrmfeFH284ergkhGYzBt%2FXzpKAXqMaRozXAe%2Fcs4PXSOCv3x2nKACyxfUhxZmHzzpKxjyYcItcMqK4ZKzpLREMIpfvluWb9T7I1h7FHn8Ry0HLtQsunf8gSIaON2%2FfiMDXbnl4GLJknM5V4q3UFOY4Y9uFw5pk%2BqbbAsDVQ%2BOos8m04gZmrnha6Kaf3E%2FekXPHBMGlcuNHFEZOkAp%2F67PJzgJN3BPWt4ZvfYse4wBi%2FNfqyLG0IH1RaKDMphvcZcWsPL60vNa9F10r%2F9vBxgnFyFvWFjoy5ndI5n3HpGjc837SWX6KnHG9iGnmeYQyWZQJqt8NTpf6pE4XGMPF1ugkM%2FBWDeuuI3zJJI4dFEMCJeh2zxJCPet35YSv2uRKamj6tEIrlk2L6grVm%2FrO7kTm6u0YizuEisGDgGT0t8J7%2FRBRcXKE46kWbH%2BU6BPzIvmRZpmx0nAMNrQiM4GOqUBJ6FDDcC%2B4S3JYYQ5EiuHPhpQJl3fPXmzdjS13OQdtNo%2FIMGg0TAOQymMHdm7ESBMBkP1%2FS2VQTAk5C%2FZls%2Bl%2B2lBBTq%2BfD12b3X8LNZpOu0VEGyN2Nzp2t0lYq3MIc319nN8uH%2B8Z3PJkbiNMx6gCygApC70Hm4kLvS8YGCkXJVWuiQ5p3GOjgtFTPdE9jVjgw3Q6rNuprxzBtk1yK3GvhuDuJMX&X-Amz-Signature=6cd87f0562b4f8cc4c2e21095db1331858933487a759ea6e1a7fb5b52fae3c36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636B3ADDI%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUqcYmpKvegUBFlfaMFk4TEQi9Aq22wHYr%2BtZayBpzcAiEAkMIvRvr%2B2YEaG5S97voLbarrtwn1Qj0NtTo3vVT6gYsqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLJ5pSj62F3jY2YXrCrcA0gxVAt76bsRU6WIUckw0pk0du%2FNFuiCU2nF097M8foxMKQuzzUkR6xBJB3UGjkZuxHS9i7oO0LMQ67Qis7LcV1ARrZiou1HmhHb85nrq1wUabdFrxuKlhRg1F8ndQKfbC07cZTe46EYuLP%2FqpZi3VqhN9K%2FVputBmK0G9GNpCtO9zPjjPVcuipm%2FZ4dsSja5WrWuSwCb7E%2BRQDiN3MEDd5FqDMxMAEZlq1%2B8KUsoqzCgcyXHjHIIjTSCkc6PB3h89T0L88I71vC%2BaKZh5%2B5EaLkscIsjuddpmVOgMhbwTlfPy1ESzqrMNbUN%2FCpYqUKAECyNnXaIjIbTnEB26KK9pjATvjDEq75KTdQL7kQebqc4PBHOTWaLjDsTqgx8PYvB0cl587mKrW%2FwsTdBiX6oYC8Ghhdm7CtP3yb3R%2Bysl3ZuEa1XKk%2B8BMwpgo2x5zOwbSIfVG%2BhlLzkg2x9ieKhsBwT1lGvZuz6KjRPCJPPa68UE21pn4nAF%2FM5BlErygHqX4SceikNeKYP8kQjOd2UVeiK3%2B400YLbr8o0qLreTgnLx2CpYTlgDx%2Bx8rgMs7n411CP9WNEs653EMvWwA0m0JTkwsPR6HhDJVVrnGz3s1JUZZ6wW1H5Oh7KfV0MM7RiM4GOqUBUSJTyCpfYYGUAONxDgx37QxUoedKKrrpaHADvIpdAOwumsu1%2Bm0IaLIKKQHEDyVOgVK7NFkXMazKKwH%2FvgwzMQlxYa%2FyfMqXJ1BKc2F224kV76ubmLTsX10Baqe8%2BL6tWJymfXGm5MRjooO6u%2BC%2BHp8HXJJRd8Wso593%2FIsJLY%2FoXDfW6LxmhDrjlNrkFXIlTJrcitXPFPP0QMlQJg%2F%2Bh6CjuIPv&X-Amz-Signature=42355af5dba573fd290dcdd9bf075d6f67f569552b97e986013176bd86fd01e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNRJAT7Q%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEyZ7hsZYFlJd4xqAwOGHoS2wqSqJHVhJVKxPfULADzqAiEA%2B2i5fjxYmyOsf9lLu0o1wa%2F3k7wDuf5kt7AwL2lPa2IqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKX1yanicPyRp%2FkQ1CrcA6EZB%2BPAQf%2BUCDYi51%2F7%2FyBCp5SEVrnhVSFS%2F7a8wCJKLB75TzkSCSyAVsbrkzANvVGjdO0KH1bczJMWbPIaYfB1mdGPfFu9sYptLZoeZuOFkIHcbttEvC6dBqbWDJlQn1NfjQGi3u%2FeYCCDwVcd5cbHrzY%2FCeDADOOp0jEh4I75d6Vy165pdRexg8tmPok1mvJrhZ%2Fx%2Ba1zuVUoQbCgxQ1reaufNuZ%2FiX7DFurqYmzm1oQnytQITkj9PCFVHLoDPFrFxsfmwKcqOR%2B6ZSeRljto8PAgBOgnWW0%2B3TR02IT%2BVyR%2FlmHU0WM%2BQKm5rsdPxD%2BfAgI8rl%2B34x7mcFKySqM3SQKif%2BpJz4u4Aq3WRgRMfULEjazlKYcYjCFrHT6fRl%2FS04WjXo9H5Da%2BczT0SCO%2FXt2RFrbFJdScxMoC%2B4%2Bv5Y1bmVYg8%2BMG%2BEMYpKewN4rvwMvJwHJmpdyTyhyCd79sbAMAHma7o29jKQ%2BUK9XSDmV9eNMAtt9wSEQqR6RRwsYVyZy2QLqh3wdWpg%2BjMc4eqvKqJ247YWB4caFoAi%2B2Ri8OLHSSBkK4I8P7iJROL%2FuzHtIqjwP%2FffeCCx%2BJCmbd40yeYM6j5TCLdj%2Bomec3YEmFk5FgAkTzccZpMLnQiM4GOqUBGhD5hlCNeZ%2FRQ1cb%2BMGOaYFQBBxOLpp8bsZJ15VOK6OQi4FfV26ggmI8g%2FMPwotdYdEvo62kh5gGVge%2BD7WDf2aQdu3J9CdKL8ROwCggGzJwsVhxgwGQRcrDWQqRiU3ggPn5U7FuH1HO85oynrFH1y%2FYo6FXdlhO9DfrbQXcLwdkaW4JZ4eyLQoFeFcbpQK2GzSK6EWOuaPC2Z5jZQ7SU14rPggq&X-Amz-Signature=dfa20277c4cf2811eccef386c5bd7f6421b0f0018f62d8f489b2889ab85ab62c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNRJAT7Q%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEyZ7hsZYFlJd4xqAwOGHoS2wqSqJHVhJVKxPfULADzqAiEA%2B2i5fjxYmyOsf9lLu0o1wa%2F3k7wDuf5kt7AwL2lPa2IqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKX1yanicPyRp%2FkQ1CrcA6EZB%2BPAQf%2BUCDYi51%2F7%2FyBCp5SEVrnhVSFS%2F7a8wCJKLB75TzkSCSyAVsbrkzANvVGjdO0KH1bczJMWbPIaYfB1mdGPfFu9sYptLZoeZuOFkIHcbttEvC6dBqbWDJlQn1NfjQGi3u%2FeYCCDwVcd5cbHrzY%2FCeDADOOp0jEh4I75d6Vy165pdRexg8tmPok1mvJrhZ%2Fx%2Ba1zuVUoQbCgxQ1reaufNuZ%2FiX7DFurqYmzm1oQnytQITkj9PCFVHLoDPFrFxsfmwKcqOR%2B6ZSeRljto8PAgBOgnWW0%2B3TR02IT%2BVyR%2FlmHU0WM%2BQKm5rsdPxD%2BfAgI8rl%2B34x7mcFKySqM3SQKif%2BpJz4u4Aq3WRgRMfULEjazlKYcYjCFrHT6fRl%2FS04WjXo9H5Da%2BczT0SCO%2FXt2RFrbFJdScxMoC%2B4%2Bv5Y1bmVYg8%2BMG%2BEMYpKewN4rvwMvJwHJmpdyTyhyCd79sbAMAHma7o29jKQ%2BUK9XSDmV9eNMAtt9wSEQqR6RRwsYVyZy2QLqh3wdWpg%2BjMc4eqvKqJ247YWB4caFoAi%2B2Ri8OLHSSBkK4I8P7iJROL%2FuzHtIqjwP%2FffeCCx%2BJCmbd40yeYM6j5TCLdj%2Bomec3YEmFk5FgAkTzccZpMLnQiM4GOqUBGhD5hlCNeZ%2FRQ1cb%2BMGOaYFQBBxOLpp8bsZJ15VOK6OQi4FfV26ggmI8g%2FMPwotdYdEvo62kh5gGVge%2BD7WDf2aQdu3J9CdKL8ROwCggGzJwsVhxgwGQRcrDWQqRiU3ggPn5U7FuH1HO85oynrFH1y%2FYo6FXdlhO9DfrbQXcLwdkaW4JZ4eyLQoFeFcbpQK2GzSK6EWOuaPC2Z5jZQ7SU14rPggq&X-Amz-Signature=dfa20277c4cf2811eccef386c5bd7f6421b0f0018f62d8f489b2889ab85ab62c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCSW4JQC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T064649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAFaDBk%2FIWkRmnR0qWSHHgJcgGxLFaqLCOvMIExzy8%2FgAiEAiMKsqlIxNWFi8DjoIfoeYA%2FXcN6KCuUFh9YhAaK3MMIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDItiXLWS1y%2FTVoUTvSrcAxZQfUhgWgfRdwulX4s0Vn%2B5BewjXV4us7vJLyJmgpnt412ipI3mtDQaBm4lPRCu3QmRP%2B9qkCuraDwqrBJveDk64T4CbsxM3bzh4yI1HJnKSYziC8qa%2BAi7BNsFgVVf%2FGHmHoGoZYf7pWe9%2FPEdUlIE1gek6MA5FKs7PaWoquBImc12pi%2Bjzoo26%2FjoQVDmX2aOi2BW%2B97qHBsfGSWw7tSzCbOPfiCQNONFzFlWqow9QOaux6qQ8M4HDyCyL%2BrbF%2Fl%2FzgcPsGxqa42l9Qag%2BHi5rcwUDi%2BS5lEXlDJlvg5Op0RclujgIBvkSvqkFW8dwu%2Bu3kg3kxGtQaSJ%2B90amLmLRniKj8Ks3hepDjmzjix3hBkySK%2FxeJsXrJoeMdaDo7kya17O4LJaoOi5dx865aPAxADXSUFVGbKcpWSxty0ePeCGiSHtlLk3p2GONvL1Hrrff7DLaUwcrVQAPqOb244zQMXUOfIaNuFf98ysi2u%2F23Mz6hivDBuHmxf0Xkkz2uux2QIcwdvb28FOJtwRHkOPxMawgh9rX42AcZf0czlqRl%2F31NNkSXChyCp9z7jGubQu3%2B4Q5uhlQFWo2axCeWU6n4q7Red7nd%2FQSKXCQ%2FHHCzoJEmJDxQl4yePnMKzRiM4GOqUB2Lbcu%2B8z4m5yiXptmhHvFpATLbP%2BLx7nSZE075HPDdAprUiIHGJ1LVoEbp%2FfgjttMz9TtlLQGWDh2z1O3D3Sdj1wij0g8tdnyCGPF6bCOLdR50FsfvMiGBOK5Pjt7KZ3HPPR40kEYQ6mpAzgVc0dKHllfFZqiVD0bQVJ2Bvz8MQ%2FptK%2BFOwKmtW0MF2gxDUVJ2Avr3RPxFFlg9M6fQ1heHJhzErk&X-Amz-Signature=8ef8c6ecc531ba440e4eacbb173714f73c11eadeac61b1762378e82d04e5e9a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

