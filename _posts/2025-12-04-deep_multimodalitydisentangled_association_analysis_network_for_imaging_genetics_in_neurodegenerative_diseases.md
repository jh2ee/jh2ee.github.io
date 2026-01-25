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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WK5RV2VY%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDzTSApiC2dJXbUTQtlm9EpesgUhuAIvquGVRaYMQUkWwIhAKEii3lhfetQ1IJJqdky%2FXSgyegFCL0t0LDy7AEEU%2B78Kv8DCCMQABoMNjM3NDIzMTgzODA1Igy6l0I6dSmMtRvCmcAq3ANUBCV7Kchpv25sRrG99qMTIDpQeT%2BNN%2BFUP9n83%2B4lzVFww6ZuAjjFTuketSWW9ZoL4iUOTTlxcFkAYa%2F43Sz7TVlHwf8wpgimcvT07BJ5gwBjR0NzO3FkUEKsh2tYslMHTlO%2B%2Bs0E5nkPEH1xPDS8GPKfeFHN8ZglLsExMQB23s56C%2BQmzwhX4BlpUf1fReHz3o2ogyrc0k8TbHkcrGxnbpgyjrLBFtNW4rHogDF2uxrUdtdeH%2BTmAG3ZJndYGeOaECk5NbGwOJu%2BF%2FVENOm8oLy5WgKopUbOLrHvgqW1DRwjBIh1frc2gnJBgtV4eSf0%2F%2BQrUPy9W0XroNFmCQqNZF4wUMBuHhTuGoBdKTN4i7HvenAVkvV47CKAOp2EGGKSwbKoaWJqhWqKMagTerG3DdsaZ%2FdUlbPGUrT%2FNG3L7alfIZfpUK5FTEO4k0QE405liDtM841oSoBK8WMJYng%2B%2BSgzy92NS%2FFrJsrtroYcKWb9oY2oPa8oyk6XakHZYrzXZXltzby1vA9SAujo3BN4hUjzenpnD9yLBCdPcfetDrvcCFlqQ3Xb7633TUJ8LNGjKPdfheXwWTVzmI8j3BfFv3ywsUDAoJ%2BkOQjg4ndJYwIHuXoCVCPIDCo5QDC1ydfLBjqkAQxFIgDWb5nx880B3L%2BMHdViiK1oY%2B%2BzFeo6vIDb35jQGNBoiNHORWstOKrMuBHDrY%2FVotSCJ%2FJ9Hzc%2FmNzYcu4PwshH4vW0R6CtAkXq3ja%2FlokCkA%2Bm371iscOddAYBgaJr6o9wmerN1rZYi7MBf6Vsaa0T%2BQzxZFqdF8ckiSqLnbrC6YB8TKP%2FyH%2Fh0MA1Bp5uzRXfI%2B0ZIDuaOOxruDweWwYM&X-Amz-Signature=9c7554e1541a43303b0ed0e6c7fef0c5fcf90ee7e2eee47ac8b637e4ec93d00f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WK5RV2VY%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDzTSApiC2dJXbUTQtlm9EpesgUhuAIvquGVRaYMQUkWwIhAKEii3lhfetQ1IJJqdky%2FXSgyegFCL0t0LDy7AEEU%2B78Kv8DCCMQABoMNjM3NDIzMTgzODA1Igy6l0I6dSmMtRvCmcAq3ANUBCV7Kchpv25sRrG99qMTIDpQeT%2BNN%2BFUP9n83%2B4lzVFww6ZuAjjFTuketSWW9ZoL4iUOTTlxcFkAYa%2F43Sz7TVlHwf8wpgimcvT07BJ5gwBjR0NzO3FkUEKsh2tYslMHTlO%2B%2Bs0E5nkPEH1xPDS8GPKfeFHN8ZglLsExMQB23s56C%2BQmzwhX4BlpUf1fReHz3o2ogyrc0k8TbHkcrGxnbpgyjrLBFtNW4rHogDF2uxrUdtdeH%2BTmAG3ZJndYGeOaECk5NbGwOJu%2BF%2FVENOm8oLy5WgKopUbOLrHvgqW1DRwjBIh1frc2gnJBgtV4eSf0%2F%2BQrUPy9W0XroNFmCQqNZF4wUMBuHhTuGoBdKTN4i7HvenAVkvV47CKAOp2EGGKSwbKoaWJqhWqKMagTerG3DdsaZ%2FdUlbPGUrT%2FNG3L7alfIZfpUK5FTEO4k0QE405liDtM841oSoBK8WMJYng%2B%2BSgzy92NS%2FFrJsrtroYcKWb9oY2oPa8oyk6XakHZYrzXZXltzby1vA9SAujo3BN4hUjzenpnD9yLBCdPcfetDrvcCFlqQ3Xb7633TUJ8LNGjKPdfheXwWTVzmI8j3BfFv3ywsUDAoJ%2BkOQjg4ndJYwIHuXoCVCPIDCo5QDC1ydfLBjqkAQxFIgDWb5nx880B3L%2BMHdViiK1oY%2B%2BzFeo6vIDb35jQGNBoiNHORWstOKrMuBHDrY%2FVotSCJ%2FJ9Hzc%2FmNzYcu4PwshH4vW0R6CtAkXq3ja%2FlokCkA%2Bm371iscOddAYBgaJr6o9wmerN1rZYi7MBf6Vsaa0T%2BQzxZFqdF8ckiSqLnbrC6YB8TKP%2FyH%2Fh0MA1Bp5uzRXfI%2B0ZIDuaOOxruDweWwYM&X-Amz-Signature=9c7554e1541a43303b0ed0e6c7fef0c5fcf90ee7e2eee47ac8b637e4ec93d00f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGDGZNCA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCykRI0Us3mtZqakH77kUiqx82yGaQoizFGvZTul0dHegIhAO6IDv7pEHfIZUTI%2FQ3GH2RB%2B7DrHV1UzSWxQgGibFkhKv8DCCMQABoMNjM3NDIzMTgzODA1IgwPbGk2eC%2FjhV0KNJsq3AMtCVfbkm4%2BavkZ8cVHgruL2yjTWLZhYN1O4cLaUHLXkdoSrZQHGrBgwzB9M%2FqHWKYMwNkmflf2xsbeZOf1flmsPIXIM8hBvaA7G8I8MPDU7cNWnL8IuHNu0pEO6PXmvq2M1w5nBZ2Wx7A5VUvhwYbxiUgB553OE%2FW674GRsg2jEhEAO6za4J%2F3LCPCOqWCriwgYoqUcSEjJmpmWzb%2F4cGTjkINyCtJ%2Fxtcf4GA8s00eDWkfoCgjX6rkpE%2BAKNFuZD8r6vOqkfhqAooDyxTGD7ug6uXurSbjNMA1dqMrUBWTG1wpb%2B9BI9r3LsGkqqHeGIQKQl0T5ydXDE%2BBUutGP8qyvGphVl1zQnsQJus6OZrwcQYPdgL0CzyOUWQ71hlRb55Li3IY87h%2FMIbpOryPeQofmdOCrrfAR6tVRu13ZuFs17ri6iTlndSlY8jXEP76qpVFI8fGxkfipfSqijZYNZZzrnCAmHbzpBeLjYZmLmWUyih7gnE4rQoEEaH%2FLz7Pd%2BSuwuHllF5zzjIqgREvBX28bdHbwBukAHZkMoqPfCJyiBl5bo%2Fl0K3YOGyNDeIzEctyjYTF0a%2FxY2pPzIJzSVXT7E36EHkwSqLW%2BXIqdQREVe44Da2AScCK8dpoTCXydfLBjqkAUMxQCJ2k9KtHL3JZYl1ifD9nzCq1TbBc%2FwZ8mO%2BhfunDgVi1uzOxvw1k2M9Pd%2FYwjgu7Z4g8eA6nz6dH6N9dJGx6pMwGZs6pBdrnJaqiNnqflNo%2B32zkzqhmN5axKENrig6OLg7Y%2FhXKT0stuoCbbGY20UHyItWQs9as8FTcftA74yp%2Be0heAw3ntJyKo11ASInl2M70xBM1muA6e1ibtZ3aKKm&X-Amz-Signature=206b8b369e0197fb36d9a8f13c46184b44a610ce8f5b031271ce81d264b97ee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMDIXNDO%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHBgeNanEhChBgcqqRaXRklA8ayCg3O9QXCIml%2FbDDGbAiBzlKw2ZLPKvKP5u7NB2vtR9%2BSPx70eE5s9k4JaZpXwVCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMd9OqN%2FdV7Tn7FqY4KtwD2vIXT%2BxImTna0Msmz2rRABsVelK3zNmXEI%2FCzTld1IPyo2RlOHKa9P%2BeUpKfeTH3eanXxlHelxr7zHFzYMInbIxrlZkhY07ZtgD1qyPogQFi%2Bm6O3MyU7LtsCbL2IgYDYosbG4QWF3BNE5ZNA0KKGugzXXRKMS7qu9AEd3crq8fNXp9qmsKwYJrAxPkV7b4D8mf%2FdzvZpnFC2zQq2j7ex%2Bv%2BgnI1g8K8lBHzdmK6YV5D39et6uiwI%2Bof7S4XLW%2BU0m8%2Bfe8uIXoXTM8rFfA81OlzWpo%2FoudjGMqLsmE7wyLKvjHFTpcCBZfAbImoQiSL%2FZSonq7mGAFtse8XE7XxVugj2eyuxfgkItTAIcijaUuJQBTRYGKAEKmPrVoyiWeOOOHq46puPfQRn%2BR9EtBQnMNph9camQ%2B4Fn1gNaCdLe1nTLIaOUsF2LGme7llvl7sfxjL%2BX0AICk7BYVlRZlxY6toDu%2F%2BKqfqDb%2FAPLYhWQgHQ1qvYzVaDQO%2BAKFIvTbneIXN006hOdspm9XE5PCwNgdpYL4sNdNwVjAkxuuQA0gKiiK%2BTCPXG55o%2BuLf30MS57zTc%2F1U9VFP0sfqmmfmuvueiVNznfmD9XC6%2B1RAMhkOHH2RefwBFCZMkfIwtMnXywY6pgGMJzI95OF8he71C81G2VAI9d%2Fohkm%2B2NRS6s%2BasJJFRgeAtyQfQZ%2B3aNLAHE9KtWZKLyavn3qx5LP2ARg3udnEUsiNxZGvJyIN1oiAETscUeIXAAYWlCBvpk%2FhVj37q1TdGQRztAmU1YxQa%2B70doGSRx%2BjjNz4gHTdYNqH7%2BuFlut9wsTaSkWxgeCreiLvlBDZv2C23qiYAWd6FV4gzg9d2TtToWtQ&X-Amz-Signature=6769622d49455409fe99c73b7570a88f27faa1c8731b68baf9d37839ce480b16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMDIXNDO%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHBgeNanEhChBgcqqRaXRklA8ayCg3O9QXCIml%2FbDDGbAiBzlKw2ZLPKvKP5u7NB2vtR9%2BSPx70eE5s9k4JaZpXwVCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMd9OqN%2FdV7Tn7FqY4KtwD2vIXT%2BxImTna0Msmz2rRABsVelK3zNmXEI%2FCzTld1IPyo2RlOHKa9P%2BeUpKfeTH3eanXxlHelxr7zHFzYMInbIxrlZkhY07ZtgD1qyPogQFi%2Bm6O3MyU7LtsCbL2IgYDYosbG4QWF3BNE5ZNA0KKGugzXXRKMS7qu9AEd3crq8fNXp9qmsKwYJrAxPkV7b4D8mf%2FdzvZpnFC2zQq2j7ex%2Bv%2BgnI1g8K8lBHzdmK6YV5D39et6uiwI%2Bof7S4XLW%2BU0m8%2Bfe8uIXoXTM8rFfA81OlzWpo%2FoudjGMqLsmE7wyLKvjHFTpcCBZfAbImoQiSL%2FZSonq7mGAFtse8XE7XxVugj2eyuxfgkItTAIcijaUuJQBTRYGKAEKmPrVoyiWeOOOHq46puPfQRn%2BR9EtBQnMNph9camQ%2B4Fn1gNaCdLe1nTLIaOUsF2LGme7llvl7sfxjL%2BX0AICk7BYVlRZlxY6toDu%2F%2BKqfqDb%2FAPLYhWQgHQ1qvYzVaDQO%2BAKFIvTbneIXN006hOdspm9XE5PCwNgdpYL4sNdNwVjAkxuuQA0gKiiK%2BTCPXG55o%2BuLf30MS57zTc%2F1U9VFP0sfqmmfmuvueiVNznfmD9XC6%2B1RAMhkOHH2RefwBFCZMkfIwtMnXywY6pgGMJzI95OF8he71C81G2VAI9d%2Fohkm%2B2NRS6s%2BasJJFRgeAtyQfQZ%2B3aNLAHE9KtWZKLyavn3qx5LP2ARg3udnEUsiNxZGvJyIN1oiAETscUeIXAAYWlCBvpk%2FhVj37q1TdGQRztAmU1YxQa%2B70doGSRx%2BjjNz4gHTdYNqH7%2BuFlut9wsTaSkWxgeCreiLvlBDZv2C23qiYAWd6FV4gzg9d2TtToWtQ&X-Amz-Signature=96b4dd153946ae5f9832194199f5ac76ebb89698b0f0f21d395873a0800cf4dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTJEYBZU%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIDNe78pnIsQRGwj2JsUMlFSkXo6Zyzn%2BbxcRXBBTuqLKAiEAnm6Uv3H7lmIToCpF292nzWeLfsBO7ogj8o0GDjbCis4q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDO6Mfr4dlJX4pFSWBSrcA0CH%2B08c%2Fga0kPntnIlCfrIAJ16Qt%2BEGUDj6RrzMRJStyuGP5eA1fmz3%2Bhr03DEqLOUIB96wM3xl8gjYndB6CPtTLx4zjxobPjKd%2BMFCaxGlfqGMC3M3WGWQhu1XNn7mfYyDbNy%2BWnrX56kkZyR0iPSb%2BLCjVoDrhP%2BfjnV7uKTHAGRNt6QpembUqAcCO6g7RbYC4wzTwuQ9wDGwExFMq7bDT4r%2BiHj730BdBlWhLGDvmKTNIwzAGm2XtpMeSd3l2ItJrolDDnspEg2E8h02x7%2FW15BknGrQ87jPGlxy8lqfGgRcLItVhz8zQ62b9HXakMLuOcBc2qPwVmdIZETFqVxHFj2kevsC7nLIB9w%2FgfqgCR4ULHOrrBeTh%2B5041Oichg7Wglrg8x3eOVIFJF9t%2F7%2BrYXA%2BxbhWyKvZUu2rnxVrzbX%2Br0c%2BIFfDdvSHYE4Cw1DI5YDbgSvkCpKPFJSoZOKMMU5oIGKyaLlfrEkDhiAmV5qU0Tn0yeVm6NcYcxDqjBxcqPfur3qitmMS6N08zaJk%2BwL5GVMf96XHXNOLjMgOf1o3PcdgzxowrXTM4XUK6DSlH6CWbPS4%2BUAQnNGdmRZbOCuK7wGdfZsLHCNd0jICybRci3tevgr3LzIMLjJ18sGOqUBjfwzxA4V5EyHtGkTtRThpmVQEWBU%2BFh942d066%2FBVfCEincPtioj0wwNgf9WqYznLR2SU53gO57e%2BwXh2cpKmh2dYt1YrmvXYE9QSNu0cMyNYjgD9UTHz8KH%2FukwyGzpyjvqz%2FZsmmIHR71tuCFZB4vtq7WYqgK7f9gdtQPtxSXlJorCYilIc%2FUKp1ZghW414axzgsj%2B9tIbsizFQYcMNiFnSOpV&X-Amz-Signature=0c4c31fe4d3449f8927aca4408a9e2dd3b1027076f47e252951906409c0c2f0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZFBOGKQ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCxbQi4a2QbM%2BBKzOSUYVmsLSaLwXTzaiId4oPtdE9d%2BAIhAJvfks%2FpzKtrhRctgQlXl8VY57L2KMY0d%2FfCa7Q%2FGDPqKv8DCCMQABoMNjM3NDIzMTgzODA1IgyHq0Ix3OHXEhRlKAcq3AMQ9qt7R0924oLRFIZRepPZNNZm8JOByxtyh8o%2Fyi0%2F%2FWVaG2u3fpSvizGgm%2B8WuFK32lhE2EL4wRXak7Hg4HS0y%2F1NpQGN2g0S4k1wa65LXVIPU5VzpOBegFZp4CNE0RmYSFoZUZYjA4JuiwHjcoXBkg6zSGjgMeQ7q31QtWgz48ucrbya%2BoiPETpdKLd5Vt05JQ6XOp1g32wd6XrkxcYQ7R1hEFVPq4kwAXHC787%2FDTPr5J3%2F29FFImbLZxmkoJKqG799JP9fdXn7psg5mxcmghQPZmY3lM7bQdg1bYHadX5RhKrCfQ8NPPR4F6268UA7gheiAuRbkm37vc52NZ8BQaPZHTWIHY4LjqziCQtJ1GKXJDNob%2F0rfYpZsLGMahW%2BSaODC7sU22MBnutfffdqu2c9TkMTsMYGJSD4cznstcOcaXj%2B0mUHlGJOI0PxPpH3eNdQlmeuxLa7va9QgLJ%2BsbcTADchMTzHpkYGmq3GATlsiP6bIkB3lDggOIALHRem8fvHrFzCag5tUaEKxL987rX7N6rvi0me8RPtdphjUGqde34wncnHJhPGzG%2FGmQ2WixWeEjcngv9%2Fd8TTYezpfKnSbU1FfLmHQDgh7fZdRaL%2Fnoe94%2FpQhQJI2TC7ydfLBjqkARiJwJTT5HrdqPQ3EWlZVfPHODmbahDWFEuQlHASiC7dxQGMNFpZCDRx2QFOe6Ft9oHJApMFY%2FyyvbWvwYU8yT9DW%2FFLmCE1dMYz9SFPkqvTGcWH258GDfHEH68FlsZw8Zj9PzvsRJWnUh%2F%2BNwEpNK5ssY7jK6CFsPWEKDVU4E%2B4FBGmNVdSOaTjnnazHLHcpV0NbTWuMC1fYr9GTKLnYssl3Yho&X-Amz-Signature=5c8bf1c03dfd34488fbcf28c8e92a8b09fda7ed4f3f0d2cb5ffd3ad39d42cc35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663H2XOXTB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDfye%2FgUH3zCjpVM%2FeK6K5bESeTKA7VQ7cAPWReRDFkrwIgAfyYNIsIsYVJCVEO7qNcwwAdfDhx1sU2FYYEpJPxmXsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDDeHZskvskCcZQBnDyrcA8PoOd%2BzCS0h0w6BhOrc9BOlpdu6%2BaSA5NjNvHCNygdQvchNvd9zU4u5J%2BDWTrnLpwaL3Xq9dOEPiY05uNr833n5oI%2FeFnLV%2BBSkhzbdFzbFGWYqJGP%2BUDpsdfnaSsc3goc17ZyhrBzGefThnOsi4bhveG4PXhiPdCqW0MJINERfooTd1O4Qlyusht01gOoWRVcf2vOpHfHNIDdqlzsFlNYRiM2Cx3pHD5Hyb%2Bb4XryM1F9lzaSirGD9iorNlGIYGILL5pV5UJUfNpU7XqQKu%2FCuywPC24zGiJUd7BgX08SwzqmHHYXzOk3i6P6S%2FkCy69E9WHLDShz9Wk%2FLTRqoMuEM6gjOvInKdtSiXlBJzxD%2Ff7e%2FpkR%2BEwB3TI%2Bbi81ckWFdYdKJ8GgtkHxrhsT8YkXvKQRQnmI%2FYTSPqSB95bspA64D0EHEr2fqAZh7y41Gj1infWz6vnm17GVOCn658vsrKMrIzfKtSwIDKjF2BMgqegqqiy3b%2BGU2t93ibZW3qOGejiMShVNWNNqpNzyaN9GwgnP%2BMvmMTeOjrXmotevdtMIAm1A05u2i5Yy9ZjxzSfXzEH5k8xXPDS8N5pH5CMSj4prcvh0%2F0bJs4y%2BMZ3s5GiR%2BQFRo6qCIqBPpMOHI18sGOqUBfe%2BBfeplKYHfx8oTsNQD1qQKcFOkK%2Bzql%2B7Le0exuCNxI6%2FbPV20TxwPRjOLqkJNJvJnwKQ5Svd5U4qjGzHRfAb6NsP98%2B27touZcbReh%2F991OA13bXy5LIXIYuwzSy52VWVrdt7mgSPVOIuTOGlkAUZdEKbqQPGw12yDvlDvQPycyJzqvArSz%2F8HDERhp4Jpo4EBWUlBvzEifVK0pmHo2E%2FqP8E&X-Amz-Signature=34dca626654f886b4751cff4a30304a25e894baf9cdd950f1dac62c329682d0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2PZU73O%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIDeS4TexQfyqqKJVKw8p29RFUQnyrnFPOfTb1Vy2Wh%2B5AiBsyP7bNOk9KuHPOxZQUTVKy7iS%2FgztO8Sadz258P7Lnir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM4vUEhun1OzrSZ8%2FAKtwDq0U32gaK6KQn1zMYoZN%2F%2FyPcFmiR5IRi%2BoCPFhY65L8NLdoOuPDpXyFrR67a%2Fa8LaXt%2B5y054K6Ol1F%2Bapeiy0bGJNYL42pkAdBao1XrTOdpA0mciypqTI%2BL4Miq1pvy0hlcJGVBdKd87T3yd5oVq5OEcatV29BCYn%2F%2BGm1t141OXNZzHm9J5PfOsINII6Q02Xqng08pny9wltJgWtOFmFaOI71Ta8I4pVzacopq89Sa5m%2FDkoR%2FmPz2kEWhgbPul%2BgIqLBbGxx9tFW3pP%2F9VtyOAQ7q1s4CF0rbl6j5R3xOiXSPIddsjck7YUGSx4zYTH79istDYQB4myZA3GJTGJeG%2BiDb%2FFkAFUAALSDK5pTdOcb2VsaDFBnex40y%2FwKNpwXniv0gTXq8VmvfNmzsu3UqWs9ZKvFgmwESiReNLhetcPiTn8Y76%2FMbodmv3TifzwG1RH58Iug7iH6QKk%2BsC2QC1FB9pWD%2BTgXmzWNjkFi4oBiRre3hjHjyZwHya%2BomQYFq5B2sl4SMA5yLkvIdjUrMA5m4QQExN%2F8fIyvd%2BidcE6FpAvmdX%2BsxIyqxWwEhGVGvreDHCLBEgvVmUa1b9xBPIOq%2BjcMyLijVNpPBxqOhKs%2BXPWU2ZgTeph8wrMjXywY6pgErtBK68hTun3ZcFLxhYDQ%2FQkJUGscos%2B127xq%2Bd3UJXNZRwYLFM74OUQIOjl%2B3Ukvx4hH9H3g0qJb8Qg3ktg%2FTw9w1hR3%2BddVqmXx77x3wGPMS6796Ik1gw9wut8XDhU%2BFiCbh%2F38FhaNRQ0b01ta%2B9Cw4YAc8qtECPAiBw01RPw80%2F3Z6ckTpCktsiHeBA%2B9%2F5W6rI8zfRRLwe%2FgnVwk%2BvIeTDYMD&X-Amz-Signature=b8142ac572b831e42509cfa6e1503cb63dcebc7bcff8064e5d67f9158730f792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2PZU73O%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIDeS4TexQfyqqKJVKw8p29RFUQnyrnFPOfTb1Vy2Wh%2B5AiBsyP7bNOk9KuHPOxZQUTVKy7iS%2FgztO8Sadz258P7Lnir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM4vUEhun1OzrSZ8%2FAKtwDq0U32gaK6KQn1zMYoZN%2F%2FyPcFmiR5IRi%2BoCPFhY65L8NLdoOuPDpXyFrR67a%2Fa8LaXt%2B5y054K6Ol1F%2Bapeiy0bGJNYL42pkAdBao1XrTOdpA0mciypqTI%2BL4Miq1pvy0hlcJGVBdKd87T3yd5oVq5OEcatV29BCYn%2F%2BGm1t141OXNZzHm9J5PfOsINII6Q02Xqng08pny9wltJgWtOFmFaOI71Ta8I4pVzacopq89Sa5m%2FDkoR%2FmPz2kEWhgbPul%2BgIqLBbGxx9tFW3pP%2F9VtyOAQ7q1s4CF0rbl6j5R3xOiXSPIddsjck7YUGSx4zYTH79istDYQB4myZA3GJTGJeG%2BiDb%2FFkAFUAALSDK5pTdOcb2VsaDFBnex40y%2FwKNpwXniv0gTXq8VmvfNmzsu3UqWs9ZKvFgmwESiReNLhetcPiTn8Y76%2FMbodmv3TifzwG1RH58Iug7iH6QKk%2BsC2QC1FB9pWD%2BTgXmzWNjkFi4oBiRre3hjHjyZwHya%2BomQYFq5B2sl4SMA5yLkvIdjUrMA5m4QQExN%2F8fIyvd%2BidcE6FpAvmdX%2BsxIyqxWwEhGVGvreDHCLBEgvVmUa1b9xBPIOq%2BjcMyLijVNpPBxqOhKs%2BXPWU2ZgTeph8wrMjXywY6pgErtBK68hTun3ZcFLxhYDQ%2FQkJUGscos%2B127xq%2Bd3UJXNZRwYLFM74OUQIOjl%2B3Ukvx4hH9H3g0qJb8Qg3ktg%2FTw9w1hR3%2BddVqmXx77x3wGPMS6796Ik1gw9wut8XDhU%2BFiCbh%2F38FhaNRQ0b01ta%2B9Cw4YAc8qtECPAiBw01RPw80%2F3Z6ckTpCktsiHeBA%2B9%2F5W6rI8zfRRLwe%2FgnVwk%2BvIeTDYMD&X-Amz-Signature=f639affd7d206a8902881b2b8c9a2e37b77c0ab258bd4b8404d0049134375c1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5LF6NAH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIGB12DuJ2iZcqShkZDT%2BpViJczpx7qKjb4qkJvf2FihiAiEA1qVaWM0N8t0EL0mDGxs3r0y3ZzOUWReCaDkO77VVLCoq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDHavT4MDm3A%2FeM40BircAzsGQq2lCiwcUESnGkEbopeUAGyy0b47rfacpT9PpsEYaBI8QsBq27OPeDQusmklwdbAkrBu0QxwZF7BpULjZ4Ylbi%2FJGHVT61wbq7jEJhQpi5HyXB3fSKJ2jJrU6ZROqUrMRAyDIDqzjTinPK2rJEkc826vWhehUArz8q5zFsBObUEoYIYQwzQXUtgmvtWZNjmRT6voiKN8evAr4pQjJQ7YOnH4A147uSTrUkVR%2FCw8MhSBqnxMi9JBI9N5Z89puzAcKyxmIO1PSL%2FZ2aSMdCinIVpSCbnntgknNyEYA1KsUjvanTUT0Pd3DBRiXopxiLfZ0JnGtmhk4lQIcvXf2r4hNQkJm2nkO3l3L9Jft45X%2FOUJhjGG9am478r1L8kxjcWfBfzjPrhIry0aZtshK0ZuP%2B%2FVWJRyJ1AYZwwx0rhpdY56%2B6Hdp40O1vjIM6yvBnpjzw5AqdCCZuOFZ8bhQLgUeBRLNOZfjUN%2BRuuFq7lOMF%2ByDpjyCiCPuOjurWredUTovvJ1y93uKNG7oZIjllsaer1uBcKhlWfw8xit9SgoMuPmU4DzzPqGpYRm8LqHkq%2FzjAwb%2FvGFRjDuBnk84qKNURbVQB6D%2B5nTEgIrTjqjaV2E6pGRZ79pzDl6MMXJ18sGOqUBYPUVNz8MyajRRQYFIi2ZjvyTUzgvWfy2MvacfoO4YfoEf0Jo511GS8xUxyoQWQlMSZYuR2Jf1rem3auIsVxh0b7Jwb52TW32JrievFGquhMpAdBtSQJftwi6gzTyZOhr4ak9M2zLyiXXmL0VpcTP2nEaXUXzwDA2oqNRIsHk1EZS938NSWfhIneU0hFZOuPZcLrMjeyTCqrQP3Qh9Fqx7vmGWlxu&X-Amz-Signature=1e3d7763917f87c50987a9a547b5f29c95104ba5c78a27de8263999e6ad5601e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FCYEMHH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHRNbIaWqJJHqsAnbrDwJ1iwC7vJvNN2HZERafq2G2ILAiBYHwyYr7PYYFHSwXM3pvNmImnXrOh0BOIugrPP05WFkir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM6ZUKWJJGOawe56nRKtwDQf2rNYZWECjDPJQ6U93DLxZpDk0zV5Nck751slXXlw6yZXyF%2BwakhRzR%2BZpzUpwlyvqHeQ5Emc4RCWW5qRiu2QP9i%2BcpJXmfOveO%2BkIJAkQyYyQ1iGyItK7Gm8bqHdCc79BXPVl5qHi96RBud5MWB5udAnlfm6qTSVtNUXxxqhgFUc91qbmkTqz%2Bv2S106foQYyEI%2Bh9D%2BPXMy5FB%2FULKf%2FIUvugocI3T5WvNghWAWrXXfmXQwsMyRPbdcwuU5HdrGBTZXbhcKuveD%2BZhR9lthTzJYCe3CM88h3MTCdlM9DDNDJrl3zM%2Bzf%2Fh%2FiRwD%2FaC%2BEr3HfHdI02kjDVn0MQm%2FFjQ%2BJJMumzrRQBfMMlkq6JrLf65wpDYk82kRA8LkDgW332EnEwgzLJdrFd6b%2BxKWvusWQpWcNTf4%2BtQHUImqvogx4EYjdmoj3iN0s7E1lNmhtsN8dnJQqCmUp7XERgLgLmc23UQ2XDv%2FlRrC7kuXo1XWEktMUO55eeYOlXNePBjin2NztQPBgwyfQ%2BZSRKwC52OejZCrsYahlEJl1c5B6NxpPGUqkfYwQU0gIvAMf%2BzYk%2Bf2PIiUrSmccnapp4hvbWjjcYl9ICr06AQHaz85p5V7SyCvd58Vb0gNkwxcnXywY6pgF9NZZiWVt%2F%2Fh8ufME6HBy2gxdYwTgRGaq6PX7nKyg7kNkVUAu5YNEQf%2FjcbP7hLPAL0oOEdEh54GNHYy%2B09Tr%2FnNRff5DGUlw00E%2BmdnNDqExXhFz%2BDprZJ7zIzeX9BOpExc7SIwXmb2iSYKYPgLbEsoImFurtnsBxTrCTO1MYojaSrbfjyB2SGINX5sdWFk8TfpcKkpN0QtaY9zklxMPDREz%2BS3cO&X-Amz-Signature=62c3f366ee101a812a1db18c86c4f9bf238fe995b8e1f431cc3c9cd5871b1c84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FCYEMHH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHRNbIaWqJJHqsAnbrDwJ1iwC7vJvNN2HZERafq2G2ILAiBYHwyYr7PYYFHSwXM3pvNmImnXrOh0BOIugrPP05WFkir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM6ZUKWJJGOawe56nRKtwDQf2rNYZWECjDPJQ6U93DLxZpDk0zV5Nck751slXXlw6yZXyF%2BwakhRzR%2BZpzUpwlyvqHeQ5Emc4RCWW5qRiu2QP9i%2BcpJXmfOveO%2BkIJAkQyYyQ1iGyItK7Gm8bqHdCc79BXPVl5qHi96RBud5MWB5udAnlfm6qTSVtNUXxxqhgFUc91qbmkTqz%2Bv2S106foQYyEI%2Bh9D%2BPXMy5FB%2FULKf%2FIUvugocI3T5WvNghWAWrXXfmXQwsMyRPbdcwuU5HdrGBTZXbhcKuveD%2BZhR9lthTzJYCe3CM88h3MTCdlM9DDNDJrl3zM%2Bzf%2Fh%2FiRwD%2FaC%2BEr3HfHdI02kjDVn0MQm%2FFjQ%2BJJMumzrRQBfMMlkq6JrLf65wpDYk82kRA8LkDgW332EnEwgzLJdrFd6b%2BxKWvusWQpWcNTf4%2BtQHUImqvogx4EYjdmoj3iN0s7E1lNmhtsN8dnJQqCmUp7XERgLgLmc23UQ2XDv%2FlRrC7kuXo1XWEktMUO55eeYOlXNePBjin2NztQPBgwyfQ%2BZSRKwC52OejZCrsYahlEJl1c5B6NxpPGUqkfYwQU0gIvAMf%2BzYk%2Bf2PIiUrSmccnapp4hvbWjjcYl9ICr06AQHaz85p5V7SyCvd58Vb0gNkwxcnXywY6pgF9NZZiWVt%2F%2Fh8ufME6HBy2gxdYwTgRGaq6PX7nKyg7kNkVUAu5YNEQf%2FjcbP7hLPAL0oOEdEh54GNHYy%2B09Tr%2FnNRff5DGUlw00E%2BmdnNDqExXhFz%2BDprZJ7zIzeX9BOpExc7SIwXmb2iSYKYPgLbEsoImFurtnsBxTrCTO1MYojaSrbfjyB2SGINX5sdWFk8TfpcKkpN0QtaY9zklxMPDREz%2BS3cO&X-Amz-Signature=62c3f366ee101a812a1db18c86c4f9bf238fe995b8e1f431cc3c9cd5871b1c84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666P7I5DVU%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T132507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD21QH96vCpk8vK7l%2B1Sm0m95f%2BRz5dGTaHXIh1mKNwrwIgMSj8tSlV4MHDBpNSfPvbXcA1elFZuf%2FT1WmMr2yokoMq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDLFbho10%2BVISzWyMNircA2NJwcO6Tllu5R2TFvnZALBMJI56L2spmuSGRJKhwvGfUueIOMUENb0jMevfyKwWHroAquhFSEKIpUIy1ZttQoNLIldIe3UGqDy6FXXNn%2B%2BGQNjXA28ubffCaAPn0H0Q%2Ff5dYqDfhThwty06KWx8v06NqV5Fg%2BzBDlT3af1wTJju9iDVgUoj2Ha4fLOA1s%2FFrS1Y8hJO3%2BZ2lhvycQEBKgEGOuw32kSZvcDw3E9HjPHcz5D7lBThhI6W5GVncGA%2FrBbF3zMvuJHtL%2BQnK5RXi6pgYVPEYJQR324Rw%2F3yBVEP%2BIkz%2BbONntsFJafCEmFmO%2FnziauEJ2lA5ZFYB%2FA%2Bt2JzJ1CbkzzqNUUIDY%2FooKbpSCwIiEcZjvziK%2BUkaw6CM%2B5j%2FbpZrBAhscI%2FhXlAgdnsW5uQbbcZx3NyeQJp0OtztXQSfsvl0apjupTI11T03dEP5o5xz3qunUYlxL7lx5PQWoOhwZFmQFlTUJxt0YXpuOeNj4NsyMg0SEfI%2Btg297NrPamkzP%2BKhaRq7wMWcvVRTyZOle72UZy3ucSfgibHn6n3PjdvR4aT3MT2QzGVg3xWUA7SbJKuwxAPTuDUKDF9S2ErCNvSXUnV41liZRIpynVwkFM3MWbi%2B5THMPDI18sGOqUBFHqBe2UBOz%2FWzp79AdA0J1FpD%2ByqPk1cH7SwUOeUCJ8P9dfoj1lo0DgjPNFXx5dY5rvR5pcc3mPzE3cdujKYXE8JJnXVwxd8ceYzwmiXZc%2Fj4H0ktDsFci3mM8SI8XbM3VUsAzJayRgssWhAvRbiuKRKQFtXwvrB%2B1aVaNAXZUIMU56R22CWRyd%2BwwLuVIXkg0OzFJk9Z4I2NVv2VhXHVtd2FZHF&X-Amz-Signature=839938a399c54a5f42a82c4697892bdb2b47465a6fcf923cd34ac97d313e36e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

