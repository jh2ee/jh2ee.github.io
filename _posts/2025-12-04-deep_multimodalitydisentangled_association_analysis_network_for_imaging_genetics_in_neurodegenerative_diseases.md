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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT33ZAMU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCc2bvEpyBcZ4oDLBGiRoeD1PGb6Kx883gRDAXrgIoOiAIhAPhrdH3XAGN7%2FtDxijJ1DrWyrt8nZw67ZZ%2BhHfK69%2F1aKv8DCDwQABoMNjM3NDIzMTgzODA1Igx9Jg8pJoqMvTz7AIQq3AMNMM2KZKLa7%2F2Y7lP1UAQxed2gY%2B49ZqQhqrUp3OLqi7v574SWq6%2BShtRg0wvbeNGjzjh4shwdINZJYvx2fQtnIgsxthFqSPrVhxjVt%2BM8wHG9451aLGY%2FxaBQefNbTZOPHtm9OfQAW83FPcExjCTp1UeAUzrXCD6Vj%2F4fGyvPzHrYhOhcoc2gPGnAqia%2Fdy5ect%2ByMwTzcvBgaYE1c4cgojZqd11%2FsshGT8yaU0TCPQsS8HC2NnvTwAk6XjiaWm%2FOvCG7B4xfWiXdth9UF5frV5RahO98tTXs%2FOinKiuJlaUCRje3gfCs5TGZ%2F5BEcitGopy%2Bl6tDwPGkpRk6J35gKn1gJOq299xRtKG%2Fy0cvMabHSaZ3pO9Buh3lyihyIYLxoXdqLRKm4wbIsB9NHIw%2Fy3r%2FZs67eT9IQ4kDv0gvxfaMGBe3aPPa%2Bb4GqZkcQDyxYzu3rAOLFOT7uUYI%2FF%2BfOjiYCZvaEQ7jfzGPTptUYs0NYdFk4%2FNaPtXnjypRZCKkKYyH09WMsg2mS7Md5Y7Ix%2BmEysD4Tpd8WZe4Q%2BO4zgrUAtxGMY8n5OWVb2%2BfG%2FOn0XMrlsUAn%2BqXZEhTRhS0aH61I2tLwAuh5G6x2U9nxcfYVNezvsIzSnmYWjDzyK7OBjqkAU2hfahMD4RdunziUZFqcmvL%2BEqDefydkgGlb67jOfhSmJ0Pugwh9ECp%2F3eDj0zIZq3x69m8yjseCtXBJhIlFRwK1Bj%2BASWekyg%2FoLaJyZi4dyIevQD9NJRV2hooP0%2BlhWJ%2BpLdEXUeGAcl2OlqmYMoJw3x6Pq52G4fqHWte8VWuyaCcoz3KnU%2FoIAyZf363r2UplHnkz2BFH5L9TbAyyckJKXJw&X-Amz-Signature=2f469cbe08148a855942af78494064e9ae1ceaf6cfb4d2dadef6b8adc0f68ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT33ZAMU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCc2bvEpyBcZ4oDLBGiRoeD1PGb6Kx883gRDAXrgIoOiAIhAPhrdH3XAGN7%2FtDxijJ1DrWyrt8nZw67ZZ%2BhHfK69%2F1aKv8DCDwQABoMNjM3NDIzMTgzODA1Igx9Jg8pJoqMvTz7AIQq3AMNMM2KZKLa7%2F2Y7lP1UAQxed2gY%2B49ZqQhqrUp3OLqi7v574SWq6%2BShtRg0wvbeNGjzjh4shwdINZJYvx2fQtnIgsxthFqSPrVhxjVt%2BM8wHG9451aLGY%2FxaBQefNbTZOPHtm9OfQAW83FPcExjCTp1UeAUzrXCD6Vj%2F4fGyvPzHrYhOhcoc2gPGnAqia%2Fdy5ect%2ByMwTzcvBgaYE1c4cgojZqd11%2FsshGT8yaU0TCPQsS8HC2NnvTwAk6XjiaWm%2FOvCG7B4xfWiXdth9UF5frV5RahO98tTXs%2FOinKiuJlaUCRje3gfCs5TGZ%2F5BEcitGopy%2Bl6tDwPGkpRk6J35gKn1gJOq299xRtKG%2Fy0cvMabHSaZ3pO9Buh3lyihyIYLxoXdqLRKm4wbIsB9NHIw%2Fy3r%2FZs67eT9IQ4kDv0gvxfaMGBe3aPPa%2Bb4GqZkcQDyxYzu3rAOLFOT7uUYI%2FF%2BfOjiYCZvaEQ7jfzGPTptUYs0NYdFk4%2FNaPtXnjypRZCKkKYyH09WMsg2mS7Md5Y7Ix%2BmEysD4Tpd8WZe4Q%2BO4zgrUAtxGMY8n5OWVb2%2BfG%2FOn0XMrlsUAn%2BqXZEhTRhS0aH61I2tLwAuh5G6x2U9nxcfYVNezvsIzSnmYWjDzyK7OBjqkAU2hfahMD4RdunziUZFqcmvL%2BEqDefydkgGlb67jOfhSmJ0Pugwh9ECp%2F3eDj0zIZq3x69m8yjseCtXBJhIlFRwK1Bj%2BASWekyg%2FoLaJyZi4dyIevQD9NJRV2hooP0%2BlhWJ%2BpLdEXUeGAcl2OlqmYMoJw3x6Pq52G4fqHWte8VWuyaCcoz3KnU%2FoIAyZf363r2UplHnkz2BFH5L9TbAyyckJKXJw&X-Amz-Signature=2f469cbe08148a855942af78494064e9ae1ceaf6cfb4d2dadef6b8adc0f68ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GOJL377%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCdv%2FpezDdEF%2BthYs7EfuaSBBFD1Frz7gi6YakT32glzgIgEKGPY7dJotLtJYA%2FmrirvPcwLh1R1ou%2BNK0fw5Pdvjgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDNwHEGDxz0kOKx9hmCrcA6oQIhz4yuzTgwwvVu1Na0zRUY4AODu5zhUq2ihAt%2BzRRIB%2B8dXc4cmh6YIHcPicnePacprMqpbdMVwdcifsfJZ9%2BcpPqTZRDdOoHzQL2tkHkfqT7Pgtz4qEGnDTtQwouC%2F8oj7cTu%2BxBV5Vjvfeu279FEUBuoog8RzR4vwhz0mAxLf4cQ%2Bq64YqniqbEBbawvGvpqY0WlSb7v6FurFGzlR3fwwOspahFVZ1R62N9huyxvGwXSFh6IPOMDCC%2B%2BzQ0vwDZsmmwZr32CPlltfArcxlXAXVf1fl0UBXrAtPnMnidgNIjuhd%2B7860eOTAbak9VqhgEBmjgCThHIOr7JsRnpVY3o6cDwcCHLImLB69mJo9MJHX2f8WnCbK2YUJ9auTSrRnlvwf%2FnDguCb7EeAMU%2Fix8MIixKaxAgpwkVqfCHZNeuf%2Fvo%2FAbnL72LHZ7orUICLrmxY6QWQsSZkbLlP7oFSZHBUeBKQIkm3RqcVLdfRaUAmYUZq0Vvi1eDwyFWawUTqsSX4r0qwAYQdFqHVtZYzWdSK5w9jVKJmg88rYyGjeyp%2BpCYa9af%2FW80Jl34T5mIoTOJVh3lRkESOgk%2Bx1VtXALw6w5UBLzOiEv5pbcvo%2BYFssrEOO1OZzl8yMPvJrs4GOqUBHC6i0owhlRarwgewcc%2B7sKtDMR3BEUTYVCtivTnaHKwQRpTjhSuJfasvEILEiaBb%2FnApfAYDbelD2JG98HD0EJW%2BtBOJlXGS81qH8fgH3lwxzCL%2Bu662SBI%2B%2FhHTMl9MdUdz7Ij6%2B5%2F3f1pHWP8HM4M1H2KSJCP0uFliTF39Vm9Xvdepqv6K%2FDIdKPZBRgl4RPqXZ2YHiAKs%2BO4FRO%2F5fcm0rVZq&X-Amz-Signature=ae006c6d1623c8aebdef3f0927d5dd4b73a52666c30aac57f12a3d49bbaf6b0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CZWJL5C%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCd4LFtwW79jpDFvdc2oVwIC0c9uTDVF9%2FshMFUET8dnQIhAMiJfjkFVDbWG7jsg29zGqvQ9b7r669i%2B0t5uzMZ%2FP1BKv8DCDwQABoMNjM3NDIzMTgzODA1IgxESb0HhXcP4XvcpKAq3AOmnl6cN0%2Bjp4gNQGHxbwyARzIlq%2BjmILBURKu%2FNF1JVlc4E9BET13Qn9ugir7L%2FlE4NKia0ZsAm3bPvuL6q8iAO5Q7KpgSSGQ3ryWdWDBTGwhT%2BDZ7MYB2bCbzUP%2F%2FouNUwjvhaCwlbwuB535ZRkCLH5Tf1sERf0gxabIkw2HDDWxSAAdvnfgLRn1hH%2FXptWHkpvYBVWVtLaiFNy%2B2fNxK3d4vWB4eJDHXQqUxVYkgDPrtIszKSMm6jzt1tHGQ8hyBXe8UZ2RniYqT3agxuSs2kvQCv%2BfucO2CRYLf33IXI%2FjkxVjXZvcUqrfm18Erk7%2F50kNPkahW2LDusnDjwSVTSIUQQub7150ppDAlBSJVmn1A70aC%2B1qYisEc9WZ4SBLYnWkHBJLViUB3XGmhZ1l1UHYhFgSbHSa3H2YUi1heaSQsq6E1u4TJpfHIPNGbImEDzOYW6e7vonIZAmDI79ksG9jHSSJJ2%2BACVlyAGKx5YYiGH04uiCLNnAgcTeLvYLL%2BsxFSMuATBIkPEwOSv6QjKuQSgGg4k0h4a6xhEy%2FbGeoK%2B2KeAblopjYJKe4MJS4EENdoHEVKNYy8T1UOimJ3IqBrXhtcqq2qsZ1%2BELJWSdu2AkYzkgFCQUWiajCeya7OBjqkAWkCj3gQwmtPpnOhqHLhIQ6w5wtjne3W40aD8LBVLZCZhT3tmUhJ3Kv89biAdd%2BaO4kwYGP9wRzz9GVdI4HIjWVH41%2F4QK4wM1r1fo4DmO9CJcDK0dUJR8I4EQYMOsWqVugHA6Sy7K%2Fhby5nbj7y%2F55SHeWJk4I4lnj7R78E1vcwh3Gv5x%2B9zaaNkNFr%2BWDM%2FxJWbO9fB0mivI%2BdGqcB08Pb650h&X-Amz-Signature=f80ca32fba4577ca69f050912aada4d6548aa6332239335fa48ffa205c40d3c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CZWJL5C%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCd4LFtwW79jpDFvdc2oVwIC0c9uTDVF9%2FshMFUET8dnQIhAMiJfjkFVDbWG7jsg29zGqvQ9b7r669i%2B0t5uzMZ%2FP1BKv8DCDwQABoMNjM3NDIzMTgzODA1IgxESb0HhXcP4XvcpKAq3AOmnl6cN0%2Bjp4gNQGHxbwyARzIlq%2BjmILBURKu%2FNF1JVlc4E9BET13Qn9ugir7L%2FlE4NKia0ZsAm3bPvuL6q8iAO5Q7KpgSSGQ3ryWdWDBTGwhT%2BDZ7MYB2bCbzUP%2F%2FouNUwjvhaCwlbwuB535ZRkCLH5Tf1sERf0gxabIkw2HDDWxSAAdvnfgLRn1hH%2FXptWHkpvYBVWVtLaiFNy%2B2fNxK3d4vWB4eJDHXQqUxVYkgDPrtIszKSMm6jzt1tHGQ8hyBXe8UZ2RniYqT3agxuSs2kvQCv%2BfucO2CRYLf33IXI%2FjkxVjXZvcUqrfm18Erk7%2F50kNPkahW2LDusnDjwSVTSIUQQub7150ppDAlBSJVmn1A70aC%2B1qYisEc9WZ4SBLYnWkHBJLViUB3XGmhZ1l1UHYhFgSbHSa3H2YUi1heaSQsq6E1u4TJpfHIPNGbImEDzOYW6e7vonIZAmDI79ksG9jHSSJJ2%2BACVlyAGKx5YYiGH04uiCLNnAgcTeLvYLL%2BsxFSMuATBIkPEwOSv6QjKuQSgGg4k0h4a6xhEy%2FbGeoK%2B2KeAblopjYJKe4MJS4EENdoHEVKNYy8T1UOimJ3IqBrXhtcqq2qsZ1%2BELJWSdu2AkYzkgFCQUWiajCeya7OBjqkAWkCj3gQwmtPpnOhqHLhIQ6w5wtjne3W40aD8LBVLZCZhT3tmUhJ3Kv89biAdd%2BaO4kwYGP9wRzz9GVdI4HIjWVH41%2F4QK4wM1r1fo4DmO9CJcDK0dUJR8I4EQYMOsWqVugHA6Sy7K%2Fhby5nbj7y%2F55SHeWJk4I4lnj7R78E1vcwh3Gv5x%2B9zaaNkNFr%2BWDM%2FxJWbO9fB0mivI%2BdGqcB08Pb650h&X-Amz-Signature=aa738ed571043a4cefebfaa04f21275048c26850c4682970636eeafec6996dcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIZTOYBB%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCl02YXqhR0EqDhDuk22AkgO3Vrhl9ugL55ZJ8wtwCdGAIgCrxiQRfrPzHMikICnvJ0g7BLpm90se9Eq84QKNwHR7Eq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDCQR8srq5tyWGZO%2FxCrcAzn%2F3fT6BrQnyOlVdt1axkh8%2B7RZb%2FRwgzH%2BaYA4OMsoxDmxFZm1Y1r3eG9rVAdChzoHx2PED2KxC0GUIMakTGekKmMl%2FIzpZ82PooAv7IX2bTMXXJE8QACFpv%2BUIn5DtEkS46zAGAyPnpqHcOeEQ%2B8reHkyUI8w7%2BCCvht0EiflxMsnz1Mrx6FFvyueiOGavx%2BWDofTBokIRc%2F2RDwGWxCU%2F2r4rDitD7mHoYfG146I5LG63LctQLh3b%2Bgoz%2FGX5iitZdthzZbtdfMdg1%2FzrrnTVicCvFxKGyT%2BZ0SHYqpI1jQDR6MdQaKh8FEnMMeHsyYRcEInl3WQ0JMIB3UtBqXN0gT12s%2BU2Y2Pcivwycs%2BB82bJwXPpvRA6tVefoi9k8KnunmT5HCrBX4grleXbg6ixH%2FMuAWIJSxcQ1mH96Q5hrM27bGwQJmE%2B0VuZHM7OXHTTJIpR%2FOHWyaTh4e%2F7DEERmhWzgB6KJaUi342bq%2BRDf6TKtDbPcXdnXE9HBBf3JnA5UhscyZeh5Yd0HnLcic1wWdUr5aAApdimeIpiyNMYj7JnOim3o3nESXrhwXkUb81mmemKpt%2B%2FoTIG9N8gLZVA0PaAOCiMR4mlH%2BNffzjTgXMlgndN0JhxO%2FtMJbJrs4GOqUBkVBZ6iZfdqZCrsk4bzukCy9Il06mImBXGRqsd%2B7gw%2B5feHGQ3v2NacvZGmVKfBJMMLQ5nDfL%2FIivHOBDbTExd%2BYEZG8CNFC5AhMNA8qYHGBrPXYNYFglln%2FLQJxyTFTLWSERmYuPz6ZL1uvkTKdB9zDPYy29HjFxf0C5WytvBxkfIZzvr3Aya%2FSXbHxxK8FOaIXRIeYbnyIKz2%2BH92NNZFv7J2jx&X-Amz-Signature=78538ad7dda111049686c6a1ec9a15ef1be7596142011b21fbd6191b5e8e8d57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW3CWD5J%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDSsqvDTzp4%2FgkDiXUdfcFdn8LNnQQNJBrT7vY0c0ZXqAIhALreO9Jrdq8w2nH%2BHnk2CFHsU7roOwkPpcBi4LtiTfT7Kv8DCDwQABoMNjM3NDIzMTgzODA1Igx8aCCE7byIC%2FqHUcwq3AMFl6BqwvW%2BW4qlpwN62qb56xBXHRDCkXLz0Wc6gO56UdjMihoIGoPraP7NhC4kpTWOQ1Fyj63luTqMJUdXM6dQ5iXG8nNQ41uth4TRklGSFQtXmjLtsAY63iJS72Hf364IH8CiMFXIcEj%2Fbqd73ArAC3vS%2FP2IH%2Bk97jEG36PZTakisqU6BKrbHl8ZqQLK0HvxreyEXUQUNIvcqKcq%2FdTYLt%2FZxDfBWYwksSdygH12Vs8RI9rvqSUXPuxIdVuIVn4V9S4XOb0Hbfx15diipuuAhqDq%2FQR4%2BCnnE2NfHuyoE13D877chUND109ZuiDwxIyGndICXqOR4zzSiy1L7f58Ej2GLzbZAU0Tk%2BeDsUH0ShNT78MVxPKWKn2ARKfAVVpRgWIrJ0%2B1IAYuiybzm2Pgf6jYdLwDYgN413zL%2FeZ%2Bp2ermylFWGbRafAqjMLnoqxH486k1ZcZ8qSg7UyWxDTAAuNbMM7OX%2F6Cr5AmGUtGC6JQverJUMkRrkAOk%2FSFHjiY9naYpxIcVztpL3XwivmaxVa1zete0oUMwnsDwped%2BySn9CPDL7jZ16IuhjbSZiq7DIm5UC9m2hQMrjCv1loVrUR4aDJiGgh40bE6AD359Lum0Z%2B7LEKAfq7yuzCIya7OBjqkAaWURpLm4MEWgO4hdqutvB2ZamH2Qv0WL1AJHnOO1cNfAm3g%2FCn8Lcx8WT3S%2Bhd4n%2B7g3Y3iBElykEIdfN79LWKqvoE%2FhfwT%2B1aHWVNNOqPV6yk%2FXgCxCLzPk6pZ0IRQ4dVKVDqfX5cSsVf2yGl04BveAOYFupAzvFkBflx8wGF65ven2r%2BhS98lhpl%2BVw5DYKZpVrCh5hDID5OqkJrCa2iF4Tor&X-Amz-Signature=c11171452951ea140b209cf289b82e36bb8ab41025633fdc37efca8536e866f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPBYJYMT%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIB49J4ZF9wTuKZD355S6ts5ckvrZAySgKyOhB5XMnt23AiEArFiAseCjxW6liSUBiVIuKi51iDQYG2fJViPwjiknmAkq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDP0VUYYN09Cx3xQ8TyrcA61KszSrgxXkjPsKaK1BDJkfEmchqQ4RYEafAMWoQj70Y2OeFhAM1cU75PleFU3fWjXwaDX8H5r084t4eFICLktdXmQz8CqcQq4bOsSW3z5zSpAKpkFwDfIrWGj4ra%2F42q2ouYHo0lfoBd6gPDDFWUZdczQA6yBrCt%2BO9b6ayMOxPJuOIF1XrBB84PkQ%2FMgiVKBcamTOfakmwsj%2BqcRqII8nCh9BN6GPyiakHQ%2FmWvLBYtWED36OjQuK%2Bv4%2FJteOGDpWVAUC8KTOb3rCm3hiCXEyYarUJyfSGJTf8Vfvfx3cJSR2lRGpEg5VJAXDb12c1BIBPOwsdyLq2Bs2C8BU%2BH5ia3%2BeeU9wCdzZveOxkCoFLCc2RSj7YC0WJ4zf0r3h1GOup68LBETWp6esEIKoXB5fwXTo%2F7vWrE6aw6nSwvtRIGih1r%2FKThAwTY4bvRhg5DmqChG0%2BaD2Uf8Efy1y%2FSgLBkqDeFzuogxwgyg%2BIZIWU9VGqRr2jv1zfIbmH4R%2BGVSLF7gzAItCrcUKNMpbdoLmryKtrog8iKzJqZ4xxJeUYktLtDjohZWJWbaN58zvTjY2oytDYwUkw5HXdiq0rlUI30rcGNFI26QygkoK7cH1ygadHmV%2FrpChqVciMLbKrs4GOqUBS7iQX7Kh82%2Fl3m4xiK2MdhxmXZc2sHs5edTdWfuGcYGyM538inhRApL6X5kTma%2FBQivj%2BMF7rQIlePQ8JKotbJkAzhyMZ3evN%2BBz1NUD9iOmYeVEAlFm8sXi5aEbSmzAvlQBYIhrRCs3myFkzPRIutrAIhElAFkuOQX5jPpa4ISXbS%2FVAXr6mJD2WFwM%2FDqrDgALWGxpIc0yAohG%2BJ87hDWpZUEg&X-Amz-Signature=62414c495de0a809aa0602d973ce9fa12f992cc80b750d33d8447947a59b4d13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KZFVKW3%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIAP4h8EAf3Xc2iKUwJ1HfzWTEvxKpGGPtBUWjAsFRkQxAiBKdyhvDbVRNeFlLXs8gsJZcbUQmLAat3bSHLfCiV2w8ir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMe8zkeKMP0TA4yCE4KtwD74x%2BTOnMebcEfUL7DM4FqvGJKIX6HVqbNhQEyDdGdGvf4q4PhuXdPEISzSm12gBrU5B9g9%2B9%2FrCSgHFgKuLluCFdfUm6qNa%2BAtC9Tt3WCx7stAdIZ0AiLN8k3sbsHq1PBIwScXa1OzvOYm7cteexGHzYwXmtguBYZM6Epy36YISzOlUn591V4%2BmETBHa8cpOMppMyJZ5LSFH1RYYsjBR%2FOKMf1kIlI%2Bc5hwu55P8WPNDkZFK0uDJo9CB24FU1n0z2lxv9FKKbVyZXPZpV6%2BOVJeO94gsgIGSCU8Bv8NdvtYNTMvRogGmkiN2NBbFbPnzc0Qzh4ZKwcFgTjaUALgdjujVOdfQ7na5Sy5EQs3x7xz%2F9Gn4izocJ%2BsrJN20GXV605gaJ6gA9Y1Mh2PFb6sFHXSHuTjlBEPrbm07b46YZJpV8tjER03dOMK9DunGgzD7MAsLDeCBuP7BWEcpeEUCluKXrfxGknHB7yBKBteG%2BCg1m%2FLENuuYT70wNgjS27g%2BspvubeqIUBUgZAXHjck9LtSxWxq8tg6xru1%2F8pTG7WbAxe5rKu3VlKogkOFNMU9UoDW%2BEEvXWbEDugx8fCbO3A1Lou7fpXR3qCx8zSFiSkM0N5Ll0%2BGHE1Y7c1AwkcquzgY6pgGaoc7U%2BQgyIDXkyLHiY6fwk0nwOIXPylhqWcCnr9LwFBX9WHIr0uMiEdJgWloLvMeuI7xXlIpKxb%2BRCtmi%2FM85RRKUrqgMUvlg2xPZh%2BauC6gHAfKmEtiN6Ssu%2Bxm%2BMn1QOmKa%2Fv0rql0FwSqaCY5isDf8KjnwoZXdM7ZZ43vG%2B2h1PbkQ0AR5AcXIXjIFooArovPBTRbxiPrzK0ngGwiexThiRQQZ&X-Amz-Signature=764f56a668aa1133d1b13d43a99a1388ad4b3e1399cf194fe8ce8fb8c3253e29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KZFVKW3%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIAP4h8EAf3Xc2iKUwJ1HfzWTEvxKpGGPtBUWjAsFRkQxAiBKdyhvDbVRNeFlLXs8gsJZcbUQmLAat3bSHLfCiV2w8ir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMe8zkeKMP0TA4yCE4KtwD74x%2BTOnMebcEfUL7DM4FqvGJKIX6HVqbNhQEyDdGdGvf4q4PhuXdPEISzSm12gBrU5B9g9%2B9%2FrCSgHFgKuLluCFdfUm6qNa%2BAtC9Tt3WCx7stAdIZ0AiLN8k3sbsHq1PBIwScXa1OzvOYm7cteexGHzYwXmtguBYZM6Epy36YISzOlUn591V4%2BmETBHa8cpOMppMyJZ5LSFH1RYYsjBR%2FOKMf1kIlI%2Bc5hwu55P8WPNDkZFK0uDJo9CB24FU1n0z2lxv9FKKbVyZXPZpV6%2BOVJeO94gsgIGSCU8Bv8NdvtYNTMvRogGmkiN2NBbFbPnzc0Qzh4ZKwcFgTjaUALgdjujVOdfQ7na5Sy5EQs3x7xz%2F9Gn4izocJ%2BsrJN20GXV605gaJ6gA9Y1Mh2PFb6sFHXSHuTjlBEPrbm07b46YZJpV8tjER03dOMK9DunGgzD7MAsLDeCBuP7BWEcpeEUCluKXrfxGknHB7yBKBteG%2BCg1m%2FLENuuYT70wNgjS27g%2BspvubeqIUBUgZAXHjck9LtSxWxq8tg6xru1%2F8pTG7WbAxe5rKu3VlKogkOFNMU9UoDW%2BEEvXWbEDugx8fCbO3A1Lou7fpXR3qCx8zSFiSkM0N5Ll0%2BGHE1Y7c1AwkcquzgY6pgGaoc7U%2BQgyIDXkyLHiY6fwk0nwOIXPylhqWcCnr9LwFBX9WHIr0uMiEdJgWloLvMeuI7xXlIpKxb%2BRCtmi%2FM85RRKUrqgMUvlg2xPZh%2BauC6gHAfKmEtiN6Ssu%2Bxm%2BMn1QOmKa%2Fv0rql0FwSqaCY5isDf8KjnwoZXdM7ZZ43vG%2B2h1PbkQ0AR5AcXIXjIFooArovPBTRbxiPrzK0ngGwiexThiRQQZ&X-Amz-Signature=77473638dd218a403644715089258c80076a2f54d075fbfbe37f0af914d3ec06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JSOTYM5%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIHGtPBsBZQAVIRPafjumY%2FMeVEJsfcGArvCBJp8iNG1HAiA7T6nArkl89nSOUsi6%2FKmVB%2FTGbrQBff09FbYR%2FvTZYCr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMnPQTdUcqE6Z3aQcPKtwDQu7u%2B%2BpjxCW7lLxQ65AAWC3aJet4r6YB%2FzgZeCvJFs3kLsioAVZDvca7L4%2BOOEmdSG511kbgXu2ZGMZobXFFkH6uWuqGmByje%2Bc65n2xLNWJbUMjhSz6iMRgL9vG0r3oTWlJF5W0t968pAFTjkWu4s8ejvVWAP3P8zwsjFvXYfVNnxhMjISyUwH%2FDsKRnQc30yjRPPZaQnxBU5PtPo6NufvsuInrWnE09FDyw1zSBVstyiOZgA2E%2FwRFQRcyL8L3CZ%2BXjSI8hhz7Shhg0pXWuaJqIAppQFfIkTYFEsURz%2B%2Fz19q6n%2BeLvYEYCdody%2Ba5mAKxfB189VQ5InegH0yGaushbjC58nIefw%2B9BpeJnXBBEMKRGXQ41Mxrq640%2Brbt%2B17zdv27Wme32JTJLf4pKDNBfqmdCduin3aNQ7FtRx1W0x3VlBAbwksCiZ%2F5mZnwa2WV0DxK%2F81wcNpWoXjITa7KKlQllerUBcGrXyQWa4fs7ekuPvUgpRKoVfTb7pCtPDi9xd0j6NhgKpx%2BdJFLWoZ3233oOk%2BYuyCLvrZmzfaK%2BNvoL6AqENqJxO7Iq0rV38z6NF9EdYqFaLGbOkp4sa%2BIhVOXvSt3k1IEzYetz4qa23yGihiR9Z8LUM0wocquzgY6pgH8Sr9yNgWF%2B51gcE%2F%2FwYrbuMIWggFQdL17ez2vA6QoQW02PO1xwMAQNTSB%2B7Chm0oQwzFi9gVHWKfseNaut8YbRvUhl8OlQDk0FYfIQ%2B0M%2FCZk2NtFhM4NpUAsukfhca7cAsK%2F0uv6zyT3uognC5KCM3aFb6PzzlL3CXaZDX1vnFQv%2F5EYlJw9X8kfoeXFpou5pvXQqpJ4tT6LdzjXasJOv9KGtpoQ&X-Amz-Signature=1e897be5b967c4c3db4ffeca47244d6ef17ed7a452964a9516ea3b9f5e209e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UJYZJRF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQDvfCytllcyVc5w%2BVfTTQ%2BX1Io5bJKhhFSCeNqFfTs27gIgbSfYgBjIEYujIoPDvlgS2YI%2BtDm7PiTmVvkJQ0iAmqgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDPSb8px%2Byk2%2BOx97LyrcA4OTBPB4JsQe%2FXDAPQLHWuJ8g7PxlZ7r4I5IPS4U6p8IBH0EusGohgivcS%2BMlzHEruJtyOxIIjffyje4v9ykqJYcYtsEMlaDf9OFO5%2FAgyPZH7y2Yoazv8YSveyBqAUhRvmqeXufF%2FwY2Bb8sAu1ehmtKmSf76k2YGor5RqppB4c4hm1pypMxHpYE4l1DLItrNpVtEwtdSfKh3HEJFTZiPWsiBTZo0e8qL6QG1IfZ3yspMOLjzjSM2%2BhyIxWf8xvwkz3%2BVGLXnxUeL2LVNT10sw3DeXjxs5k%2B6W8JjBEeEuy15Fwiq5LGtuNjp%2BNlgYElCiwnAQWvik%2B4pjdp1pB1F6kz9oMODKQS0tPDsmE4KEdPU3bkC1vB0FV39fOlpBFJGEYHpLJ486MCBtggRYd1SCeeKCqtprgOQpXdeLOXErypHQha2BhQX%2F9xn3Hx8DzBv2juBq8XiKWAIeDIhkFp2VH0CjzoPtgYX285hb5Dhcly3Jy8JN3E8R22vDZ62Kw1aWAvY4%2FuV8fnoh7IPzb5kld0p94y9HLiOAUnr8KHveLcZw0SHTFcHNrhIOc4WKNZWeDITifoSNSmL6HpNgFRokLGTpQXJ57HDY1QHAi7xQEZ01t4OQuYDl8IHq9MPzIrs4GOqUB4tXd77bYM3S%2BYo7CjpTnJnOgQBrijr6Q40WnLArAVK6XvPRwl01zm8s4j5VnYYQ8TNe28XKUjO6q%2BuDoraVCYkZEM%2BZC%2FAYa%2B7dmRxtE%2BT%2B4QReQrVeoaNEdykIsukePMR%2BRTeh7Oe4kuKo25gKZ1oO759dYFuiUCMoJ2WzwBxPox5dp7M%2F%2BVU%2FIKNIPVlqhsyb%2FWtbrlNQADpVvJYSPGF5TgP5w&X-Amz-Signature=5a308a724dc7581144d10016c4693e8be0d1e05c1ea3b046d353efe130ebb96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UJYZJRF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQDvfCytllcyVc5w%2BVfTTQ%2BX1Io5bJKhhFSCeNqFfTs27gIgbSfYgBjIEYujIoPDvlgS2YI%2BtDm7PiTmVvkJQ0iAmqgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDPSb8px%2Byk2%2BOx97LyrcA4OTBPB4JsQe%2FXDAPQLHWuJ8g7PxlZ7r4I5IPS4U6p8IBH0EusGohgivcS%2BMlzHEruJtyOxIIjffyje4v9ykqJYcYtsEMlaDf9OFO5%2FAgyPZH7y2Yoazv8YSveyBqAUhRvmqeXufF%2FwY2Bb8sAu1ehmtKmSf76k2YGor5RqppB4c4hm1pypMxHpYE4l1DLItrNpVtEwtdSfKh3HEJFTZiPWsiBTZo0e8qL6QG1IfZ3yspMOLjzjSM2%2BhyIxWf8xvwkz3%2BVGLXnxUeL2LVNT10sw3DeXjxs5k%2B6W8JjBEeEuy15Fwiq5LGtuNjp%2BNlgYElCiwnAQWvik%2B4pjdp1pB1F6kz9oMODKQS0tPDsmE4KEdPU3bkC1vB0FV39fOlpBFJGEYHpLJ486MCBtggRYd1SCeeKCqtprgOQpXdeLOXErypHQha2BhQX%2F9xn3Hx8DzBv2juBq8XiKWAIeDIhkFp2VH0CjzoPtgYX285hb5Dhcly3Jy8JN3E8R22vDZ62Kw1aWAvY4%2FuV8fnoh7IPzb5kld0p94y9HLiOAUnr8KHveLcZw0SHTFcHNrhIOc4WKNZWeDITifoSNSmL6HpNgFRokLGTpQXJ57HDY1QHAi7xQEZ01t4OQuYDl8IHq9MPzIrs4GOqUB4tXd77bYM3S%2BYo7CjpTnJnOgQBrijr6Q40WnLArAVK6XvPRwl01zm8s4j5VnYYQ8TNe28XKUjO6q%2BuDoraVCYkZEM%2BZC%2FAYa%2B7dmRxtE%2BT%2B4QReQrVeoaNEdykIsukePMR%2BRTeh7Oe4kuKo25gKZ1oO759dYFuiUCMoJ2WzwBxPox5dp7M%2F%2BVU%2FIKNIPVlqhsyb%2FWtbrlNQADpVvJYSPGF5TgP5w&X-Amz-Signature=5a308a724dc7581144d10016c4693e8be0d1e05c1ea3b046d353efe130ebb96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OX6R6KQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T113748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCFE15qEKw71LDdbR5usMpH4RO0sf5NyHfDuBgfyOlVsQIhAIx5XplNHIE%2Bzy0b28agkgE6nogfT50BSoTC%2FjYUEAA7Kv8DCDwQABoMNjM3NDIzMTgzODA1Igydgfy9t7RNoWBjp9cq3ANHRpyiZztCFV9YysjzvlqJTp5WWHxAPt8j6l%2BeRZcWuC5zx%2BwE1aqHgXnPHmiJQYum%2B0%2FDn%2BValD1ztybFjwDS8MzvFqVjeIC7R%2FnVXgXe4wWkxId1wJK5vqEXv1CdFV%2ForKxSV93Zisf%2Bjnc%2FnKAbtT1BcPqP0nPrYfjc6lCmEyBVjPisA1RS9AuzwL2LNsARz11FyVup3KjFgGTz2i4f19F%2BeBdcoj4MmSb4iDuW0%2B0j9rOCAWOey3NhX95eazx5Xwx1xhHr6S7NSHt0cr99Mc65BsnNy%2BglCYuTDCdi8G9QlZmydhpfMmS6%2BzVJiE73AFwTr%2FO0HreJlJi2quC3n6YleAG0%2FY6Mhhi1p7THoBZb%2Bt5WCVdYjMNukTDV3ZkKYhFmLHFNSeqwdAxZZfHoFSf5cx%2FyjMi1txPYr0J3%2F6SyhCtGdDvinaHSFtCYAIlAp%2BVMfgIX5hxtLI9hg8HXYOuTESraBosk9d8z5%2F4c8AN3r82oTvxGMjgq4BC%2BB4n5I%2BgC9voGH65QKiDtuKodUlBD3iE5BIg4hMbPmml9%2BQFCu%2FBu2AVDA2j3U%2BoVd6bKHGGbqviJpoljGvBiM2RUrHPuxMwrJdIBgvsU9FItiSwcx7wz73WCMAgOOzCVya7OBjqkAY7CO2iGuz7yXE6ye9UfhnieKlRwN6v7glZGcYeWpXZVV3vzzWQuA%2BAFeKxJgSjzojDI9UL94r%2Bg8l0vATmxBjQ6VBSIlmZK%2BijIOzqo1KerflWnrLemEV4Vm93J8wdr0EeAxjrdqXEW%2FX00P7ZG%2BLdRHs1rkTXsvTKJXNK2OJLfcozdCliMOAgtDQKqjhHPAV1ZxD23NbmGsfrsbxKiXrIMhjpa&X-Amz-Signature=dccabeaab07b1aa1105055e92988e56ebb64323322fd194fc3d6faa612717785&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

