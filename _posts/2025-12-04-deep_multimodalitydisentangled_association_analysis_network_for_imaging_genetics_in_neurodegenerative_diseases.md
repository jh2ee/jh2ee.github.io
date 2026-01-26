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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZT6CIWA%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGLZ4Hf1GpuWpMAnbJIoWbGs2NFkRq13lIzLEYscdE4iAiEAvLL%2FOXbzEmVYxE4GouJt30cwY0jKVyjsvgpvQuZccWAq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDI6PFXH6a2i38bU9nSrcAynuxxNrg8HKQkp3QTE4sxV7MKgWP3VVQlLDdWUMivv08dqgWws4oE6xkdzQeSuvNNlNv%2Buyj3orAmPeeSoyIIXa57H74WNn5FUMwjebnuJ3DLugNgwScA0Bo2WKuMNcemslDEwIcFryOH2afU741%2FcBUApHCl46p6NbX%2BhhVwcVu%2BMB7S0oO06yaVlo8QxtknytGVwwtP2gy%2BPdJSCMEIej0XlSIH9YvZx52mzQfcY9T0Pqe3piVLnCqSNyHbyUrVptAfZp4b5UJF3Kmd2GRY8rJaaeQqJJj7%2FlEJ5vGEkBpKsdjvsM9Qm%2BOZdYugvIFOr1fLLYQaMhD%2FTbXUw2USo4LSbWQ49cEcoP89cyG5OY%2FDGAm7co%2F3ufCSsMarGBKSDgoRh6GR1EN6AvQBRHKRK2YP8R0izs7WtV5ofPtI7Upy2AqDNJGSPrZSOSl6Xr%2FJK6oKGAnrsnIG5efkFvr5M23HFZOGUlqswGDDXghjwb%2BskgZ4KpEuJwnuTp%2F6mJtfkG%2FDcCaCsfuCR61QHTzSP4G0GFzQWMhDq5p2tCnUr6gMrOOAB46jH9LDWmrXTZXohs06jmbr2SaNmfMls1AU4DHmcOLMQLQYlNkkBl%2FVwqsWurJJxYFjKW0Oi%2FMJPc28sGOqUBvK%2FtfCiOF6%2BhGIuWPgIHT%2BIMbnpCy3aOLSHrND2L2cWFgg93BRavzHKZEpgMZICv25PGCO74BZncPstw99eMANNhV%2F7cP21nAzTNc2gEZly010BWlCFlI8ODr%2FZwv%2BK5qAc4wt4rSay3CPa7BRx7MBtJYfCJbxyNKnhngBRfvWINPUOR0Nf9xyNFAsWPrVvtnli0rkPSP3faA%2Ftk8lCdIUq1p%2Fyr&X-Amz-Signature=6466ad316bc38c43eccd8ab476de8200ef85854fa605e521eb3cade043dc5e98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZT6CIWA%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGLZ4Hf1GpuWpMAnbJIoWbGs2NFkRq13lIzLEYscdE4iAiEAvLL%2FOXbzEmVYxE4GouJt30cwY0jKVyjsvgpvQuZccWAq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDI6PFXH6a2i38bU9nSrcAynuxxNrg8HKQkp3QTE4sxV7MKgWP3VVQlLDdWUMivv08dqgWws4oE6xkdzQeSuvNNlNv%2Buyj3orAmPeeSoyIIXa57H74WNn5FUMwjebnuJ3DLugNgwScA0Bo2WKuMNcemslDEwIcFryOH2afU741%2FcBUApHCl46p6NbX%2BhhVwcVu%2BMB7S0oO06yaVlo8QxtknytGVwwtP2gy%2BPdJSCMEIej0XlSIH9YvZx52mzQfcY9T0Pqe3piVLnCqSNyHbyUrVptAfZp4b5UJF3Kmd2GRY8rJaaeQqJJj7%2FlEJ5vGEkBpKsdjvsM9Qm%2BOZdYugvIFOr1fLLYQaMhD%2FTbXUw2USo4LSbWQ49cEcoP89cyG5OY%2FDGAm7co%2F3ufCSsMarGBKSDgoRh6GR1EN6AvQBRHKRK2YP8R0izs7WtV5ofPtI7Upy2AqDNJGSPrZSOSl6Xr%2FJK6oKGAnrsnIG5efkFvr5M23HFZOGUlqswGDDXghjwb%2BskgZ4KpEuJwnuTp%2F6mJtfkG%2FDcCaCsfuCR61QHTzSP4G0GFzQWMhDq5p2tCnUr6gMrOOAB46jH9LDWmrXTZXohs06jmbr2SaNmfMls1AU4DHmcOLMQLQYlNkkBl%2FVwqsWurJJxYFjKW0Oi%2FMJPc28sGOqUBvK%2FtfCiOF6%2BhGIuWPgIHT%2BIMbnpCy3aOLSHrND2L2cWFgg93BRavzHKZEpgMZICv25PGCO74BZncPstw99eMANNhV%2F7cP21nAzTNc2gEZly010BWlCFlI8ODr%2FZwv%2BK5qAc4wt4rSay3CPa7BRx7MBtJYfCJbxyNKnhngBRfvWINPUOR0Nf9xyNFAsWPrVvtnli0rkPSP3faA%2Ftk8lCdIUq1p%2Fyr&X-Amz-Signature=6466ad316bc38c43eccd8ab476de8200ef85854fa605e521eb3cade043dc5e98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVVI6U2V%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIHbV3pDF6Eto66E0EubrIXdeDd0ZQIx%2B014ISQY6QbglAiEA9DeZ0MQxdhSfuwTYPXveCSU6Me1CIbJ06%2BYO%2FevoumYq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDHh9wehrcmTq3m0ILSrcA8HyscqzEZqzHt8%2F0ZdxUg9BG1fdiyfRWsgvwPbbQgSNOyPOaZwwl9TKYQV1qgFS%2FU2A%2BMZdosaX38WXl5AozHjdp3GX5yWeVr3S1sDwTvyn4vHUZTvCHAAhABk4XD%2FYXD1R2ndj4zEdH4rQbgWBhkohhCwQMMbPuD3uSVdtaY2DMC1Ie1yXFUqyD8iez26PCgH%2BrzXBgN4sINVdtktgIOMl15Iaar8uOR23cJzf8Qi6pPl71LmoxpaJgbJCFkTs5M83JSeNzGOgK13RjmypzDkbpIU393DVGEFMUx8mbxvcPZHEE4e9OqtgM5eZOyu3Y%2Fk9teqElVK5jfbJaukLRKe1NX2SpUxjt879C1bclHNfItPvirfjj8wNg4busSU0MvJpaOcEqqcxFnDy56%2Bjm1FibHzjevd2DpdOIroLrQC4N%2BWdzQPp9bdkJE3PCJrMEKG1rTdRH6osiMWsOH2%2BS232H%2B2BhID04YioygdhYh7rQx7pcreLpW6ILWohoGLPLv0k6xHFGSzNkOvTEqw%2FEIQbwfMPOXOprjrayTre8yc6BKknxIUBxMROf7Ph7rqlWNpvTxFRLkvgH0lZRrCCpJX5UBlvoJjjoAzLJWjvCs%2FfD6TYVjzwhzYZjhoAMInb28sGOqUBgdC83tzibdAZJcmvQgfxi%2FKfIU1ih%2FyJDeijTrTqzBwryCFF34SOcfRkRM2ry%2BpEPGyXQYUktqaIRnzp04wniaL0v14FVGMDxBgE6wVkQIYQoX7DXXLtbAv2QfafpWjAbLSF6OZGk4ruVbQCc4jWSz6na%2BTRMaGkI1c74YOtcXhWmEn1moSKcJRxDm7Ft2hccC9MF%2FHJipt%2FzXtXxuIWUxNH8P12&X-Amz-Signature=0f87696a82259e13152e84c091dcd52f195de3fd033f1bd3fd2c7dc9e30b0806&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P4IR6Q5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIArhLaYJiCOp%2BFwKZlIAI21wdB2o0DglkTNcd2sR7nxOAiBYz%2BkycvoZS63xHMVFlUMCQEFhLlb7LUFrpTC%2BHc62iCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMCcinSwulloCUwavFKtwDfaSjSy%2BxVWJx2FmKB95ystyOrpYjBgjZWz3HTkv9GbzONXKP06zYKBCh%2BQwz9eWIqewvxSMu9w8CTLGw0vg5zU%2F3b9FqD5eaEnZQvLB%2Bvqwc6G5hKolgCFGQDxLIhq8pCtoCw7kNOv2oh4GPr%2BFpzf86I%2B0fYpCVjz%2F4xGU9eAoSeRag42Tjq8%2BZJt4TizCy5llMpRKmF0W7ga7S2BzJlxEIKq7xsHiInihwnPi89s8c4mHmCofdXwphywUr4fKerWBx97N4KqZHEUQPCSWL5y%2FDlYFaMSLrBBy5q63WL1FiPQmtZZkYQvOcuBTCs68QnmQZgS7bE0Fy5cR%2Bn9UfJVoep274G8MDbiWr9t%2FArlmHucVpda4R08ZTg%2BWpzTNWolR7MzdZieHffK3wlHSOsKYnpMwUZfwsHnjYqkGVKZVecrJIor34s32Onb%2BpGoW6yvg59xKZphlzCAt7dvKB4priGuzh60PknE2e0VlKbWVihefdYM2mxMR7Q0%2BpART1aba8V7ziDLTWJ7ZR2yXcOuWUdJ0r6uT0tD19oGyjZ26T8O7ABjyVu9t4VVKQ%2F5WLu8xwt2buQV%2FqDuyTmDLzhUcQWOJCKIMY%2BDWleO9aNn6MAMQtK257LNJ%2FHe4wotvbywY6pgGLU6Hens85Tko1KuHATGOGCghclOapzXwM4YSjgwqzpgIH9wz7crghQJ7jvLO1kshmMH18cb2Q4D8%2FJOMed0avQ%2FuCFkhQAQMiL84Rf4eB5tU1MEpc0%2FVQfz%2B4tYOJJ8lbsno3A%2Fhw3sPqj3ZhBjikQBaQfQwAc5nRSJ28wGlTKf8MYD91wPspPShWOgkIiikRHqH4fG9VHwsBdL2eWiS5uc3s9RYu&X-Amz-Signature=8e4b9050f640b72d6d9a1b3c6647532678c47806bcbc15a9c818946023878111&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P4IR6Q5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIArhLaYJiCOp%2BFwKZlIAI21wdB2o0DglkTNcd2sR7nxOAiBYz%2BkycvoZS63xHMVFlUMCQEFhLlb7LUFrpTC%2BHc62iCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMCcinSwulloCUwavFKtwDfaSjSy%2BxVWJx2FmKB95ystyOrpYjBgjZWz3HTkv9GbzONXKP06zYKBCh%2BQwz9eWIqewvxSMu9w8CTLGw0vg5zU%2F3b9FqD5eaEnZQvLB%2Bvqwc6G5hKolgCFGQDxLIhq8pCtoCw7kNOv2oh4GPr%2BFpzf86I%2B0fYpCVjz%2F4xGU9eAoSeRag42Tjq8%2BZJt4TizCy5llMpRKmF0W7ga7S2BzJlxEIKq7xsHiInihwnPi89s8c4mHmCofdXwphywUr4fKerWBx97N4KqZHEUQPCSWL5y%2FDlYFaMSLrBBy5q63WL1FiPQmtZZkYQvOcuBTCs68QnmQZgS7bE0Fy5cR%2Bn9UfJVoep274G8MDbiWr9t%2FArlmHucVpda4R08ZTg%2BWpzTNWolR7MzdZieHffK3wlHSOsKYnpMwUZfwsHnjYqkGVKZVecrJIor34s32Onb%2BpGoW6yvg59xKZphlzCAt7dvKB4priGuzh60PknE2e0VlKbWVihefdYM2mxMR7Q0%2BpART1aba8V7ziDLTWJ7ZR2yXcOuWUdJ0r6uT0tD19oGyjZ26T8O7ABjyVu9t4VVKQ%2F5WLu8xwt2buQV%2FqDuyTmDLzhUcQWOJCKIMY%2BDWleO9aNn6MAMQtK257LNJ%2FHe4wotvbywY6pgGLU6Hens85Tko1KuHATGOGCghclOapzXwM4YSjgwqzpgIH9wz7crghQJ7jvLO1kshmMH18cb2Q4D8%2FJOMed0avQ%2FuCFkhQAQMiL84Rf4eB5tU1MEpc0%2FVQfz%2B4tYOJJ8lbsno3A%2Fhw3sPqj3ZhBjikQBaQfQwAc5nRSJ28wGlTKf8MYD91wPspPShWOgkIiikRHqH4fG9VHwsBdL2eWiS5uc3s9RYu&X-Amz-Signature=ecdc1b430895fbdbe767b234ccb5ed4328ad875fabf1354275f66ce65bd6c3f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFJWXOA3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDaReHmA44l4epehA8SMGeNfYpqM5TimVNLmMHR9RWPCQIgN7i%2FJe%2FoI9SsJ42eHrqpaUMGZTcd95ymFosLO2xk834q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDLCCYeGtaz91xHIVnircA1Xgt04bCTo5bg4geWd%2BQVEhTr5VcHlVAqxPJr0LpZOEhQk%2BZ2tQG377mulLyQhlXazMpQAUI0nFgBv6uGDgp%2FxEHm5i6OKCmI5hMlf9dQT4l5ubMZZFCZ3nHYVdgTCUb8Uy8m8MkWxiKNF1%2BEBJlTbljM8vo%2BwDxbYJtXhflkWLThOrIUMeb3Ts7qQxTjz07r1qLbjSFpDo%2FUqt5ot5RBF6f4s%2B1%2F8R9QyRnQGStdkz0cd8CK06Z0cwy4w9UtJmPMKyiL5GEWXpkdtp51QscNrIEwfD23P1jgEI3yU4OmlBorCVchV6TC3L2Y4RHEZkCezwhXMYZZDmsC1Ch%2FqeVL6DYWssem47QN1dPmkdqo5VnW2U6EXyrzx3KPQvblaTrGF3D9pEbKwt%2FoidsiHRI6ZY1B7upmOB82TsQfvkLzBAYzBrBLGbx2DUyO%2BWMBhrpIq82VhURjzVk%2Fr5C2XMTfpfQdje%2BpcLEMWMv%2BjO6GThaW6mR04mApQDkmiQpH3SMa8Sug4ifoxo2H4mN%2F4OEte9GcwdvNwg4k%2BGeb8gwAzX4PcXyMGCJBvvv6bu1dRHh8rRjptMzNlwO6MxRXIhYDCghTszWLeANMOLB%2FzViIoUx5Mb8RlYRG51mrS7MMTb28sGOqUBTEUXVd3LOd2grS55fgaLgzb3FvsOe9LQczjHe6a0ODDr4N1%2BmKS%2FvoHptkZT8vA9J9IvlXIQsARl1h2Hl6ZawIVnq6cLn8CZ87o6QS4fBFo5p%2BLzuUJxf0BX2UHWbedlhLq6ZxWiiTgFMhrxIvwsDKjS6JEhyi2OGSixGofNg1Gk2N79MuoaQBUbOmLXg0CxfAcPQknf%2Ftf%2B9oJqTkpIvbL71hpm&X-Amz-Signature=e0716b92e38959caf17b371c6b485d944d9daa431198992cf391b1f0d94488a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGACHQRD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIG2AFi4YM2k3YJDo4TS2jbZ9qY9AjSy1hseBmTXH13j%2BAiEA9L0ZQGernRnOQtu3aeNLNQDtoudax2MOEFJx5xBLMuoq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDIWCNu%2BNJlvW7Jc5hCrcA9YJC8rupuVuPRS0NkN084Nv18UcnUDjaVbUvPw9kBWUkt7hoHsDU8OvY9fFs2SeqC2J%2Bm0AQu30m3RzifNu5yA35aW1Kn3Bq%2FWH5Bc0EafG%2F%2BOKxqKUtb%2FsbNvx8m4i6fbzFU%2F7OK3WZxsbME%2FUNu2xHPYa8%2FeKxE%2BAM%2FtcTxv4toYsWUZ7RyabHYts%2Fduq3naYD4pemkrvDANifBBbqtn9sbED1ouFg78Zi7nbXzD5X4Ttdg2IVa0CH%2F5cZ4Vt%2BqCSZ0aFubUzAGmdeQ3cPkltt3CO6lPUBmJIHAHB%2FnK7etcotC6lnfg5T3rEFfppBlQc0bMQr53IK1B8Ye8n9Pxk4KtF5f2HI7WxcgMVo7KNnN14imhDibw8MD5TH7tpM8vKZCHo8h1RHp1j0nyWXOzMo6mkEaKehJlZ0jtpnGCk9UDbl0ifijnj6blepeq99159SOPl7JJlb%2BIp5FBWLgDYxk3F4zcdi5jr3JyoaM11ArwIcfGcL7JreyQP3A7fTeDHEimhghRcRoIJ9rcsz7Yjj%2F2dqyup7D3Oc%2FQQmo%2FoXDj2ZT13IS8LW7CXlY%2B7W3c0bfS28SHrqRd38tYoAhXhxO8A1nAchL5d1xOWd2SxGdXyegcLFA7bw674MIba28sGOqUBZoLeP0mZj0SeahPiqd0mU0jIrvLKU2RnSwNQKgrhy3WyECqekDvsfYiG9B4aciY6TIO1E7u2zDt6XFev0j6dLSnzq%2FugMMYp7AnZFdC3GyH8zuhO1xrTd8VSExdmbAHHHK4hnIj3q%2BDiuCBxuN9loKcCTMEhSPuYjLhWRYOubgTByQxrEuBuKM5DlOO9Y1P7vca5X%2F0NSyw4TRua2ZZQXx8O4PDy&X-Amz-Signature=d93b68516c2958b5cca915a3717310850cf4ac8981223ef39a2682ec5c778058&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XO25M4UD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCJPY0BOu1thMUXHcB6vIDzCq%2B961JfaN1BH1q4WOz9vAIhANAijI4icmldM6c8no8YEfciY0wETZQelHgGdwez9GRRKv8DCDYQABoMNjM3NDIzMTgzODA1Igy4tnr6HAe67Jx%2FBoYq3APllvq4FvttPBRg29SRvurGpVNCyj6GQnvEVN79Jiew67e9vImsoVTke%2Fc4YIkq0RYVJNWwHyJnfccgJeuhehfB4xqLBv%2FyAmIYI5MLAHJJNjUzadwwiehPs0KuLKGZZO8cnYDqlEGV%2Bx8i36CGFw7owNJ4I4CIySqgoz%2Fu3mH2yeGapEpeAua1QcDFXReyYZxEk62mKOW9RjhCFbwBSiUu%2FHO22OrNj2yLCynyBZMLRGXEJ2nfcZCLgTCq91M50VMV%2BwKd03E2cvHUHOB7FlUFUIW3a9Wk11tmD9M050xHQqQMUnHyVwJZDCICq%2F7NYAReJrFvSXT5ckUnXgkG3qBaqyDMQl1lmN32%2FIgq0soWS429X75y3KVTA5zAq5O36fcGsJtFRFHaBPeQ7ps0snOXXt9T4ohZQLDNG%2FwBHRZ8AFQlbBoPhiMDq98v9iYlPqT5ZfUg4Yx6Db%2B5FJ8b2HsP1Unp4Ec58IdqkVkMVWq2XXYwmhjXnlrtYcSZFxrHdSw%2FgRdndfnldgSAQL50vye1ShUU4i%2Fvl4uSUvkNiOEBylxyNy%2FwgFncAIZRaQVFe%2FbIiGWeJpizobjwGtvggzpwooaE8vt7DMbAUSiC2CuqBeta6QWcZkbNSRlIKDCV3NvLBjqkAYc%2FMIYwzHKN45eAeO3qqOLnReW4GJ6wvdDi%2BJDz4e1IIjBKYD%2BzRq0XfBpps4IZ60wMWjUEHgBu1Rf7LlV41Oam66nmt4M6fjE%2FnLurLGLXIK9tJN1eF25k80wVHurLq3duaTiMVIhQ%2BdB%2Fg6uW8gg5QSuZH%2FYTlhyEyTM4my9Z5ud%2BK7OrYeIjw3X6RdTwctxbUGeT7JqquSWGvLSj0fm5phC%2B&X-Amz-Signature=f322171cf53fb13aa80b599ae7c0212c5ef810b6215ff3fb17946a42de437daf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4A4CYAD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCMN8pgyc4A%2FNYN2DtGSlXyfB%2BYJ5lIWJeXtqE2HdOlpQIhAKKYgJZ3INd7dDMEKaO7WAibPUnOcumZPC2X%2Ba077Lm9Kv8DCDYQABoMNjM3NDIzMTgzODA1IgyCc2QfFfC8CQLD8N0q3AMtQAh5S7wst9UW9BtzfEzF9uoINNH%2FCGM9hxDfIGqH9M%2FfJimgeIsG4ctrWqy2vU3%2BqxxtkuSE1nSYaf7gDlFVKkL3ueQGo1gHI4ztTbnbNEvM%2F%2FV3l9HDUcaC2dwEfs%2F5X%2BXv26IpZS5IjNzrZk81iPimCFc39%2FE6Ou3so917C3d3Vn5dDPig%2Bv4PKJO6Syt3IUVfPK3Eui4%2F%2BVnVf3iZaYEHhXOHg57SDFpKeVP04Lo5kWLTSlV6GSsRCoIE8J9%2BRPGNajFHD8MDcmrwfH0VBdYPAkZAB5GY2q5EmizMUZLq93kW6hcx%2FgMsS5GOfWUaJsmQCMbfLG%2BZjzsj895owr4PSj5ppnkBMYPgdI0bMAN2t3%2BYXMBBw7WXyP%2FcvCNB1kqGvRNvlkL2%2FNEClmzTKJkUVfpqtSipV4VDNE8rjgDLaG8CxFRNaS7pzwO4T2n%2BqEPBPRnqbnt2fLqU2Py4bY77NY%2FO%2BxJrmj02d4niFkRGs9uDdEFgCbRAzqIoqyAmMpKSdbx77vLH%2BTTQaCHXYhIzjKD%2B3VzHSXvgKYrqDXFbMmITosc6iHpbuf9RqNNjiKD%2F3unTvBMlfSktYlCWV6SDu6SiaiCYi3KUCh%2BZpAQO2nkppSC%2Bhije2jCq29vLBjqkASmjUcL9z6TAeuqSC9ESR0AiJSvsEU5emvhHMRNHzTy%2FaYqMRfPU7J4ukbBbzGgxaqklE1%2Bs5fAfUXP3t37Vm7jpY3cER28gUAUI8CRf%2F%2FSONayTO8VS%2B2vXLKo8FxO2sGslCSubD42GfQAN5yj%2BzIFGSpk3XX0CxWEiT%2BF8B6HVnd1MYVMDggFrMmmI0t6ZjfoVNzbjKKDEoh%2Fug7V3o41ZSEYM&X-Amz-Signature=0768430917a760343ed29d4167eeb2a0f0c20f27c29c2f82077cd4a95dc9f1e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4A4CYAD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCMN8pgyc4A%2FNYN2DtGSlXyfB%2BYJ5lIWJeXtqE2HdOlpQIhAKKYgJZ3INd7dDMEKaO7WAibPUnOcumZPC2X%2Ba077Lm9Kv8DCDYQABoMNjM3NDIzMTgzODA1IgyCc2QfFfC8CQLD8N0q3AMtQAh5S7wst9UW9BtzfEzF9uoINNH%2FCGM9hxDfIGqH9M%2FfJimgeIsG4ctrWqy2vU3%2BqxxtkuSE1nSYaf7gDlFVKkL3ueQGo1gHI4ztTbnbNEvM%2F%2FV3l9HDUcaC2dwEfs%2F5X%2BXv26IpZS5IjNzrZk81iPimCFc39%2FE6Ou3so917C3d3Vn5dDPig%2Bv4PKJO6Syt3IUVfPK3Eui4%2F%2BVnVf3iZaYEHhXOHg57SDFpKeVP04Lo5kWLTSlV6GSsRCoIE8J9%2BRPGNajFHD8MDcmrwfH0VBdYPAkZAB5GY2q5EmizMUZLq93kW6hcx%2FgMsS5GOfWUaJsmQCMbfLG%2BZjzsj895owr4PSj5ppnkBMYPgdI0bMAN2t3%2BYXMBBw7WXyP%2FcvCNB1kqGvRNvlkL2%2FNEClmzTKJkUVfpqtSipV4VDNE8rjgDLaG8CxFRNaS7pzwO4T2n%2BqEPBPRnqbnt2fLqU2Py4bY77NY%2FO%2BxJrmj02d4niFkRGs9uDdEFgCbRAzqIoqyAmMpKSdbx77vLH%2BTTQaCHXYhIzjKD%2B3VzHSXvgKYrqDXFbMmITosc6iHpbuf9RqNNjiKD%2F3unTvBMlfSktYlCWV6SDu6SiaiCYi3KUCh%2BZpAQO2nkppSC%2Bhije2jCq29vLBjqkASmjUcL9z6TAeuqSC9ESR0AiJSvsEU5emvhHMRNHzTy%2FaYqMRfPU7J4ukbBbzGgxaqklE1%2Bs5fAfUXP3t37Vm7jpY3cER28gUAUI8CRf%2F%2FSONayTO8VS%2B2vXLKo8FxO2sGslCSubD42GfQAN5yj%2BzIFGSpk3XX0CxWEiT%2BF8B6HVnd1MYVMDggFrMmmI0t6ZjfoVNzbjKKDEoh%2Fug7V3o41ZSEYM&X-Amz-Signature=7830c490c6f53e70a81853ba86daa22fd7a48b789cbed545f7d5375f954f0a9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUV472YK%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIBlVkbpPJeVd1%2BOiLv4418fL40DWCSiStAF6m8OGKVh%2FAiEAnCDKnp9RSA2GLqggfBLDO4pK7f2Km%2Fh%2FYEhbUvEQRnkq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDAxRoxCQnMem0ys4%2BCrcA2%2BCuq6fJ%2FDSCYwPD889vimQVBdPkqIACca3uRxUWwETr2TXZxpze%2B2J%2FaZsDCpBo80aNcsP38TtIbUBZ7J3lvIY7Rn%2FsuW72MBO9j76kaS2aL09sFb2FCK9ivNzcVFTqj8jaPHyvhju9SAH55G5pgdVcjKqx8INk8YyVgvY5lZDYAA4HLhdlZHXEqcJCtIlx%2B2ctrMaLxLmXWBMXfXX80zSwMmTRW2Z1wwi6JhiyZX4i0o0Tn0jdU3E2JqN8QXO6iIzvJormrzgxrEqC%2FeBtJClmgj8CmXsZTRIbIrPzmhCLArQwfwVArAHp1kxxWl57A4KtYYSxyzqf6UjqPLZkIaQzvBaurR7QDspwNqffwY4GBm9Hc7wvubopmzQ6K%2FqOYSAMdfW3fMiTRPZNH7KVdU2X89McoHU82hQquosCLbnEvxIMpw1B4Db%2B74d55uvVQdd1r2uSBP6hxw9Wgnpig20d%2BuYNA2kseWdyeJhIn6CttM2SqV7Zxaz5TSdomXzw6%2FNPKQbebqhu6rx9fOY8ql%2FMFD6xVzhBpgEbvJb73HRIvKMNOH8Z5gmq9uxSZPNbybsvxxAX54wT%2BXPFZYRyQX3KzNY9XtM2EBtLf21%2BfDLnlPY8yMdkYQshGXFMI7b28sGOqUBF5L7%2FyYyoElsW4QtTIrm83QFozybqh8Y5kurEisKg8bjyY9Sk%2B3YETjb2YVNEIdDxAaVL6vPRa3Obk2OVr54spEetW%2B4r6PjHnO9AxsPjLMnF8JVjGzqVL82w2eLIXh46hjaQhm381DyPXXfJrFT4DkBiL1WFob0KxUS6EodsbnKnrfD%2FvuOtBOI0fUCecU%2BlD7D%2BYxOujjoCXxIp3OTxn%2BAReBG&X-Amz-Signature=1c4aca91925daa7f93dde1961265a1eca66336c1bf19cc10c0e44d3a4a74a6cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSK3PSZV%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCSBZ%2FxBamhxMz7WUQTFiJkKp8nSw3SVLiHZ9h3hZWklAIgGnQQ5Mfqsn2IvuGU5ersQQVU9nhWjMgQ5w09YMRZu9Eq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPC2McSFVlWnwCnTKircA%2BhfyM2TQ793XfXH3MS9RF8WmVyuliogwPgXGBl0DCKEJg1mUf4j41KzEvw4BfTU67vg96CtMDvQkH%2FxY2yovuVrAxAKHOI7BGSxSR7H81sKjzDw7kWFKZ%2FqoU9FrMjfzjveyRuDklNzPfMnJswts%2BzvmeYN%2BndPhlnPbx%2FaddiKsPficKRw2r65XOr9YQWs3Bk%2FVAAakD2v3z3TgU5ey1jWAPozp1OZM8J3RLsczzFdJwwn6sk2yVJz1vHIE1qIIPl6RbE%2FiKQSO5kpZqM0pM0%2FBAXcsqvO082kQxYlZ0iPlCkc%2FCgV4TtvT%2FIXx3n2Ki3RvC6hakCdM0kKgHBsREu0vSDrdsjACEy7Cuud%2FaolWDbJUy3I0pfW9Ab8L07MrOnB4s%2B9BTE12FJXzKMSDY6n2gvyygeXmb33%2Fa51E7o%2B9PPKd6Cqw47wL7PZ7k%2F73eNfnHESNuMUujP3c8q0t75eqDvlIUZW5cgVJeDOVJTXfHtC3VW8xngU45EigHZ0Q1ywb8hhKJeEuxgumnGzo4qwcuXnHlcaNnwxfmVX5lQBjoyETkuukzajrpo9fh9HN4szO%2Bx7B6c%2Bfjs8Vyit0GsXk249S19dXZC6Vf00DuZClpi2V%2BRbBp0dnyhuMIjb28sGOqUBsVmNQYLevrWdeZm3PkDBsZe84vvxDi6LuT8ZmxyPXAlycRJEjLLsC21fulTDQXVKmsYJUIs%2Bo19DL8%2Bep9MslGHFwgffb1hKLDbIoI8OHtsfUhamczM04gkO6ScupbfnL%2Bb3erfL8GbZQJVcYG%2Bq481HIdBlkgObV%2FhoN49HJ1m%2FDr8P%2Bl5pz%2BpqYYpWGgbV0HBVHg1LpWdex%2FIS4zOULQlY3%2BQe&X-Amz-Signature=85a911e47973d1fec0826868123322fd405cab90ec941d25971975bd257b2e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSK3PSZV%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCSBZ%2FxBamhxMz7WUQTFiJkKp8nSw3SVLiHZ9h3hZWklAIgGnQQ5Mfqsn2IvuGU5ersQQVU9nhWjMgQ5w09YMRZu9Eq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPC2McSFVlWnwCnTKircA%2BhfyM2TQ793XfXH3MS9RF8WmVyuliogwPgXGBl0DCKEJg1mUf4j41KzEvw4BfTU67vg96CtMDvQkH%2FxY2yovuVrAxAKHOI7BGSxSR7H81sKjzDw7kWFKZ%2FqoU9FrMjfzjveyRuDklNzPfMnJswts%2BzvmeYN%2BndPhlnPbx%2FaddiKsPficKRw2r65XOr9YQWs3Bk%2FVAAakD2v3z3TgU5ey1jWAPozp1OZM8J3RLsczzFdJwwn6sk2yVJz1vHIE1qIIPl6RbE%2FiKQSO5kpZqM0pM0%2FBAXcsqvO082kQxYlZ0iPlCkc%2FCgV4TtvT%2FIXx3n2Ki3RvC6hakCdM0kKgHBsREu0vSDrdsjACEy7Cuud%2FaolWDbJUy3I0pfW9Ab8L07MrOnB4s%2B9BTE12FJXzKMSDY6n2gvyygeXmb33%2Fa51E7o%2B9PPKd6Cqw47wL7PZ7k%2F73eNfnHESNuMUujP3c8q0t75eqDvlIUZW5cgVJeDOVJTXfHtC3VW8xngU45EigHZ0Q1ywb8hhKJeEuxgumnGzo4qwcuXnHlcaNnwxfmVX5lQBjoyETkuukzajrpo9fh9HN4szO%2Bx7B6c%2Bfjs8Vyit0GsXk249S19dXZC6Vf00DuZClpi2V%2BRbBp0dnyhuMIjb28sGOqUBsVmNQYLevrWdeZm3PkDBsZe84vvxDi6LuT8ZmxyPXAlycRJEjLLsC21fulTDQXVKmsYJUIs%2Bo19DL8%2Bep9MslGHFwgffb1hKLDbIoI8OHtsfUhamczM04gkO6ScupbfnL%2Bb3erfL8GbZQJVcYG%2Bq481HIdBlkgObV%2FhoN49HJ1m%2FDr8P%2Bl5pz%2BpqYYpWGgbV0HBVHg1LpWdex%2FIS4zOULQlY3%2BQe&X-Amz-Signature=85a911e47973d1fec0826868123322fd405cab90ec941d25971975bd257b2e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X2VU4B5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T044526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIASPRJV8%2B24co2gJwxnqc6tiRUAirl7AemoTEWTg1kVoAiAKD7TFdeFwUkUUpnPLd7usCZYKaSONfv8tPoOUNy7TVCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMU9pxzfb4py6BIGL3KtwDy4H3EExH%2F%2BtKsUmcX7F%2F0uDeW6GA3ZsMr1uapqIOgYF7p9%2B9xk0NpYFGKUZEKfLGlpszTPGjXeCs%2Fi55mWAnJZ5fiX1CHnxTzFaoQZ067QIOnf9iGNiu1ApqysJEWX%2BKegwvHhdWb%2BDa4ENvbtsCbdzTG4JQN4S%2BmW%2BszGIR1i4LEFYFjSo509K6maQqgH7WdwfHVcMDnGGj0eWJAN%2Fj2f9evShFEOF%2BDkHrxRx9eiyp3RECLbnXgHnm8ImM%2FW4mSQQAiiLXs6wvDTRt5U4vEwt9HrbSCkouZDICwN909jNws1ylzRw67YZYrdb%2BzzcAToeI0L5HNIbRYZJZWBJKLyGAvYD1q3TRnEjCHEixBdyTnBNdRNv9t7MkNNbXv7oQ2oqtRrclFaxjC2Vcu%2Flf0db8IL7QupkKZ%2B41jevHqjVFI7nV3QNMXPeFQft8RcX7dAo%2FYqk%2FYdy8Ro1zUXlIQiF9%2BA%2F0nHVGxY8poGkjKAddRoXiIHa8z%2B85DW1I30sR6%2B8KT1P%2BHYoQq5EC228FWgOMXF1kGup8PSx3F%2FkR7HweO6rH6sWG%2Bq6OoVEPAVz6tQ50TQDQutRHeMjh0MPO1u6KuCTgPo4YEMHWuGZqUYkxdB82sMk6OpMPNtEwlNvbywY6pgGnhRicMHi6SV7WttJ7cF4DNyYGmF5jbm4NV7iQ9Pxe9RP2gVP9MjaLu9GPkVVLX6WPhr2KD1oFQJKHst2msCHuqglw3M%2BJfUI6anVFCE0QyJcH1lzmqLPHHJmGHkHl14LAAbjyk6b9Niwog0IV3i2iwt0AMleaGqoOQrl3MeehB2UsiIkX3xHnRtDOcW8FacUPQDQYbzmJ1nij5D%2FgscG%2FLqAXtIZK&X-Amz-Signature=311ccea784929b8831ab52a34d0675b364c4bd8784344de82015bec2b3328c07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

