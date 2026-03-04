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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DZXQXUD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRPbJ966VkGTzaOQPuUPciWjdDRV%2FuGPSv73CzFPN3CAIhAJwgExNy9ZscmSDdQ%2BPR4Shn2V%2B7ImkoOJ5w6Qu1ccXyKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz6kCukFmA8WfrAUlkq3AMfe5QGvgEyPWpJ%2Bvc9RDKNA%2BREfEAFIvCkb9PJAYqqDCKIf7v%2FuYj71yYmfE3vGk6y8UOoUDBHAq0VDSCLV5Un90mECkHto71ndELbu3%2BCmgCROLAHDzhzY9gtG5jrDNkBJ3pgPoy6SqZZfXnsBRlMYaBGOUfSZsVpa2W2G71VqCnI9kxgNyStOp7gxx%2Bur4qfX8vNwB%2BGt9tqm2x2IlpK7Ae3boLdzKzQ6aZCmdASVNsjCRKJpG%2BpO%2FUwYA%2FO1qTr8lm4lbKz%2Blapiom%2BFXB%2F3cIz8Awf0lDL8h7TjFTY2yp1%2FqijLJwa2sUSRg%2BDzlj%2FF9qmftFdjNMB%2F23WLH8GcPlRdSzy1%2BzrB8u%2Ff3WwOY4Xg3r2gbE57QBbtiNRzxCbAjkVUZu3Pwv7hVIOnF7vkhVVTFQ8OCBaQ4Kb8ZYGbsB7IIUTcpxIyTnR%2BMra0eQHqXX6BPxXmXYSEf6LSpVZjdqLToV2hlD7Cz5%2FiK5m2Mhw8T3stb58D1aBM%2BxlKzUQEqRouIBVxjByiIjFJLmDqJsePPF5sGwkgeJzIDjVZjHJHr1yPlHz%2BrMQiBQb9yPLfviiHQAgQjgyqwHP4WeWUKoei%2BxIQlscdHu2t%2B9lkBeNybAIg%2B9yvHV%2FDDDrk6DNBjqkAbP%2FEFts6Yl3J4NbFU7MLoIIKL19Pd5nU5oHk37h6qb9uuJ2bglqn%2F293NPqJvu6R9%2BRUt%2Fkw3OL5IAMWuUv0MkbxFQLQeXn1PUQrDlX7jWTagcadb%2Bqwl8gGVIHW4Ddkk1a4zAIBAB8%2BlMVLpUufGMQi5DY9Dj5Ih2EXu7deEvVbjLu33aap%2BGblIw3MDQaH76pwDcG%2Fjf%2F9%2BIy124gGBPRp7nA&X-Amz-Signature=ac6c606e6c97756b4b40a83149abe09edf7de96cf938c7e4335ee2eb688c41cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DZXQXUD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRPbJ966VkGTzaOQPuUPciWjdDRV%2FuGPSv73CzFPN3CAIhAJwgExNy9ZscmSDdQ%2BPR4Shn2V%2B7ImkoOJ5w6Qu1ccXyKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz6kCukFmA8WfrAUlkq3AMfe5QGvgEyPWpJ%2Bvc9RDKNA%2BREfEAFIvCkb9PJAYqqDCKIf7v%2FuYj71yYmfE3vGk6y8UOoUDBHAq0VDSCLV5Un90mECkHto71ndELbu3%2BCmgCROLAHDzhzY9gtG5jrDNkBJ3pgPoy6SqZZfXnsBRlMYaBGOUfSZsVpa2W2G71VqCnI9kxgNyStOp7gxx%2Bur4qfX8vNwB%2BGt9tqm2x2IlpK7Ae3boLdzKzQ6aZCmdASVNsjCRKJpG%2BpO%2FUwYA%2FO1qTr8lm4lbKz%2Blapiom%2BFXB%2F3cIz8Awf0lDL8h7TjFTY2yp1%2FqijLJwa2sUSRg%2BDzlj%2FF9qmftFdjNMB%2F23WLH8GcPlRdSzy1%2BzrB8u%2Ff3WwOY4Xg3r2gbE57QBbtiNRzxCbAjkVUZu3Pwv7hVIOnF7vkhVVTFQ8OCBaQ4Kb8ZYGbsB7IIUTcpxIyTnR%2BMra0eQHqXX6BPxXmXYSEf6LSpVZjdqLToV2hlD7Cz5%2FiK5m2Mhw8T3stb58D1aBM%2BxlKzUQEqRouIBVxjByiIjFJLmDqJsePPF5sGwkgeJzIDjVZjHJHr1yPlHz%2BrMQiBQb9yPLfviiHQAgQjgyqwHP4WeWUKoei%2BxIQlscdHu2t%2B9lkBeNybAIg%2B9yvHV%2FDDDrk6DNBjqkAbP%2FEFts6Yl3J4NbFU7MLoIIKL19Pd5nU5oHk37h6qb9uuJ2bglqn%2F293NPqJvu6R9%2BRUt%2Fkw3OL5IAMWuUv0MkbxFQLQeXn1PUQrDlX7jWTagcadb%2Bqwl8gGVIHW4Ddkk1a4zAIBAB8%2BlMVLpUufGMQi5DY9Dj5Ih2EXu7deEvVbjLu33aap%2BGblIw3MDQaH76pwDcG%2Fjf%2F9%2BIy124gGBPRp7nA&X-Amz-Signature=ac6c606e6c97756b4b40a83149abe09edf7de96cf938c7e4335ee2eb688c41cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FJK7Y4Q%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDpNZOPDB%2FeigaK1fZSmmUpBCfrb5Shz6S4f3kIGKY%2F4AiEA4XGPlCp7jdq21JXEsQpIqLVF5r4u6BQlXr%2FwN9kplK4qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKqTP2A%2BPudo%2BkKXQyrcAzX1W%2FYNjigL15don7mteLAJ0e4v6Bf%2F8u9IZnnB5OSRS84LVBUMf8NupQKmx2RPA1jOOWZauNQgYGgOcZiH3DaKUuVnH5AyRYwLSVQM9KC4%2FNg5D8zb%2B7GG4yLKjzIDXygau6X7rWdHFse0Q8xuXf%2FIaroEoMZA0%2FDeS8hajfimh%2B4YkRXz9HO3YzZvRH3550%2Bp9K1b2P2LyOkfxQkQ1NFjzQz69D6i5pCG8kwB0KZ05N2E1Fhwna9e5%2FE04Aq1L6rN6EMxS%2BMKP8QK%2Bs1ZQyoHs6w0VhI2TmgwTL4VHrMFVnBi2TdCUkbEJk47GVSeL4xf5qYH2wDuGp724vk7ksADJZGSgRUGGefrXA4afwclIvq0%2FHznI035qS6d16V%2Fcg78lBijfZiNPzVyXYZAAtlHPyJ%2FV0i%2FNMRgzzJ3Z2EAZJwANdWnA7AavO6V7%2B77rRcWpON1f0q66yIE2I%2BsAwatWzNUcY10acSZhUWK%2BTyDakIGSGEsKPgPQgjvC1XYIgUgLLudNU05ngBZ8ZCDCJfdStkpypQ3rhAMurJz6dnbpMqrXekwxi88YPyOz7gHYbbvMUjEUzc%2Bttz2q6V2gsRQ0WVXk8Y8gATBUNcMKjRsyPfL1DbInhSjhbjdMMWUoM0GOqUBgHy8FM53GCeIQiTRbzpFyEGAuJ9lkev6WxMyq3JDPBn%2FBPTpSw5nK6tJAcTF6C%2FVnSITyjH%2BXdzr0ixJdDxhWBeq2XKV1aSVLKVyjYtExtrmSEXWpfP2tP0LCgzuRm4nI7hXZxPflWPxiB81O0jjRJwFzkc8CSekfmRXqnlhV8rPh71vxXEghbybTl%2F45jD0QS1t3SVS2pBAwpNCyhTYXibHIYDP&X-Amz-Signature=b283d297e3446274f068a9e3e43dc776c1bfc95e9945d68aeb84262e4f81c955&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTPO2J7R%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6iLrfsoG4gM%2B95Rx2kwg0eL4ilC7kqOUoEP6VvuoiKwIgG1hLpm8Pht2GIJ%2Bz9MY%2B9g6FM2cRkqkDpRyu0lXineQqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIs6eeK8a%2BH17eWgCircA%2BwwV6PQ4TPvBDYuO7nurVE1P0tOau6nbdUBAuAOdHuvoTiHZDvZ05q12Y8H0fos4jc%2BjeDum3xnX2X1jGWX1RIvxaSWYsKIUtYo11QO%2B1s5pgch9z8eOSlwIxjJ6iIX%2F8ul1NWUWUzbjC8aSAUxvKzacHlFVGCqd6PEmS1Ur0JVJr%2FEJB%2FEEYnRpgzDimxZUoNQCgbZ8iGVKGThsTvZhWnzxQ%2BXa2E8n3Nf30eRpSAWiebDjQrHICDqhrTwsSb8qKDYAizIY7AEUqt4vgluNKuR8uHdLhu1%2B9bq1EgoNTSftcGylBARzTLnEpgGGIfg%2ByyxoTdWMcNsctFi43ggSoOi%2B6EoCqHssgNRMgIEl%2F6T%2F2L7uEPbLvkJe4S3iPgHcbNY2gkzQ%2FE2zJcb895uYUTKySSULIo%2FZlEzaSr0W%2BZlAhnDwwWZO1xaUsEjkeQtkTSFInZNfZjTt7R3ZgxaKiQTbIZu31PAeih2DVXibmHj%2Fj6GNLSmrdiHzKRMhy0CE9kw2C5bW3Yzh3rRLozEvwIancBETdfr6656L4k9pgDIPXigQumSYd2bzzZlw0kXLmDTXXEfRms40%2Fe14XMUtZHDE%2B2dmUq7zq5%2F9xk8Qc4SsjcU6QnkER5dbe8IMJuVoM0GOqUBfzg3IWu%2FJ%2Bas7FCjj05TO2bvrcLaAPC1rVuHyMl3WzrtBwRqXFTkWSh%2FhPvhXWJ82qFGqwuqkuSXo18zSuDGEX7ZLg5mJ67xdjNq4TbS4Zwy8GIY4O7%2BGZeCpf7RjzZ2c0hNe6S3cz0vG7vcXWDzbFXl2MG4DiPHh0AGKEFw06V8Ll7U3CUsDmIf%2Fr%2F53YeMweKT0gnCh09Pyk3tU2V1FR%2FAi0xo&X-Amz-Signature=76810d1c16e3d4a69b4cc64acb690997b61b3b68e4a07ad8bd1ff7851634ec19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTPO2J7R%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6iLrfsoG4gM%2B95Rx2kwg0eL4ilC7kqOUoEP6VvuoiKwIgG1hLpm8Pht2GIJ%2Bz9MY%2B9g6FM2cRkqkDpRyu0lXineQqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIs6eeK8a%2BH17eWgCircA%2BwwV6PQ4TPvBDYuO7nurVE1P0tOau6nbdUBAuAOdHuvoTiHZDvZ05q12Y8H0fos4jc%2BjeDum3xnX2X1jGWX1RIvxaSWYsKIUtYo11QO%2B1s5pgch9z8eOSlwIxjJ6iIX%2F8ul1NWUWUzbjC8aSAUxvKzacHlFVGCqd6PEmS1Ur0JVJr%2FEJB%2FEEYnRpgzDimxZUoNQCgbZ8iGVKGThsTvZhWnzxQ%2BXa2E8n3Nf30eRpSAWiebDjQrHICDqhrTwsSb8qKDYAizIY7AEUqt4vgluNKuR8uHdLhu1%2B9bq1EgoNTSftcGylBARzTLnEpgGGIfg%2ByyxoTdWMcNsctFi43ggSoOi%2B6EoCqHssgNRMgIEl%2F6T%2F2L7uEPbLvkJe4S3iPgHcbNY2gkzQ%2FE2zJcb895uYUTKySSULIo%2FZlEzaSr0W%2BZlAhnDwwWZO1xaUsEjkeQtkTSFInZNfZjTt7R3ZgxaKiQTbIZu31PAeih2DVXibmHj%2Fj6GNLSmrdiHzKRMhy0CE9kw2C5bW3Yzh3rRLozEvwIancBETdfr6656L4k9pgDIPXigQumSYd2bzzZlw0kXLmDTXXEfRms40%2Fe14XMUtZHDE%2B2dmUq7zq5%2F9xk8Qc4SsjcU6QnkER5dbe8IMJuVoM0GOqUBfzg3IWu%2FJ%2Bas7FCjj05TO2bvrcLaAPC1rVuHyMl3WzrtBwRqXFTkWSh%2FhPvhXWJ82qFGqwuqkuSXo18zSuDGEX7ZLg5mJ67xdjNq4TbS4Zwy8GIY4O7%2BGZeCpf7RjzZ2c0hNe6S3cz0vG7vcXWDzbFXl2MG4DiPHh0AGKEFw06V8Ll7U3CUsDmIf%2Fr%2F53YeMweKT0gnCh09Pyk3tU2V1FR%2FAi0xo&X-Amz-Signature=51de296d82f135638073269b469a9da34dea1e37abc1b955036dd6f592a9586a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQWIKYMN%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCAk%2BjoVR5gfJW8nboMUtZhBwpSPESTON7dFZp%2BjvTphAIhALZAbU34K%2FlvS3Jz6xSw%2BGdWK3UZFX1BE7KvhzR1zF35KogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyZzifcsAGw3Av2XIUq3APyUKkKPn3P9wmgrwBSubk9zPkPcsSwAGmHYJpwgoxqZkKnuDye8sCU5Qq3XkmCuUxWJku2X4Bc1gI9BJQ9VFT1XVGGk9WKsyd78Fv8hC%2FUNnGGqc%2FzZ7ed5w15mUp9%2B3mLjQXaVY7ZieyJzQKV8ghV%2FkuiKiJg1CvOnUG5cP3Hvj97NwJGRjsag3g%2FH6NXCHwwgtC%2FtrKeq3rFxWoWx6KaljLPb3srr9uWqx%2BK35fHimlfGce%2FUmvxrtTT5DF8L%2FLJlxycEB3bFBVyShk8Pd6lP0ju48xa0LYR%2BuW%2FIcAonybo6s0W81gZa3O8t4227UMhBDVFXG0ncbq87Y7wsQaYJqt0n2IQm0NGkGagm0cP7d4qZEuzf7oxLn0vzql7NOt0MtcNDPm6DRI7pr6yu8x20jbUYLVDHNU%2B3UuXSDP7Z93nXZ6%2BX0bg33kQkqdvLD%2FNbUL%2F2s%2F5N87vG8xvoWSG%2FyjFhnAR%2FpwQkE2KQ3ImuSASM8JqorJK8lruAI4HsfuUvwMStY7KcuS6%2FIy29DKDiQuILfs53VrMOoqfM9Z0pTZVo7IkkOjI1m1bExaxJH%2FskGxmTLew%2FPBotVbZ7lB3wBswialIvqQ%2FKRtiux%2F5x6pzc4%2BrR4HnjllHuDCqk6DNBjqkAb3H3O%2B1kaFIH3MiyHxeQXjkCcPnc3ejhttaSZzd8TXpdnsf68Ngt5I8wS9UuH36hYCmfVZDgEC2nRL9roTXE7JOzxM97O2cewJXmtyZpaylPYaWm5Jlr%2B9F8dRW8slPxDMYzOsYXAQXZy3UhbomNxizl9zeP1pyDYrXQ4sJfIDWUj9vw2IIdHHJAwnCiIjmDBI%2Bgv4soJ5rzI6839KUHLZj3PPv&X-Amz-Signature=494c250b5b6134ca72bd130277b22cc89ccf3453186af1ad11a6642721f04bfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GXXOHEU%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgILt6367btRZjUSvEVwiz0z%2F5hvKC3yIwCQx6Yf2kdAIhAJCdgaKetUzYodBOcAPdm5w%2B1cIaeFoamqoFjPa7wcI3KogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyFS0EC4eR0urg6f98q3AMHiyh8mMY4JWQFCuJAGAicVZK%2F%2BQIeueG7rVIT0gD3P9eKI%2FX8DG5irtoMrDe2rkX%2BHkNruCwhQrs75Wh0CfFM1ZzQnBywfvEGOMqXJ7D5wZHFugy6%2F336oK6yNZuaVR5B4P%2BR38iWcwP5bql2nRp2yJe%2Baw4Qwqo6qVh%2BmEegv1dmd6E%2BIHN21Tl7ui%2Fl%2FF5SC%2Bxfx86DqNx3YOR9L4G4zedmrLXPwFXfxXdVUsQluVUWTwdFRxC9HJSZTct6D4UWnf%2FGpfNVEr2mRW6J%2BYs8EkU%2B6Xp36yqddXhkp6LSqawLnlnNF5r1kDYg6W%2Fh9zLFVFM5hmZgb%2BNbUpzN5HG48CL2CX6LO94149IihfADD1No3VVliV5ZugTDzTNrA98EkLX7vqqlwB9RCHtEX%2FpW03p10JmmDqPorbGfSBf9qGWc6HyWPH1jYHA7dxizOgydFVbmRaUwvABeMuUIlmwzlOkCiPPYr%2FLlu1dR%2BV%2F8%2FDw7IWpws3AN1f2dha%2B5Em7tpe%2FmK0jjjw6Cj%2FzlVqWJvxcBC19wepkuSorDvr486lnte4OeLmUrbQrdyaipCgqHZMVD1PYhEhjjiua9cfCbb0wq%2B49UuH5UJocDRXAQYkxC6SZgFGAAM2Vh0TD%2FlKDNBjqkAQ2PJRFp9xV%2Btr1MoAFKjNmrdk8Cgek0c0B4yvgb48OjGzSd4sgRE7c5PHfhz3fYIjQWdvdNGT23K9e1jMcp4KX%2BCDN9kRQKjzNq5LNCJNuh4qORIfyQTTfZ0nOzm%2BLTbB4moKcqjgqWHOR9TxIMG8Yd9Iw2vOMqxrqaQ%2FHq2qrxCzL5zU0mj5f%2FZuLzGryi9QVNUN4nb94DioFc3wsLYOFIfFu8&X-Amz-Signature=482747c5f061876903c04f53c62ec3a0f3c2b844eb2c9d374d8021a3b7749f7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWURB2GA%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2H3cX4UX5iK9bzf49woHgASUGXfxCbZLdvuQjLfT6yAiAxaDWUb6%2Fm6s8VQH3gG03vFBnaKb9CJOXF87PornGAkSqIBAi0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdyHsiztXHH%2BA%2F8%2BIKtwDTO7zY6gv6vakXHR2%2Bvh40fQl2QEWnj%2F38LfQMxRlzP1V13rWfN2ihU9j0BF%2FsbDJ9DgJXTQ4fdlkk4uYwWqqw92Tg0cFyHWk9DNwI%2BS88UCLgeMCzer7fol0h5Y0Q6n%2FAnd7w3k1NHx%2FzdY3Lm6hfoPbVPV1E%2BPFwhhBPHMhH9WcMJ6YoEAjsVmgnQyx236xrI1o0WU635tIPlK6CxtQzDCBrVFiSQp96cYmFldVpYNp3nUTjjE2T%2FNKlvIGPrttSFNvTagSJ%2FoWMNtFQFCq0737KG8TM6cC%2FkxYaeU6FfbAAQG19zSuBhP7vHDVSHq2hJOmdCI2fPTKEH1qj2ge%2BLbN0QjdvmQApYCKZeu1yh%2Fw9QUGL%2Frit1BqgcKC4yMCC7OBbijkPwI4zzxoj7lrWjMV8nP2OTYSqniwkMR0nOXvPXdhn1xpwirU3tSSP0ppmcZl2D7jkzgCuMPayJLZY2w9qgMSbMWqUOqRyImJN7W5gmApC6lnCYv4byz2vMuqqHaUdAIxbtNSXy66SJ06kA0Yv%2BvYbuowpgcroFfC7CzGbemBVrAgP3j51cUPou%2Fk7HlnN4fx7pLtnLT3DbUCY6gl7YYsHanICZdRShQ8JbeLm11%2Bv%2BmL79pfU8gw25OgzQY6pgHSVj2782rNUJ468Z7yV7exZdZnXR9aO7J6IcEc%2F2llSKwvjFaFVkSuldA56pQOK8EKO4XQN%2Fvo%2F4l5a4eYtY00XzWnvPB8s1wokrskQkLzgwwkpc7qD0U%2BCcqDRuWPbMOxF%2BvSh0XaZUTgXo9li6O0FUp5mWyScMsF2%2BqliMGg6AE5vSAnwFLfblR9VO26Vg%2FqN7Oqu1XpfIKQoYqTmWium7EnZqY4&X-Amz-Signature=43e10c40774097008fcd0ffc39755ae5a1e2b0d7d1c40a6999abb8d9ed03af71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVBUZSBR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHsDKWbnLNZjlkq%2B0YyWoWS%2BD90OXOEoDYi3dnLVPIzvAiEAtUXEOP3uZ1eoW%2BEGAa6c0jLzNAO2O5YwRkguG3ojJuQqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGEUruGahE3tAMhw1SrcA8Ky%2FzAHAY8YoUQY8GHwySNXKlc4FJ5hjs0b3zrjNEB%2BuSN81z8%2BCGXRXLMMx6yd0nNJ%2Fj0NHp02o%2F%2BZOoZAkp7vTSqddo5KPqld%2F0N37n%2BtzRG3mEKno8lQxidvnb%2FYWvWV4ezEUIMclygS5YnKGvPEgXklXINWFeKCRDw6yN9I%2BQdMfTHLjeZYinCcUQKRJW8z4UrmInl0DgA6mexo5hdW%2BPdtemp79J4p0ULu21oFOS3toGdQZT6JYeB6HYxq7IDJSVo1q0varfxA9tc%2BZ4den7WTemgAYrl5ikQTZVK73KRA66608qklVmCiyyLxMEySZBll%2FtqFIbX4UAdq%2FclngAOxVKeerr9Pvp0tNdnVlcUgV5cP6yndnqUgjpvT%2Bvsf6m%2FO5ZSOavHgyMOzPp9ESgWKWVsHHa%2BQkLS9rMyRSCiu0FNjM9NAIqx%2F1YmQwWo28eDNrILVy2%2F4sPjgKCx1V%2Fq%2FNdkzjwnCt4QE3miNy1jr4ZuXoPOqoiJJkLy17AaeJXxADCHby6%2BwDYvA6fJWS0UKZFI5IqS2J1DVYX6ivH8GcET1Vb8ZztRVJajIfJVRuHmKb3ilAQzDGfopyqKKx2pOTwMHcZcOiEjTg71dBzxPaWxNcw4qzVGwMKKToM0GOqUBJXxCCcKYQiKuRj%2B0CdoWx3nCKDe6C2WXCOnCM9I6sQupbyKVkTudtmdB%2BFSUZqW8QtoUWtYEvIqKlWzg582L4YBa5xWKUzSp%2BfB2pOGsS9OMo2s7%2F5igPCH%2FZm6xBpsUJVl794oL3B2NXdt4cobVF8PE%2FxVcFv5RlTzhmizBzFzhZAz89daFMoQQ9W1WTi4Xo5vmiWaGLILJkIc8GAjFr%2FBDf96Q&X-Amz-Signature=e9a8bad2f9c75f2ec82c9a40a52c3c1d10740ed5d0de16f9f5a685ab17b7075b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVBUZSBR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHsDKWbnLNZjlkq%2B0YyWoWS%2BD90OXOEoDYi3dnLVPIzvAiEAtUXEOP3uZ1eoW%2BEGAa6c0jLzNAO2O5YwRkguG3ojJuQqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGEUruGahE3tAMhw1SrcA8Ky%2FzAHAY8YoUQY8GHwySNXKlc4FJ5hjs0b3zrjNEB%2BuSN81z8%2BCGXRXLMMx6yd0nNJ%2Fj0NHp02o%2F%2BZOoZAkp7vTSqddo5KPqld%2F0N37n%2BtzRG3mEKno8lQxidvnb%2FYWvWV4ezEUIMclygS5YnKGvPEgXklXINWFeKCRDw6yN9I%2BQdMfTHLjeZYinCcUQKRJW8z4UrmInl0DgA6mexo5hdW%2BPdtemp79J4p0ULu21oFOS3toGdQZT6JYeB6HYxq7IDJSVo1q0varfxA9tc%2BZ4den7WTemgAYrl5ikQTZVK73KRA66608qklVmCiyyLxMEySZBll%2FtqFIbX4UAdq%2FclngAOxVKeerr9Pvp0tNdnVlcUgV5cP6yndnqUgjpvT%2Bvsf6m%2FO5ZSOavHgyMOzPp9ESgWKWVsHHa%2BQkLS9rMyRSCiu0FNjM9NAIqx%2F1YmQwWo28eDNrILVy2%2F4sPjgKCx1V%2Fq%2FNdkzjwnCt4QE3miNy1jr4ZuXoPOqoiJJkLy17AaeJXxADCHby6%2BwDYvA6fJWS0UKZFI5IqS2J1DVYX6ivH8GcET1Vb8ZztRVJajIfJVRuHmKb3ilAQzDGfopyqKKx2pOTwMHcZcOiEjTg71dBzxPaWxNcw4qzVGwMKKToM0GOqUBJXxCCcKYQiKuRj%2B0CdoWx3nCKDe6C2WXCOnCM9I6sQupbyKVkTudtmdB%2BFSUZqW8QtoUWtYEvIqKlWzg582L4YBa5xWKUzSp%2BfB2pOGsS9OMo2s7%2F5igPCH%2FZm6xBpsUJVl794oL3B2NXdt4cobVF8PE%2FxVcFv5RlTzhmizBzFzhZAz89daFMoQQ9W1WTi4Xo5vmiWaGLILJkIc8GAjFr%2FBDf96Q&X-Amz-Signature=f07001058584d6c22a38a0f109c0a0c5f31fa9f612d14ea7040825cd2bda335c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466342C37LP%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2Bo6H%2FhlQOdYwSGE01Sjuagb9lPw7U70ZPOZ1yp3eqGgIhAP7%2FKA1EjWhVUbKC1IJa1x4abyZJ1K25KZhzZsLPhHAxKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzLAOBK5zZxhy8oGD4q3AN3s9vJ1LjMgLZlCEZry6mFAGk9NoqhftunYXt4xC9y85luetBbEHqDHMbuqkuBhlDOwC4HgHcsb7hzqFN2a0glylVzEgRDDDT4C93XtUvhIb5z7pB8zN8%2BOuT45PKBTgQXCfF%2BbVLRXHrHyGOFqZEcbq%2FkmJ%2BIGoQ60OjeLjegD9JdidXq0Pav00PwRKbhLRkaIt5QGm9EP31zfEciblvLvIpXbxIH9ZBVBRIm4QF%2BuB70noS6erGDf9OGp%2Be38Mp3VkCnpnC3MwqOoJDVC7QLojmjrVb4WWSnUxqMeXID86Jah4nyEnY2KWlmcP79U%2FNe%2BTY2yIlYPEoJbulHDp7HtrMsCWrgl19l6GT%2BEBXBKYyr%2BwKHFCi%2B7boXsMkE4orN%2FlhUUQpMiuPiPC6etBeCF70hM4fgpCoMA54cbD37asCbYuXtsCydq%2B3fjDW6Q88FhIDqd66iczgjh0HIElzSIlDPBWZYd%2FLSQWb8D1Fqon42UN8rFFXp5SoUBK33RdVcgEiaXUoSBWQkuyzOE8K9j%2FDMFx%2FcBKlzd3ocgL%2BpwuON7%2BF4vtzcV8F5AB3meCAu4B6Lp8QYIRjQpaEi8F0g6%2FxeeJl9cSP8Ld1f%2FKua13uGS%2BFu9%2BdKbBkpfTDqlKDNBjqkAd6kXfgt%2FqAZxfhVfkuI86cAapGJb0fXRN21LohAqd4UVG7jhgo8A29D1WoA%2F04ZL50emSAgFcs6YBBg%2BokUtPhMINPAGGN4WH5dghxgefXHnJihUHSW9kOwZuPTXPXAwM80sSwTPCNmiYPTWt1Qvj7PrLVu%2BL3cn1LD2yr%2Fk8mNMDuiNFrmV87ywIi%2FbSc0d%2BGPK2kUst5D8RcNYQj0FXzAsxz1&X-Amz-Signature=530087e8fa1a91a9e14b45030971a838a8dc4764af9ef347872da51dac7a0611&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUVYZWD6%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCorCa3n0hzhyuSxAEiu7eRNxnFYQ8uu2D7cwi0qmEecgIgREECceDJdCFaG1%2FrZ%2BCJPhtPJ%2F8ymS2qKErhfssfiA8qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL8gj3AJ8Ev9iiHN6CrcA5s790y4hBcoi7OpgXpb7RTdbbY43nV47tb8tIYMV2YJqzvXETazN2ICDmu3R%2Fpbx3rFf%2BryzpYwh4x1nxTy6jUozOWinl5WWwBoVjpvZvrtXDQccsqc78563doqg6h70tJsFUd0hVtA4YF%2Bwfuu3xXkGJKEJfn%2Bmf8%2Bv5jS3kFj2MJoLu0n8upyCdYIr%2FVUU6wXOZJS5A%2F9NUEKk%2BS8Q8jtbq5EsH%2Fi%2B%2FeaNqQ7EGMNWE9MbqFXJa%2F0ggoH1MP4DrGsYQntW55i%2FaRIwxpy%2BOcG4KwF%2BLquCwa4kFjU1AkORQU7F%2BcUTwAau2ND%2BTC8rMVy7gAyl%2BmTN68OeXOq72khV8SgPsPqxRbzAbQcsnsJwa6K7A4N9vnmzKkDQAkf7sljmTOEJk0QBYMqc1x%2FKbftbFoBf9%2BIIOagaPHrIm1kn3qzPZul5%2FiuVUycktfzmVL%2BXD2VilCtSQB0m0ebHSiVUHjQsZObe9ilGJ742tRe2AQzhhtjufI8HuEhQ3iuC11acLLbytCEoWWGzo475SMilZJFrHZlDzHSiLgvWPSk0DuQ77Tk0aku4jvJBYrxogilxwk3czR2Dapey8OJ1den145lPXfjqNpSgQ1lfp3ENaArkjIrKJy6XQruMKOToM0GOqUBfVmpt%2FrZmpVAS6gzNila8uEXsTKcAqLkogTLC6KPca3bEVF6i78etUup4yxMeyT6s2YA22WVLnSSPhUl5%2FK1pT6N76QbyfovSjtj25IxDsgYvle1S%2BamFvQxlU44RF9HuB4q%2FpNgCmpgBjeSWAqRMtiEZrMhED362m3Y0IS811MGeuclL%2FZ%2BiZKb%2BYdb7U24KK9Txp%2BKDQ9A%2BfLG62Tck1dHgkX6&X-Amz-Signature=1c490e8affb527d7d395c1b23f23459642e4a155c09e385db7cf9935e8833fa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUVYZWD6%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCorCa3n0hzhyuSxAEiu7eRNxnFYQ8uu2D7cwi0qmEecgIgREECceDJdCFaG1%2FrZ%2BCJPhtPJ%2F8ymS2qKErhfssfiA8qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL8gj3AJ8Ev9iiHN6CrcA5s790y4hBcoi7OpgXpb7RTdbbY43nV47tb8tIYMV2YJqzvXETazN2ICDmu3R%2Fpbx3rFf%2BryzpYwh4x1nxTy6jUozOWinl5WWwBoVjpvZvrtXDQccsqc78563doqg6h70tJsFUd0hVtA4YF%2Bwfuu3xXkGJKEJfn%2Bmf8%2Bv5jS3kFj2MJoLu0n8upyCdYIr%2FVUU6wXOZJS5A%2F9NUEKk%2BS8Q8jtbq5EsH%2Fi%2B%2FeaNqQ7EGMNWE9MbqFXJa%2F0ggoH1MP4DrGsYQntW55i%2FaRIwxpy%2BOcG4KwF%2BLquCwa4kFjU1AkORQU7F%2BcUTwAau2ND%2BTC8rMVy7gAyl%2BmTN68OeXOq72khV8SgPsPqxRbzAbQcsnsJwa6K7A4N9vnmzKkDQAkf7sljmTOEJk0QBYMqc1x%2FKbftbFoBf9%2BIIOagaPHrIm1kn3qzPZul5%2FiuVUycktfzmVL%2BXD2VilCtSQB0m0ebHSiVUHjQsZObe9ilGJ742tRe2AQzhhtjufI8HuEhQ3iuC11acLLbytCEoWWGzo475SMilZJFrHZlDzHSiLgvWPSk0DuQ77Tk0aku4jvJBYrxogilxwk3czR2Dapey8OJ1den145lPXfjqNpSgQ1lfp3ENaArkjIrKJy6XQruMKOToM0GOqUBfVmpt%2FrZmpVAS6gzNila8uEXsTKcAqLkogTLC6KPca3bEVF6i78etUup4yxMeyT6s2YA22WVLnSSPhUl5%2FK1pT6N76QbyfovSjtj25IxDsgYvle1S%2BamFvQxlU44RF9HuB4q%2FpNgCmpgBjeSWAqRMtiEZrMhED362m3Y0IS811MGeuclL%2FZ%2BiZKb%2BYdb7U24KK9Txp%2BKDQ9A%2BfLG62Tck1dHgkX6&X-Amz-Signature=1c490e8affb527d7d395c1b23f23459642e4a155c09e385db7cf9935e8833fa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666ARJ3ST%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T111954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDUNOEz2fRBXtlht2IcK7w5LJEKxgbx72c6jwlO52a2hAiEA9EN7NqJanREKjGI2K584Kkds%2B6zL7Cxo2xwQX4%2FZFdEqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBg9cgr4ooQ6fVedCircA%2Bm8X2ybleqoBh5147S4RS7JYqIGDFJ0p5XUrJH%2Br8pb8QdwEt86%2B7wRVjansdclB3AOV6Lg0piCbW8I0m31Nsa%2FgvqweLSagvqDuzzybB01IAUoAIp3jX0dZqVHRpoQhO0QqAVKMtc%2B%2FnX4wJOVvVGx52uiKjpkGiCha5cn1YyxVFe2jYHBFef4XdJmfyo5kG4BcX0NqxQzt6OkqNQqyqJ64QyAQUYb19UzPOKmOtHTbhy3vwXHQa32tLmNBu%2FqmERiHp6rfwAW3E7%2FDx37hgmNJxRDZTt13ngwu5mjFIPIZFQfBITnZ2VoHSRLthV2r5xhnsNVIPnY8P6ak1wHAeIQ4M0dkKTNsiqZ2RBGzIIa82VTn7NiYqqfc9SNw4kWMelN28MtKCP8V2Te505ygmLp0zr9Ki6AqnSdvQv5lLDy7ch8ukgCADbFn%2B4fBSbfwEvsvOMn6Bba%2BOgoEzwTzLFYz99wQZnAMqQcmHTkPuvRVkBJcFH3XTQNwZHXaFyNO7EOcWiUX%2BZzx3Ns%2BwDsd2p4OWUIrvESBGak18gnfzzyW03YJOAHk17n2pFMnNvQVHPpvi3JPeV3jwUZqiZk1jum7DPrgBzdHFNH%2BrvpeOq3mUgZL7Aau8BiFybHMP6UoM0GOqUBc1tGUOHHis8ZzOQMRsIzu5yXFpMzflb3vKK%2BBusbGHmw%2BS%2F1AGc3VQjiNLG3wX1vmB6x2zU7Z%2FN1NMFvjZH38nn5IyIzZRA7icge0mf%2Fwy%2Fu7Kwo00KIhIJI3EHk8t9f2XomgLh5dqXJA0wDIZU3xNMwLvku4QzsD5UglcuTkakLO%2FGND3PK9nrEuW3rFZofI12lMS0pCY9ZQ64SppkTThfhseQy&X-Amz-Signature=49be109de6c5e8b77bd1945231b87632ee6b04327dfdabcd95536d4c0eb6872e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

