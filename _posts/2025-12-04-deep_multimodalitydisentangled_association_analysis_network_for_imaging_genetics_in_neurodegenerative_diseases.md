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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WS3LGYPL%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIEsOOytKtV%2F83jZRtvXz6rVcwk3RHpOEKtzaDgK3raj%2BAiAQzHB12kq%2BHxDPMnUc04pVNjzKY2%2BoS8zHPf2IONn%2BUir%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMyG2brbucW%2B6PJvisKtwDTR39xFXwacLYM4HVUlYM3eznyc%2Fg7zJmBc0t4xwndev4RzF3ijhOLq6u%2B23iMRQ%2BbY9s%2Bjj1sOqEt9adwf7%2BsQAoE9PNNFLZP6DNmzjJ%2BdBHgdfybbRQRPkWUbCbUedcZIACw%2F%2BD1NepGteZ9R0pHpvgQOlX34N0r7U%2Bu9tKl1g%2FxDlSJ4kQrlSByhj3yZtDZpO%2BoLlepjzla3niHKc3uqgNW8LVVTCsrTEg35luSqPemdYj8JMZapTkogDVk9hXO8oh%2FvBcdwyICB%2F0O7RLoz4oobIMreSk9qgljz7Jg7%2FcR6tx2gyiZPqyBeluBK3xRRxJuuz3yGqBObmrMI0GgrgYglh8O0uXVfVDhn%2FVtuB1VE3IrRqupDiU3H8Wq6XcAIADNhnKrE%2B8oGxSUMBG1%2Fua1HVqYJzd43jvB3zZ6dzANQByKKVtQjvgV6AIRdMT%2F%2F6xMYuvfQTndFMypTcbFG%2F9YEOK3GTo%2FlKslE72vZyM1GzKn8Osxj19SdF4nMC%2FJ9xJL3OvnKrF57ALtqXpLlQJ5IRmbd3TCrupJuRAS8HicjV%2Bi0MoYsUCqsmY9phU%2Ftmp%2BnujgUtbtP4dMSuUgnwsSvqB9V34PBfJ3j9c%2FnZYy%2FdHi6COKovDnIwwqMzwzQY6pgHK0bDk4gjog5wa0sq%2BuYcAeyXjHYJpSGI0XhWPdD%2FIeXg2W7JL3JvjVKRXnWXSyFq%2BVXReCx0kzOhxeJ2TPHw5oUvy8KdjiWmAHLPdtzbGoHLeAltU6%2Fz5IjatygDSUQ4kwW0vifDbI5%2BzGzAlcbvs7%2BH7HLb8LYU2gZIIt5xRUXnsmanBp0h5drTdg%2FuOF%2BhrmoLlrS1earbstugmH3veRmDAK297&X-Amz-Signature=1acb22ffca66b15fae6a5ba997e464c3e0bd4a2029d7a23d7ba346291b4beeae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WS3LGYPL%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIEsOOytKtV%2F83jZRtvXz6rVcwk3RHpOEKtzaDgK3raj%2BAiAQzHB12kq%2BHxDPMnUc04pVNjzKY2%2BoS8zHPf2IONn%2BUir%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMyG2brbucW%2B6PJvisKtwDTR39xFXwacLYM4HVUlYM3eznyc%2Fg7zJmBc0t4xwndev4RzF3ijhOLq6u%2B23iMRQ%2BbY9s%2Bjj1sOqEt9adwf7%2BsQAoE9PNNFLZP6DNmzjJ%2BdBHgdfybbRQRPkWUbCbUedcZIACw%2F%2BD1NepGteZ9R0pHpvgQOlX34N0r7U%2Bu9tKl1g%2FxDlSJ4kQrlSByhj3yZtDZpO%2BoLlepjzla3niHKc3uqgNW8LVVTCsrTEg35luSqPemdYj8JMZapTkogDVk9hXO8oh%2FvBcdwyICB%2F0O7RLoz4oobIMreSk9qgljz7Jg7%2FcR6tx2gyiZPqyBeluBK3xRRxJuuz3yGqBObmrMI0GgrgYglh8O0uXVfVDhn%2FVtuB1VE3IrRqupDiU3H8Wq6XcAIADNhnKrE%2B8oGxSUMBG1%2Fua1HVqYJzd43jvB3zZ6dzANQByKKVtQjvgV6AIRdMT%2F%2F6xMYuvfQTndFMypTcbFG%2F9YEOK3GTo%2FlKslE72vZyM1GzKn8Osxj19SdF4nMC%2FJ9xJL3OvnKrF57ALtqXpLlQJ5IRmbd3TCrupJuRAS8HicjV%2Bi0MoYsUCqsmY9phU%2Ftmp%2BnujgUtbtP4dMSuUgnwsSvqB9V34PBfJ3j9c%2FnZYy%2FdHi6COKovDnIwwqMzwzQY6pgHK0bDk4gjog5wa0sq%2BuYcAeyXjHYJpSGI0XhWPdD%2FIeXg2W7JL3JvjVKRXnWXSyFq%2BVXReCx0kzOhxeJ2TPHw5oUvy8KdjiWmAHLPdtzbGoHLeAltU6%2Fz5IjatygDSUQ4kwW0vifDbI5%2BzGzAlcbvs7%2BH7HLb8LYU2gZIIt5xRUXnsmanBp0h5drTdg%2FuOF%2BhrmoLlrS1earbstugmH3veRmDAK297&X-Amz-Signature=1acb22ffca66b15fae6a5ba997e464c3e0bd4a2029d7a23d7ba346291b4beeae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UH2GA7H%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCuV87yf3QvN%2Fo5cJ27wyMO6eRuXt2giiLBpC2CDYVGQQIgSz%2BzmSkjd24pq0FFM88AclhMpXyN0GmohamsYHPAu3cq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDADM9Ls9YmEGt7VMVSrcAyqs7aZAYoCYn%2B7e3Sw5IS3YTHes605podhnTXkiAki67O7BRzKLu1RxRYDsT7aFrKwdHON5QweM1SwNAoOTqS3bLNf3WoAJcF6SufoWj2c3fg7uQanB5YDutY6HaVHhL6X40pnyf4bgWm2W74s2DJlV5lMogCPWGcjNae01%2BCJTPsnF1ffXYltL4TeYs50qnQx5DIqSLEBzKDHweamqKxurmmc3BXZsvSGRl1kZMJjhoAkNC7rsIeujimFbNYWUyI7X%2FDinZZOzMxgZMf34n6DVBVkl9aRVOXH8QwZaUc%2Bc2hkDOJiOZMUKoikStSPKdnKtQcoFHTgq9hA1r8yNACLsNg%2FDBFLBC8AxrOm3Ci2nyvArKFMke2uts8k9W62S5ma1MqFYsSNCuCcdof7vnqZgP%2BLUwWBduOtwVVZcY%2FFgpDI%2BYYZ5L6dNIkKA5ESWcfkN5tE6diqrFC7ECLpckqn0FzEpf9b5hygPqvZWHp9vVACoVZimXwc%2B3nRia8lwHmr5vnmzW%2FyjRNaRMc6mNoifKSr2K7p1AoOk9d%2BoYMweTPVyMxi7YIgn8twv1CNeY367EGgMb55LwMlaUe137adwMRMhGTYfCQAD8lcyvjdGZCdA4j3EXvRZ%2Fc%2F%2BMObL8M0GOqUB7ahpjwCDA02oEgF0x2aZcfh2zy6knxNrEWBTQWhLGL66HpskNQLdiuTgDuQMhtlhDtMcqExoOVfDjS5qg4g2mC1opf2nDVpqM0VisXCKrq23OWzgm50RmBw%2FnyHhKiQWEmDszV0n%2FcZ7pUL78JUC3F6lccegnO9zwIfpML6nvckxXyHP4KaOvOwfM%2FuiI2%2BSQTuqLsqGWC5NCDX9xgzaR%2Bpih%2FLN&X-Amz-Signature=3a0c24cf42475da2e4adec0883bed7448695c66cb392bb7c1f19473efdf0eae1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBPWMVB6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIE2rwF8LvutQjo6UBtrVnzEoki501Mp%2FwBQIrf5dFCfAAiEA%2BCpOPlbI%2BUFvDJc8vtMZEFIiPnjWOzypTaAhThRQhT8q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDH6Dx1RpkzCOcfC0kSrcA5EwDGyM9vibYjAo%2Fu0L37yjXR8qIaTAo4rwYnic6mjw%2BxU%2B8Kw1erQHEGUosJKea1jSFjoWvGkozz1kZ4BBXQRupiKH0ALEsjfVAyIuB7NxtpT5UPuo3MJBzWAEcsuZEY8cokqSEy%2F6Q4fXsUa0dqksKNOjXF0RT9wYq6o6gOaLQY6bfyeD5O%2BSGH7nXTVrZ%2FUP69wSSIfMWgnHLpJtESkAOzZSaTPRpRc140qLb4CNJVePc6OLvtzLes19ClaLKAyVrbmHq8HH9lp0x%2BZdX9OlToHNuJtE%2FmwNxNrSwxToIPexUooFlOwRHezAGLLgEUYQgMCdk5fuXAid5wegKcXO58FAOYrW8gIbnyLCdQ55VJcV4YxqNS%2F5JlRi%2FJn0im4eXcA4FVIXvmxHDgNtHZNnv88KymNn7TqnjCoZ0N5FVqt8qGxdldhtOGmocpLXpgudUaNK1TpZGt3W%2Br8QW0jnZU1u48OyXX%2BprW3j4HdMHVauOSqjValJZkJa0nMNXQk1p2sTMmpRshd%2F%2FJP1ZfWnvoF%2BN8UMT7tlKK33%2FE4ZUYOCw48q5xUXJUVINgYZwlksohw5loQagA%2Ba7c43UwNFNnEavQkjRQidkavYwPLo9ooIU1OGiKcZrhYFMK%2FL8M0GOqUBbE%2F54sdbUQnO%2Fj6X0eEWmwc1YO7tPjW1CnRvWldWD18ix%2BcNPVuFG7uTEH1AcRNIbEjyh9rvVODB4vtPTCIU%2BZqn13fucZeoMeJCEUEeuRXsigAUz8e37XmwZEgDOPalOPYXVoY12bER95YQRhSl05%2FtSCZ7%2FOE%2BA1mzeez16nZ3WwaYWw50nHFvhvKAYMejGDBcPUfTHFZy0BLb7IL8xChg4%2BMg&X-Amz-Signature=4558dd68aabd967eab2565f8481f7b74971baa36f661a4ebed019ca128244804&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBPWMVB6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIE2rwF8LvutQjo6UBtrVnzEoki501Mp%2FwBQIrf5dFCfAAiEA%2BCpOPlbI%2BUFvDJc8vtMZEFIiPnjWOzypTaAhThRQhT8q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDH6Dx1RpkzCOcfC0kSrcA5EwDGyM9vibYjAo%2Fu0L37yjXR8qIaTAo4rwYnic6mjw%2BxU%2B8Kw1erQHEGUosJKea1jSFjoWvGkozz1kZ4BBXQRupiKH0ALEsjfVAyIuB7NxtpT5UPuo3MJBzWAEcsuZEY8cokqSEy%2F6Q4fXsUa0dqksKNOjXF0RT9wYq6o6gOaLQY6bfyeD5O%2BSGH7nXTVrZ%2FUP69wSSIfMWgnHLpJtESkAOzZSaTPRpRc140qLb4CNJVePc6OLvtzLes19ClaLKAyVrbmHq8HH9lp0x%2BZdX9OlToHNuJtE%2FmwNxNrSwxToIPexUooFlOwRHezAGLLgEUYQgMCdk5fuXAid5wegKcXO58FAOYrW8gIbnyLCdQ55VJcV4YxqNS%2F5JlRi%2FJn0im4eXcA4FVIXvmxHDgNtHZNnv88KymNn7TqnjCoZ0N5FVqt8qGxdldhtOGmocpLXpgudUaNK1TpZGt3W%2Br8QW0jnZU1u48OyXX%2BprW3j4HdMHVauOSqjValJZkJa0nMNXQk1p2sTMmpRshd%2F%2FJP1ZfWnvoF%2BN8UMT7tlKK33%2FE4ZUYOCw48q5xUXJUVINgYZwlksohw5loQagA%2Ba7c43UwNFNnEavQkjRQidkavYwPLo9ooIU1OGiKcZrhYFMK%2FL8M0GOqUBbE%2F54sdbUQnO%2Fj6X0eEWmwc1YO7tPjW1CnRvWldWD18ix%2BcNPVuFG7uTEH1AcRNIbEjyh9rvVODB4vtPTCIU%2BZqn13fucZeoMeJCEUEeuRXsigAUz8e37XmwZEgDOPalOPYXVoY12bER95YQRhSl05%2FtSCZ7%2FOE%2BA1mzeez16nZ3WwaYWw50nHFvhvKAYMejGDBcPUfTHFZy0BLb7IL8xChg4%2BMg&X-Amz-Signature=1325d746d2420dae192d947387373e7340d06b229aa2dff2d400ab6e7dd89d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGU46NN3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIFxUzeR0VIjxvTGCMpRH6hXh2KlmYxfnGE%2F95vo%2FJ2fVAiEAuHxWFf8VQMBTCGuplEQh0MmK%2BaSqeoZdoM0S69jtx7Qq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDB36xh0yq13zRqNH4ircA7yNEPw4XnCkYCox9oH27xNui6gR%2B0ElFoPs0URAqofh%2BmnJUdVZGRLCkyBHj3AiYK8XVmJlk2yp6SVk%2BNhaT2%2FHlGE%2BU%2F8r05MKhspknatPKJRCe3O4cQLXSd2hIgD3kU3h1ThZ1wYJD%2B7hO97JlllVi7Jb%2B6asrnhmTGJj9UQYjT3V7J5qtf%2BWAKQ8HiS5nT9QWc2i9dnHh1nIQmSe9JQ%2FTzXYL82n%2FoCu94bMxknK3hZ6JlCz9QnqtZQ4jbG0VuyihWGvZiBxhrUMCu5YS5vFExhex90xBz%2F%2FcFslp9S%2FAInXK9nzNktoEn3VJUnJxDEp0cTa7kVjmaif9Diu%2BQYKi6xkkisZyxmFA%2Frq1DrFR6%2F%2B659Jepm0aZcFsxPgXPubJZ1GrngVjS7crZG1kw0fMtd%2FAL%2BlIhd7h0CJ2%2B4zTZmb6qQ%2F82dX07xzGlyXJssg8%2FyfvJsyotqAmqN9t8y9zylSzqL9DxTtHOrY4rSswQ9G1U4kzT7fBZdm9lDFQxgfpQbup1ywGj5AfNEf1hhvxEAV4jCumdneorR5kINDlVpmLi%2FRTyL2LVBsrzUek2vbedJeIm8x6tjkH6nhshh7vvOuTv36PjHpVJZ6PTT7Wr9gTLDCYTL1kD9dMOTd8M0GOqUBKIalpdg5EXlEkJe2F956dHkd%2B1L0GoMuay8H44t0Tyq%2FXW7S3FlFKKnHQjliWoW76yTQHyw9NJm%2FMqZaPywSa4P4VTRomxRk9mz2si3Eif4xmLv95WegnCbSuqLKs61URlqSejR9Gc8HTocy4f4O9rOCRXGjGocjhxqyBB8%2FNDzwZKExU9b%2Fj%2F7Tj3hyz0xQyYlwMDUT%2F5pluVs611R%2BxfYrSqJn&X-Amz-Signature=97f94c4020fbb6e0a5f9b44e3df5affb1896ba65c12cd00f56820a052659e402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDROLOO4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDGRgv3rtn4Eg7Pq7mUXB6lP1azJbPJT1D7ehd822Di6AIhAL29NES7Cp7IkCcp0ZwPYvib0KD0P%2FW1z2%2Fmd8EilOhnKv8DCCIQABoMNjM3NDIzMTgzODA1IgxL0ktjhPwStNquaoUq3ANcessLBQExK0XjH0rI20Unfk7VGkI68rC%2B63FZOuHsXiChD2lhxFqSZudZAi4sSory8FZ7HhUaOvnVk4q2ffhKfN5JOAQBSmQ4gEJfiPTLRTB9KFamxGm4hWlGWFvxt4yjHwHVBCOJXUUWm%2BuAdyVubiMmWbJ2%2FxR7TLW%2FDOWSJXnrZEHcZ2iVNLZYZz2tGEyTVuMHe%2F1OAwtE9gGAiRbT5vHq8fUq303efWn66WWJA6cqj466y7dTGBHlRM8K97sE7E9lVoP%2Bu7oZ0mIRjPe6qSOnw6Y3ZD%2BxdeOwy1eSFTqTtuAqdymhUZarXiivue%2F6C6uqzqQusSJjZAzpUk2M3UslZxtw6fcdVl%2FY50tNe5qZY7NolVyfL4eVLnbyynPd0reh9kMxJyoH2Bn0R9jJFdmNDmJE5faYz8tdU4t%2BdlZvhV4iGOaDZql5eUJXuKwIHdTdXF7gyp08hwy7j8hG%2B1RkXJbbn%2FMKRXHcFNejowA28lGMey%2FTt4zMUi6XK2lXV6%2BRDiq6HI3kVNJjrJhQeYQzf30FyV3Knbu4NEu%2FO2Vq9cVZb0oXcIt9GID7C4Gv0OCeNSkWCwjq53atdJNWzEtidMTuIOFQXVBsbMy%2FfXhazGFbut4vleRkWTDEzPDNBjqkAQNe3AnMleXJpfSOhCVWvLPifX9wWdZRYNHNaJkKZIaIhBBK0DQjnai4YdNjQrSI47pEpc5OdA9BB47amorsDr0HygyIKi%2BiAp5Q5jBPBcN1%2B1LeeRtgTXwb0eVLcQxfxTpf69NRA6wFOq%2Fji8fSsQf6WS%2FDXxRtZCAbERQmtFlZISXq7TXipxlYMt0Hlq5%2FP4la1wC%2BrO%2F7qWzP1SERYLJVGllR&X-Amz-Signature=c41947172e92101f1203d26aafe88d2d5d89ded0a8eff2d4c27039a6155166d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466234NLY3E%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIBfFJIyDEx5UUWbJn3n9wumH4H89glhUK6a8Utn%2BqmKDAiBsSn%2FejyL5EIO19bASpSGAV%2FGRTavpyypnXRXpjIIWcCr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMnEcPuGyG%2BysuxT4iKtwDgmhSj%2F0PCET%2Bpu4BRLrkS5BEi4e95ryhgfovNvxlh8KDY1Rmy7%2FpfXTNZUUqHAy%2F1Ye2%2Bbsi90T%2Fp%2BakW24DUlM8kBT7ngRe7p02KiT7DwuCeQgiRjLzCWYZ9vPoXgB1B0oncnX%2FF2Qxz86wrCdraHcyHAPePal5MRjwmdUl7YjAQ0kjZ4B6rAbl4TO36LNg2nLWeMb%2FliChXTwJRO9FyrZhbeNjqpf6jo2EJ3hlfA2nfI2dCnsi2M%2F56zqxra477UHxmDxg3VOxzOcsq8d9gOhRXHSGkBTNKmiWiRPR4MxVoF07JpXd%2BztGd800UdSNqUApbKkJZNhhSNl6msIgid5JpnISIDlOzdkXsxtx%2Bik2oRLkWdBpG5dFJ%2FLACQVeCgCEuaikuK%2FZ6ddX%2Fo0%2BqL8VDhspvkI65PS2yf6tw3LjnbZtYWFaxlX3AEJFjUS%2B0Zceec%2FXdDcSADvgl5Sxr%2B8cL6LlmNI5i1o0H5Iam2LKZInKgT7Uhx1gvwgID957dY2GHVAXlNNAhbtQfXXy7znWgbRnk8nNMDMv3WdJU19bmPuPxZjt9jF7RSMh96DihA%2BrZ17o%2FDBDrBHrMD2tJC5aOH1ybQiIoh%2Fj9WZ0KQ9e307ikO0cjUtsvM8wjMrwzQY6pgGy%2B1n95%2F2PXWHCxZ81rM3T0XaKJ9RQeby%2B%2F2AMNgO1y5pQvtPRM0n9gqFEPD8bIEmbOUs5HiZezURG%2Bkwg98R8WmiDUu7SgNWVUG5oZkVQBivUm0TGbe0MYxgZp%2FG1MCvKeKZlEKviZXJPMx153gtD2zHRMQ8KTe1FjRBdOyzgiE1jb%2Bd7viGaUp%2Ff4gHWFCY8lxWqwpxbck%2FKfLhuZR1dwEhA1Xm9&X-Amz-Signature=32949f774da6c3d8c1407317553c94b2bb59e427d0d9bf437752b418cf0eea85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OSKJ44W%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCxRVuC05ejzcTIlLmkBcKheyeyYqB7xM%2BQT78h6tQQhQIhAIrrWwagsPM%2FQeU%2FmFS9UJypRHj4CWbSbY5oZnu5dHRDKv8DCCIQABoMNjM3NDIzMTgzODA1IgxA7qqqinbui8tiOVkq3ANkP7fxbMwaf4qjAk9tHqT2aLnMkCFHUraD3jCTnN%2BGVbcIeoa2wugK7m4oDKRKCx6vW56SQBu%2FNU4Y3AqOFfZzBWtuG3CT6vSjnNJPu628f9OqkPTPuKbFWQX1lpWIBTe1DoXmbSrA4XxGzjaEZAUy0W7v8PTWLCpyVxj2G1b%2FgeVOsE1KSWX9yAN1I06xjmQwA1Z5rrcVEOnhDdfwM0H0EtJ4GsFAN3zv01OY1nlReOBKIEwvNNHx8w7w9dioa75AZNdbWMd2GvYsSKJbT97gdqhwBrXEx051U43FXuLpjmrYb6bOtKcJM9UB6%2BE3KOrjDY%2B4%2FUKYlBdyIVjWMXL2mvL7CHGkI%2FJD8TPiPWVJR7BgCwPNVwH4csIExqqAkRaTiFTg%2F8mjIgox%2BmNjJfnoTnuKkUSnTJhi2d14cPpsTpPpN5GLT3wwtqWoIo%2FSeW5RCZBYD0LmkD9kacKCOTfHll1h8v1xY1RkNgN6BBwFwh5C7kyo%2BKUi27FXxolSIBzqJcP3ffWNr39ceii9zT64RGPgo7fu0XXXlFT34%2FQyNzRs0TwcI29mgI8cOu8z2UbKuB7M2fN6uJRxWf1%2BuU3iBVV%2FZd42S%2FDwifOuAZCMqmRxnjZVtddRugO8rDD9yvDNBjqkAQiHXfZ61%2FmVpOPvZKZP5rJYiXcZf3wKdpv%2FEZ6zaHVeY7aFR7r9gLQRg8x0xCO8HpGlENzk7plFKzdGfXPl4IqCBg07Z4PITPySXswmAZi6JiU40d8IIHuaLBJRzycfkGG9pkxfur2GmTs%2FFPSbRynMYSZQONLPsach0FqsN3FzmKkB%2B5dLnO20txEI10zQCSv47KUzZPe0bJu6vE%2F5SvIQZ0Kn&X-Amz-Signature=01f4a5fe1b693dd63814b860069ba266fa7ad9bc8a671f0be05395b0e4f82334&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OSKJ44W%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCxRVuC05ejzcTIlLmkBcKheyeyYqB7xM%2BQT78h6tQQhQIhAIrrWwagsPM%2FQeU%2FmFS9UJypRHj4CWbSbY5oZnu5dHRDKv8DCCIQABoMNjM3NDIzMTgzODA1IgxA7qqqinbui8tiOVkq3ANkP7fxbMwaf4qjAk9tHqT2aLnMkCFHUraD3jCTnN%2BGVbcIeoa2wugK7m4oDKRKCx6vW56SQBu%2FNU4Y3AqOFfZzBWtuG3CT6vSjnNJPu628f9OqkPTPuKbFWQX1lpWIBTe1DoXmbSrA4XxGzjaEZAUy0W7v8PTWLCpyVxj2G1b%2FgeVOsE1KSWX9yAN1I06xjmQwA1Z5rrcVEOnhDdfwM0H0EtJ4GsFAN3zv01OY1nlReOBKIEwvNNHx8w7w9dioa75AZNdbWMd2GvYsSKJbT97gdqhwBrXEx051U43FXuLpjmrYb6bOtKcJM9UB6%2BE3KOrjDY%2B4%2FUKYlBdyIVjWMXL2mvL7CHGkI%2FJD8TPiPWVJR7BgCwPNVwH4csIExqqAkRaTiFTg%2F8mjIgox%2BmNjJfnoTnuKkUSnTJhi2d14cPpsTpPpN5GLT3wwtqWoIo%2FSeW5RCZBYD0LmkD9kacKCOTfHll1h8v1xY1RkNgN6BBwFwh5C7kyo%2BKUi27FXxolSIBzqJcP3ffWNr39ceii9zT64RGPgo7fu0XXXlFT34%2FQyNzRs0TwcI29mgI8cOu8z2UbKuB7M2fN6uJRxWf1%2BuU3iBVV%2FZd42S%2FDwifOuAZCMqmRxnjZVtddRugO8rDD9yvDNBjqkAQiHXfZ61%2FmVpOPvZKZP5rJYiXcZf3wKdpv%2FEZ6zaHVeY7aFR7r9gLQRg8x0xCO8HpGlENzk7plFKzdGfXPl4IqCBg07Z4PITPySXswmAZi6JiU40d8IIHuaLBJRzycfkGG9pkxfur2GmTs%2FFPSbRynMYSZQONLPsach0FqsN3FzmKkB%2B5dLnO20txEI10zQCSv47KUzZPe0bJu6vE%2F5SvIQZ0Kn&X-Amz-Signature=fcd484f9033df85233e4b5cc35fc5b9682933b14571746a2cd2d3e1a507de052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXVSLOO3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDggTnDLgel5JZtPeZEy6rrUCCj%2FRozaPiPxWPcCVKGPgIhALlM6uB0GQVcReNhoGvv1xmmQMHYlJIRNiC38Naf%2BdBfKv8DCCIQABoMNjM3NDIzMTgzODA1IgzhgQyUNhGUmd0B%2Fywq3AP5RcAIVH6Ck53K%2F7v4Ps%2BWZDrepTmQW8dSeZa1%2FRrHQnZZzDEpLz1J57tEbjX75p%2FdedxJtQ8mkAiuVfYzwBeBorSEs7k0ZHmRD2o51G0viVy%2FZFOqwGtViR8xfHUTFap%2B239wyYE8fr%2Bdb9hGSyalVb6Hxbp4Z5rYHTFMFctAg%2FS%2FG%2B4i4pcAPRUij4oIVl39X0FFw4YnR%2BVJvj5Ox1dibDCgnKMRypqg7zJRvaM6Yh1Qh3dOBtgc%2B4tuot0nyy1wW2nXGyvbdoHETDJVIeYysTxZSTWa0L6JnzXj13ldbRwcxswmkPesbpF3IjeZLNSynsPdlKO0pl8ULs5sy1MStBWAjIvP%2FJLQr7yB6TgCsUOQO4VP7hDuJbo9NIY0lDbdSIdW8Sz59Sq7LmdnzVl%2FN8WK%2FxY%2Bxf4NfQIujxosCZodxSnZgyKUo7LrhYil05EYPJn2Mhge7gL3VCG9Z4rIizErm40PJuKkIdJbcmDq%2BILr8ZH9tUoMod1chf2bNqHI2b8RdazQ%2FDHx2l4HWQv9zYpZpFdbSdUAklNZnFeGzu86SYNSc4cqkHzLn25LZWm4Q%2Buw%2FBolcS3titLtJXOg1yrYPXm9sA5eqQ%2FHC5PNqJE3f7NB5VU7WtAPHDD%2Fy%2FDNBjqkAV4nI8NGUeFhHnUJmzuVCsOOh2YwnmKz3isX%2Fzk%2F5umGAD5OW112UhObnsaaGl6mI9%2BkEH2K5Vs47XqzbFQdsLF3baZengLqJ9fy6iWQA6GM14sKz2J3jgBNxJZqTMxwjHJph06JZvWEmwNUHJFrHlT83vKXX%2Fzybbk7T6ZvPVPIvBUJfJer36dv7cof0ZzbuKUCuu5oreT91p7IHaVMDstutnsx&X-Amz-Signature=96b8a10a86f6ef5088ae016dadad43853c7710c3156c10d05e8d64b3ce6a4947&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNXXCEHE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIG1uxeUeAXsxWFt%2BfhfyDiYi7men6DAwGN%2B39lRWysXZAiBtKrSL46qFBAG3fnkc2MNmzcClHod%2B0nS%2BS9iwiuonlSr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMWXHPz%2BYN4izp3x%2BJKtwD9H0twDbpX%2FsnKAVLHpqJGGNiZWSD02UR6wCcHdUbd4sXIFVSQaO%2FHSIoEFZ0LLRyTOcvIqMEhWa%2BcG4%2FbaaFyJ04wy04D0m5p0ksp%2BB%2BWQ%2BWeUjQBhVqxQ338tWH1ZcszapovDcmzzErogC1rFLZEsMDnUTXOB%2BWKhoSV3UrZIBw3BQYLrUu3IUncL%2BlViMyvHY20ExgHd%2FErelpUsVgDehGQp5MmujGK3LNeAucUqfKoV%2FKdKX0WkHX%2FfMjcOo4dOWWCuXpbs3shPC7L8KJ3sVwhxqRTfWeEFktYk90dKRFc5U8UiqOBFt%2Ff1AgFP9HEHD%2FyrNz5YgENhayYR%2BIeRKeuwBSfeez2GphMTEWLoGpAnIpfqqm7Iim%2BIVFm6Po8gL5VkG68nr2QydG3F2MjJFGwsCXerDVDhmRyXTERTCHCsFHVWEKzglroCjEI1bBcxBjqnic4uVs%2BQKcqTjxER2DPk%2BviierDLJltRd6a7lt0TXDG195rb4oDx9Iecc4x4toy8nYTbOcsWrsqLy8i%2FF8bhs9ErdTmK2mggqYpQ1ZMID34tpAQ0fl%2Fc5RWobNUximFCf%2Fi6b8cZdztWUItpqCI4X7ZSWoQpcCFHTAKSm9KFf4VjqzbGqzqksw%2FMrwzQY6pgFT5bLQN2gM40Tr8A4yVUNjixr7V%2Fx%2FKBW6CR%2FqxMROd%2FIMAKn7dZJVT4trv608GtCBUFQk4T6zflBFqf9B8Z2wx986ixb5qmiFjZ5tkpoCidCQ%2FZleiRQoqZseyeshl3zJ9a58pnvcKmF4o1EDomw5zFa8OU%2FIio1Hb3OoFzMqWCskWSYQnYjNWHtPa44uLjVAjWQJ2X5AufGHDV80JyMMinMBUWfL&X-Amz-Signature=2a15d17c873aae14cc48b7629887bdabb9152c7c9c27b18b5b8e89e7a6cda296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNXXCEHE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIG1uxeUeAXsxWFt%2BfhfyDiYi7men6DAwGN%2B39lRWysXZAiBtKrSL46qFBAG3fnkc2MNmzcClHod%2B0nS%2BS9iwiuonlSr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMWXHPz%2BYN4izp3x%2BJKtwD9H0twDbpX%2FsnKAVLHpqJGGNiZWSD02UR6wCcHdUbd4sXIFVSQaO%2FHSIoEFZ0LLRyTOcvIqMEhWa%2BcG4%2FbaaFyJ04wy04D0m5p0ksp%2BB%2BWQ%2BWeUjQBhVqxQ338tWH1ZcszapovDcmzzErogC1rFLZEsMDnUTXOB%2BWKhoSV3UrZIBw3BQYLrUu3IUncL%2BlViMyvHY20ExgHd%2FErelpUsVgDehGQp5MmujGK3LNeAucUqfKoV%2FKdKX0WkHX%2FfMjcOo4dOWWCuXpbs3shPC7L8KJ3sVwhxqRTfWeEFktYk90dKRFc5U8UiqOBFt%2Ff1AgFP9HEHD%2FyrNz5YgENhayYR%2BIeRKeuwBSfeez2GphMTEWLoGpAnIpfqqm7Iim%2BIVFm6Po8gL5VkG68nr2QydG3F2MjJFGwsCXerDVDhmRyXTERTCHCsFHVWEKzglroCjEI1bBcxBjqnic4uVs%2BQKcqTjxER2DPk%2BviierDLJltRd6a7lt0TXDG195rb4oDx9Iecc4x4toy8nYTbOcsWrsqLy8i%2FF8bhs9ErdTmK2mggqYpQ1ZMID34tpAQ0fl%2Fc5RWobNUximFCf%2Fi6b8cZdztWUItpqCI4X7ZSWoQpcCFHTAKSm9KFf4VjqzbGqzqksw%2FMrwzQY6pgFT5bLQN2gM40Tr8A4yVUNjixr7V%2Fx%2FKBW6CR%2FqxMROd%2FIMAKn7dZJVT4trv608GtCBUFQk4T6zflBFqf9B8Z2wx986ixb5qmiFjZ5tkpoCidCQ%2FZleiRQoqZseyeshl3zJ9a58pnvcKmF4o1EDomw5zFa8OU%2FIio1Hb3OoFzMqWCskWSYQnYjNWHtPa44uLjVAjWQJ2X5AufGHDV80JyMMinMBUWfL&X-Amz-Signature=2a15d17c873aae14cc48b7629887bdabb9152c7c9c27b18b5b8e89e7a6cda296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LQJYJU4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCoowdGpQtbqo46FQADHJnPLzF42nUJcDonUZ3wbCo0cgIgdNtxc7z86PnJ5f4c1LoC%2Brm1%2FIjrlm1ly%2BjEX2kGrBEq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDJZ4mfoRrMrMhMeu6CrcA56HRaKvHwA6vOYQhix5fMgfi8pbKnA0OYqrBOzR%2FSManOar0KdEsjHxaR3MHn3PRUtAoiXtgVwp00v4Hvdk2XOe6EU5GxbagLe7S22S8PB%2F1A44t3vIqNiYqkbiHoqmnubnjn1flNxZUhPBQcrzo0rI4ozR1x%2Fl2pFFiMnepjZfGSe%2Bo2vZ986HU8nrxjJh%2FZtlDNh5m9PKw2v29HBSwTbYD2G9mnLKSC1fcSzL6wySkiJ20kN56cQm1vhAGCg6%2BW3DGN7ZkuSm8U8BNRBEeeO%2BWh5rt0YlMf84L0qMsWo5Cf6SFkXnqBvmjmJn7o1Z6HJ4ub4UXURgNqO1cb949Mhnq2hk5Hmed1fcTUL3RL2AEW1nzeqP9nZOTFVtXoEBVWJjx31IJxulKs%2Boq1PnzBUfw%2BsVxZYy2C0mD7E7JxqWMMx0Dd8GH0B6mgR08tujHAtE%2Fpu75gHkyTZrPuhXRISa9T0ejkX3RwDiSlKa%2FpO01FHmWh2nVTrd61p4gmx3Qr3UqOn1NrvBOjJlZdWprm5xaXsRaPxSBDcWGbhlp07Qog3rq79GbUtUIUaVJdTLl3ZbxOrszs9E9yTpoQ0KOknNukxBGEOcvXg3Mia3K%2BL%2BEfVnCyVPL2Lsv5TfMIHM8M0GOqUBNt0nUlc3WMHl9AnCx5b8UukjoRbzxmKteKhbjOL39uFzkySaoMVDonwk0vVhVYQd7%2FYin93SGH%2BWIIVOIdZ%2F6%2FNlRuPR7u0Cky3LjGhOa8y%2B2LKIckflK5JnI9L8w0w717VPJzTEDxIYDKL5HhU0ca5pe8W1OkIhUa3IvMulFr0N2UsrIIhLDSeCLBb9uP3z4AJ2uob0yrbXiMugsK%2BkVEC8b6D%2B&X-Amz-Signature=943f5f749bbf6c6b3e99d58c1d883fd0249b8db2e9dc2cdb16a8328c79b3541b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

