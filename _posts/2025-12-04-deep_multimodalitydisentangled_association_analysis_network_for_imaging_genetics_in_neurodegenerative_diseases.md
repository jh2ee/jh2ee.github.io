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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAKJZSTP%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIAM0VXXybVrcWu2jI8m2DrEgVOD6l5tXSS1fO1XsEPMNAiEArzGD%2Btlgltf7hg1Xq2CVR1LVYCikLuNR8rODVhRSUloqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ56Yk6KHU%2B9FGxOvCrcA8EgD1c57mZGIXD%2BwryNgGmP8RBlUi5ScR2D61BwA%2BQtE3NzYQAzUSoii7qZ%2FQBQqJTGjY4xk5TZASSwx8%2Fw4G19nGQN3OexXCPQULmKE3I8PZlI9LJC50nuamukMc3B3OMam6%2FZHmhaPTS04TpplUYpUcJ3ZBIUO%2FizXfy57KIFUf0YocserVaDiKLFNZByC7DGlqXJxjC%2FIN55Ymi1XhpAX3hRo%2Blw9wJMXZh6r99OlvIPRt3ponW5MOcCPHVTmjvfwOeciBTmgAHeRXXzBeOcKBgzXBXW5LihDul2eaq7vrhPPltMHAfjLRiou8xpmp9HlwB8HSLfBsarvMjyycNVQoX6e2PiBfhxXv2ZjP%2BOAZimqznu2%2B9xwpP7BdtwV8J2pZRKEk7E9%2FFlUW%2BZfe3Qo6oWmRud1vK4lAvqWD9ZvV4NnkWkbeZpQiIpildvBD3aBS4H4ougGYqTK7qIoZSZpLztkTh6uaq4se9KSfJHwWhHuPXqtK9ASl3RY%2FczxnWWQXds2Vzf86aMYogv%2FdxOxLGmIlL%2F0p1WMvVPD280UFq4MB5NaZ1TiIfni2ZdtiFJXhyrpLWPu%2Fq7FWjEjK9mH7GsWXIvqUYcf4irQ%2FskQaEzVSu25bd8WscNMJ7Zlc4GOqUBzNbf7EIe%2BD2wftuBCrDmUl471N33tUaYyiFUm7cWBSD%2B6U3TJ%2FcNEVdc6i2BbEK5AkFWicboCo6XcnTLu4RA4oFink%2BNXO6%2FrgIlDxsQgcFHQSyAsIJlKUKrY2fda8jyFCCFYlddWI3Ab4GeNFmIECJzsNagutFXCSh5pyo4xMilzYsKf2tAkqxFh8Gocdrb5kgAyejHfvFhh9huM5PF0Hc253Fx&X-Amz-Signature=29018abec6ad661a0c75ca094321ad4dae9251f667a46919a501473f782da056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAKJZSTP%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIAM0VXXybVrcWu2jI8m2DrEgVOD6l5tXSS1fO1XsEPMNAiEArzGD%2Btlgltf7hg1Xq2CVR1LVYCikLuNR8rODVhRSUloqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ56Yk6KHU%2B9FGxOvCrcA8EgD1c57mZGIXD%2BwryNgGmP8RBlUi5ScR2D61BwA%2BQtE3NzYQAzUSoii7qZ%2FQBQqJTGjY4xk5TZASSwx8%2Fw4G19nGQN3OexXCPQULmKE3I8PZlI9LJC50nuamukMc3B3OMam6%2FZHmhaPTS04TpplUYpUcJ3ZBIUO%2FizXfy57KIFUf0YocserVaDiKLFNZByC7DGlqXJxjC%2FIN55Ymi1XhpAX3hRo%2Blw9wJMXZh6r99OlvIPRt3ponW5MOcCPHVTmjvfwOeciBTmgAHeRXXzBeOcKBgzXBXW5LihDul2eaq7vrhPPltMHAfjLRiou8xpmp9HlwB8HSLfBsarvMjyycNVQoX6e2PiBfhxXv2ZjP%2BOAZimqznu2%2B9xwpP7BdtwV8J2pZRKEk7E9%2FFlUW%2BZfe3Qo6oWmRud1vK4lAvqWD9ZvV4NnkWkbeZpQiIpildvBD3aBS4H4ougGYqTK7qIoZSZpLztkTh6uaq4se9KSfJHwWhHuPXqtK9ASl3RY%2FczxnWWQXds2Vzf86aMYogv%2FdxOxLGmIlL%2F0p1WMvVPD280UFq4MB5NaZ1TiIfni2ZdtiFJXhyrpLWPu%2Fq7FWjEjK9mH7GsWXIvqUYcf4irQ%2FskQaEzVSu25bd8WscNMJ7Zlc4GOqUBzNbf7EIe%2BD2wftuBCrDmUl471N33tUaYyiFUm7cWBSD%2B6U3TJ%2FcNEVdc6i2BbEK5AkFWicboCo6XcnTLu4RA4oFink%2BNXO6%2FrgIlDxsQgcFHQSyAsIJlKUKrY2fda8jyFCCFYlddWI3Ab4GeNFmIECJzsNagutFXCSh5pyo4xMilzYsKf2tAkqxFh8Gocdrb5kgAyejHfvFhh9huM5PF0Hc253Fx&X-Amz-Signature=29018abec6ad661a0c75ca094321ad4dae9251f667a46919a501473f782da056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VE2VEZYX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCICdK2Q3iN0se44A%2FhIU56z6Oto91qurvrFlye2vXTidrAiAdCMh0HnjQ1KVe53Y0bTgpGZF4H9tkPBkRJmakrhQi0SqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6nwNyTVKv6aDvyhjKtwDmrB4CZeBJIrmABftbK7v%2BtvTguVWBLbziFljuI9%2FvutFp82HjlTSDQ1PtH9txgCcURpgQkg4XGQplJo3YY%2BAbhE2yNQ5vHS4zxnsFfwPks%2FRKnACtm8fpXRwqlCHDRoo0cVG3bUf70T%2F3odqppTI7yWZlfmCkKHg0t9yX%2Ff37J0i2RJmIelytHhxPr0fBS67THbtR3gUlQSg%2FQOBy0GMCY15vwa0ZHhPhxOLRBD3GrSV%2BJECSZHs0gj3bdzJMyL%2Bv7Q%2BnhbzK%2FDqovK981cwr1fwzMPy2%2F3vSnQo%2FKW2Fm1O4twkFsODDfAG0rYm99eeAg03da1h322%2FsnNxxyF2ACMmEnkqkOzWu3ZHDx1xXlAWHWPB8AfHSTksBEXN3OoswXxyVOYJeuvUuF7wvH2SL1JgKuHYlsexyPBGisibsUlbY%2Fijm2GRaoLWJp1JvtImuIKMn1vhU13Uv4MDypK0MTJuYIj1aVP7mgm5hGviTgSaahlRTsypCGwE8spL%2BfJ75ZO8GNIxlDxssSQ%2BEDmJoWdFfbFP674gik97AkQr8iu168%2F%2FNc7%2FzZNF%2BgqOT7PgH84x07zoAPf4aT1Rjj5ebzriyXhJ23wgcXuAtZ6TSFS7XSby7IIBqZO3lAsw1dmVzgY6pgFwh6LI3PabL2oE2u2irDJDrwQxvRwmf%2BPegZWEct6NFQdE9XxMXY5Oa9rAVCaz57345co7FaNuXUtmGuxnlmamfFOiPv%2Bt6XTWNAlj0hX3RQC2Hcfxn0JFRyChfdvTlGfDpiPMv1cUwQWp%2Bf8%2BzDydUadTWqiNZJs6mJrKTbqSpf1wMOLSuUC1C5hhLtPYdGHUnw2JN9FRppuYn0561QXcM1Ej4TZZ&X-Amz-Signature=37f2eadff60553e4b2cb0bf595e65581973ef26a6a61d92b5d7020e44c9e87ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SY4BRGIG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIHzcpIT2ciMSrscBDxCE0zm%2BNO%2BU5FHnxZomvulq5FnwAiEAznBUUq9EKuwjwq6jZVuVW2ZTfq7iVyh6ardQKgrrwX0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIgBxDrbPwfzIOEnvSrcA5A4HfhTkUVBHdsZxCbivdUBfqmexuQxNXNj1eOE6K8N46YuUu6oTqRQX9SfKesZedEqF1GFDCGHFYPnc%2BOEZ%2B8ntj5tKSOnK0NMS%2FpV%2BLQjYCuMrtjLnAr0JO6QdyvcNX%2FzgzsXb3UHaf0iXQkPUiYFZnZz4PmmT4hGDuhoL%2F2aHTcKBGcV1mHxGuZTMoAWq2UYSlY7BAI7ooTjRPhK12ypsjBdlUdYrfVlyFPwT0q9xSLML0fNOrpOnM6%2BCQTvqLQaRAUMIhMgTV%2FPnV1X%2BEgwpatz1nmVhf6ewxouE%2Fg4QlU0o%2FJ26fDbYISdja1hVjhvDmCKs0ohzCnKAeYbtwbYK9QYspZJzEE7PbNsw6h5czXxtlHB6%2FllUXmFkOEWKUI6QIblFl%2F9SGJhiFwPR6vFUwX18DqhVQ%2FQ53gnqjWcApLrKkwi0PGByffAT8kIUvVfeL9RbeIoRJ0sYqK2mKOMdd7GaG5YyXkRnMh5AIm%2Bj1LvWhArUnoNQ2o3j5pG34rXqnudXSHPGKuRXWFI6OlFdojDqKqeuUz6lCA0YW71%2F3Q6O7nuXM1oD7j%2FNSeEjdRa5LDG4905RxAkori8mt7P62i3yjSd2hpH%2BlAmJtqkDwZewKr9o1BxowL9MKHYlc4GOqUBmbINkTyPQdGMvt3u9rX11R3UqC9mdFCt%2BVUAiN0o6iW%2FZUSDJBxq68rEdfIGXAP8medetlB%2Fw7KlrFuHXLEZqIyITXmLX%2FV%2F55irIl0uZRctZ8%2FD%2B%2BWrwkUK3ysW7TdnJIxWq9eV02mMdpghIfE3yh7CpaUpp0CnahEX9eIoBTSENhO8C6NZW5HsuBu2TI0Um4NpbXOmem5bGbnGZbZZhm5ngnF8&X-Amz-Signature=09452795cc58e91164fcd36fa04a51e4884d28f6e8c8fa4117d44d44552e781b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SY4BRGIG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIHzcpIT2ciMSrscBDxCE0zm%2BNO%2BU5FHnxZomvulq5FnwAiEAznBUUq9EKuwjwq6jZVuVW2ZTfq7iVyh6ardQKgrrwX0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIgBxDrbPwfzIOEnvSrcA5A4HfhTkUVBHdsZxCbivdUBfqmexuQxNXNj1eOE6K8N46YuUu6oTqRQX9SfKesZedEqF1GFDCGHFYPnc%2BOEZ%2B8ntj5tKSOnK0NMS%2FpV%2BLQjYCuMrtjLnAr0JO6QdyvcNX%2FzgzsXb3UHaf0iXQkPUiYFZnZz4PmmT4hGDuhoL%2F2aHTcKBGcV1mHxGuZTMoAWq2UYSlY7BAI7ooTjRPhK12ypsjBdlUdYrfVlyFPwT0q9xSLML0fNOrpOnM6%2BCQTvqLQaRAUMIhMgTV%2FPnV1X%2BEgwpatz1nmVhf6ewxouE%2Fg4QlU0o%2FJ26fDbYISdja1hVjhvDmCKs0ohzCnKAeYbtwbYK9QYspZJzEE7PbNsw6h5czXxtlHB6%2FllUXmFkOEWKUI6QIblFl%2F9SGJhiFwPR6vFUwX18DqhVQ%2FQ53gnqjWcApLrKkwi0PGByffAT8kIUvVfeL9RbeIoRJ0sYqK2mKOMdd7GaG5YyXkRnMh5AIm%2Bj1LvWhArUnoNQ2o3j5pG34rXqnudXSHPGKuRXWFI6OlFdojDqKqeuUz6lCA0YW71%2F3Q6O7nuXM1oD7j%2FNSeEjdRa5LDG4905RxAkori8mt7P62i3yjSd2hpH%2BlAmJtqkDwZewKr9o1BxowL9MKHYlc4GOqUBmbINkTyPQdGMvt3u9rX11R3UqC9mdFCt%2BVUAiN0o6iW%2FZUSDJBxq68rEdfIGXAP8medetlB%2Fw7KlrFuHXLEZqIyITXmLX%2FV%2F55irIl0uZRctZ8%2FD%2B%2BWrwkUK3ysW7TdnJIxWq9eV02mMdpghIfE3yh7CpaUpp0CnahEX9eIoBTSENhO8C6NZW5HsuBu2TI0Um4NpbXOmem5bGbnGZbZZhm5ngnF8&X-Amz-Signature=05e67c8f92692b74646ad9410cb2ec527c49bc1193c7c0d9fe828315e0201e28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LLD2OPQ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCID8mIWNsAJlgDACPtg71weKl8EKbU1oAvkzf7fvaFGA1AiEAkj3dw4%2BUWChihry796WBfdd3v8qxKHWgTm7MyMaWP2AqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKF9BJWZLBn2p7erQircA8DEA5%2BDaobE7cAcnC6I%2Bocy3cAHER1%2BANl9ceordR9%2BgE9OOg1jQE84%2By99lMAfnQzU5E3QgTDmBVK3J2Vo6Kyg%2FIGIM6en4tPhGxSgBIbjlbvaGQjolOvcqvkf%2Brz6yxVwPrBytpyNIijv4ar5UOAwCTlwQ7dJ3t%2B5dmHY8768tN7kMzy%2BqQC7kTopNYo83H483hR1BGFJjSBe8C%2FiBW3SXVQ7xz1%2B9%2BLVdMPgXnkHmPRzoLg%2FdSbighwKFHfUbJR1JdqudrwR68CH21AzzyWG8GVzGzJxkJu%2B0%2FuPuWTt0yZ%2FTcYla9cCThx9Loe883p7cDPDau7yywPjUCaqg%2BhXpPgpAISxSerA2aE3LAl3DjvOcr4H4Y9ahPSfQRSXpOZ6ccsMhowZfhnIQC1d3aSvhPXuRNDkujqU1ti8s5rFCaHzV5WvMCrTJKSOGdRNe2dyXfLMfh9c2SVTb5%2F9Flk7S6gb11jJU8lD7bMmMBgByKD8HSx5%2BVh7iNvTag%2BYStzXTx3t8mrimk4MhGW%2Feqx%2Bbmiz3LrHe3zeREDg28fRG7IJZnt1Ul4nyTSDQy28RvrxuXcpdr8yDhFoZxZh8PTPOyErz5ztresBWr%2BN%2BElNzJOWxCmLvctSqGpGMNjYlc4GOqUBT2CqWT7T7BwZRojYDzuPE0LlNyOdhBcys8MFED1lOyk3xnbAeg%2FwtbCSaL8PlsUU7CbLyia7aBAVhM%2BOdTUHlnlyiXpLHmnaNhI8MwbNbWclJgId%2BMTJGm8N1YU%2BggGtVavcXHzm5Qiu%2FcTWkIRpd2uqnezCXg5rn7cPWMifzenNQzhD1JR0nTzH%2B3XVGNxBpJl50eAPA%2BC36SCuymepGyU0zXlA&X-Amz-Signature=22a517c480d41064510b0561615322af640f3ecd1c3251904b0e447cbcf46320&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXZPCLTX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCtiI20%2Bz6mDn2mwSIQ0%2BvLvBJZp02%2BI3OSZYUOUc6b4gIgdk2P%2FU9vAkoe6G4erc9YmxOx8iW9JtGtGBxLojaiJl4qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNRfT54unTncT6QgPSrcA4mImLlO2FSaXSqYCmsg2iHg67Wr%2FU6K6eAJwLYYctAmJ8qOtrBnnOJlWS6fsRHL3uMhOD1OrSy%2FMGrsKPRoUmkHyIq9sOOHQOG3OL2rVFYVCc8A%2F56ut2FuldPecNccNqSCFGMa86VjIOgILLaR6AbBr27kinyEXnmEhJ43ELTdtTBhc0RVWC%2FSNrq%2Fukx4OZVdmGJCClz0eJvTb%2B087%2FUaW40%2FkVaSE2AI%2FbOvBRvAwpOiDCnL5peOmIet75k7FHmGpx1Rkfwh3F6mVc46aVSrN5IsqfOZ3QTEFliB4U2jWKSrE2E940P7aua%2FU8AsiCaJ%2FLLibb6hchjyaeWb41aVARgwv16Ml%2BIRGvCxf4a45mroqvOXXsOdp9LyKGyiyiQzfkX79c2PUAi1scecBbsZtL4sZRuKBeDLUU0NhABZ06DKxBwAhxuzpcl3dyAjZ89wneEu%2Fl4XcQqt03YwogMMIXjOlajAc9wEoyfJ2g30P28evGs47PBggHV5KFpJc3VK%2Fn5txpiC%2BTlODaU3CtmPHGu8Ao%2BOif%2BWk%2FYTWOBvvYqPCytPERez5v9dilky6BgWwR%2BmIkWdsuWmmgQwYh8jPJquAOKErTrE1%2BLHJKQLoyWem%2Ft4C1Q7rp2eMNfYlc4GOqUB3GlLrvL4d9pv%2BFgSml6seo2lH5YQrIYRi66ncwnYJRLeXwRIGBc7QcfvWDreqTFWXCpvSGVJtK0IpDlue1hr2jgIO9FTb%2FU6tJTKfnO3wk7jpnEYET8ycOSekU6lKNv9Y%2Bs5gxSK4GSbxzPXshtqSkLKVg1uBdkdrE0gmWsgX4LLtFx9xeYL7ZXWzaoxTN1E4JQuwqGh6iZ4rD0ugSxQjkRxVJwy&X-Amz-Signature=8d004f52b22a13616fc019c888293c3b31fd1d67e2906c2e45758ac4418cc46c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIB4I2MK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDkc8rs13RwFTWkCiBXoN1Ka7lXUdaJYbpQwx6B3vtHEQIhAIBU9n7Qr%2FByoUbDXugI31eGf11VF1LDgRg1fpKTBRCSKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwoeh1z38M425QVaHsq3AMHb6dVo%2F%2FSgDX1ojPKWaBzl04HIykdSmPxJHIbLJgoVE5cFBO2RFjQyd4e3G5SJ2aDNRVwcdiJ5u3JiRUHSKauXOhgesFdc0dzJMD5luF6ICEH1o9QvreFlWc1Lx8mmDs5TqHDARbE4XulF93KTwx2Ha8IOFCgYkJ4F07%2FbbMSWPdVCRnnGh2VsB2a1o5okFysciuo8yMXnIJe2Z6mhs9c2WbAqO7Ia06aLw1HPhf9943NxxOO%2Fa8quDuUIBhYX4rcqUZDo1MztjcmcXAP9dc758nHhOW6t9ia1DTOxVN%2FUyBcAYkj2Wqo0MAwExx61RDX7Ud4UTX3jAhmaW8zHohI4OX3xOrj69aTIeqrwxeMGXzZPdaqFJt8CUoRG7xhptKXz%2BOIztXjd9bu1SdlVu9cORO9opMIYPyuVi6cNicDC0VhWjpYIVjRogH1IgeugaUCje8fsej76oNFoccFi%2BEkGF6aLuICdPJjmlNAKa%2Fef2IGkGQ68GTqBq5FY08RBi0dyByWN8Yz%2FIq28utNxnnDXNqSDeUxK6Yl34Klc%2BMF959jvGIanRqesjx%2F24QezijQxkKLH9%2BOqBvPku6D8ukcDrl1ea9VOTqC2uv9T7FHiZHo2nTgZTVZi2WkZjC12JXOBjqkASm57Me9fX%2FcMAHje3%2FHMmYMDSolv4rcLBTusI55a1tkmCaLl8yRgvob9D3WgJi3gqD3QXrvn1URVBiwqOFlHIHfi%2Fr1bq7VWr%2FxEKLot50k35xKZBabPZHrpgmtUI7PQ1qNug5mFrnF3RXQQ3qzGW4YqB8mZqFNZ0GfUZra2wygC%2Fr7t%2B0FgwG131TxRSZktSzOSiZvLMsQt0yEgBh0%2BwoILptr&X-Amz-Signature=c700e3e97bad9521766968aba2b74b82aee0bd7b2266c1e49cefbe2ec1abda3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KVOJGAD%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQCSiKCT9a9K2TAy359mS3hDyXxSIuBs8g%2B4Y2YBgICFjAIhAMZRfXVW%2B9DPobFovK%2FCBdWJ6R3Quvnf1Mp71X%2FuZXDdKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyKyb76PFsFbpA5kJUq3ANpyh5mYHOhF3aT9s8yXRPGhb51Yxg7rzh9S7lBl0NSN0tvwV666ke1nYS8CG79iQMLRX7BQNag2jEMt7IJOsqWmwQeaNREFEdxHteqD5CJpAqEfygVzforUKnWERRuFrN%2FfnR0%2FJG5Xk79EgKsJr2n8ePJSy7CSpb%2Bp5ClkA9ykGlf2B7AWKuOroZpxWCT3WWaB73A1H4G070n0HoH31IigLA5kSOuEkezCqMWxZ%2FN%2FlMOFN%2FbmFuX6vCj3klBQPKzFNrFb7Q5I14X8h39WkqZxGahhvHECGKwvimlofg7j2cvhoL4e%2BjE72l2qMbBe56Dsgsk%2BNUQ%2B873uDCBoKY2py%2FH%2BkVEP%2B7ojGOqElS7hveJuoZHOfUTCCVfVo2MmifdkBIZ4txw5183qJmdZMNCrF%2Fcjv7j%2FVUfJCpDGLljpM3huqC%2FC2O1tSF29W9hd8nJVIcyybuxgP9bd%2BwAVkVtkkd2gGhB8Cdg4kQLq51Y7yXbNIbwksYwQR9rIPbbz%2F8NDInz3pAnTscTcW5aIBhREowXFMMiHP9Plycvv3XumbV2m6i2LHocEP%2BrmKcDyd%2Fg5jOntBsQyyUCJDEBreFS2a0VIjhuWwhAAafxBSxcsVbGpg1yZwblDVbaXDDF2JXOBjqkAfIzQZzJUO2Sm7kc98E7OVfCqzTf183ZXbmtKSJvgd0Oble4Z8scY%2F08E%2Fn9QEe%2F%2FL0%2FbO4JwFIU8Fi8IUSWYaXD2iXnhSvowp5bKNJVAcLELHSjAtF5KYM5M57aK4FCXu5uukF8yfPX0GS8isM4GW5piDAsd9Cl5fsmJAAmhy59Liv2kj1iOzvTLT1TvDrs3y53vJjfzMrVjAAEXc9Q4ubBUpcP&X-Amz-Signature=5bc8419741c1d9e25b32b74e98a482a9381a89c8651b328111732422a3916b26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KVOJGAD%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQCSiKCT9a9K2TAy359mS3hDyXxSIuBs8g%2B4Y2YBgICFjAIhAMZRfXVW%2B9DPobFovK%2FCBdWJ6R3Quvnf1Mp71X%2FuZXDdKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyKyb76PFsFbpA5kJUq3ANpyh5mYHOhF3aT9s8yXRPGhb51Yxg7rzh9S7lBl0NSN0tvwV666ke1nYS8CG79iQMLRX7BQNag2jEMt7IJOsqWmwQeaNREFEdxHteqD5CJpAqEfygVzforUKnWERRuFrN%2FfnR0%2FJG5Xk79EgKsJr2n8ePJSy7CSpb%2Bp5ClkA9ykGlf2B7AWKuOroZpxWCT3WWaB73A1H4G070n0HoH31IigLA5kSOuEkezCqMWxZ%2FN%2FlMOFN%2FbmFuX6vCj3klBQPKzFNrFb7Q5I14X8h39WkqZxGahhvHECGKwvimlofg7j2cvhoL4e%2BjE72l2qMbBe56Dsgsk%2BNUQ%2B873uDCBoKY2py%2FH%2BkVEP%2B7ojGOqElS7hveJuoZHOfUTCCVfVo2MmifdkBIZ4txw5183qJmdZMNCrF%2Fcjv7j%2FVUfJCpDGLljpM3huqC%2FC2O1tSF29W9hd8nJVIcyybuxgP9bd%2BwAVkVtkkd2gGhB8Cdg4kQLq51Y7yXbNIbwksYwQR9rIPbbz%2F8NDInz3pAnTscTcW5aIBhREowXFMMiHP9Plycvv3XumbV2m6i2LHocEP%2BrmKcDyd%2Fg5jOntBsQyyUCJDEBreFS2a0VIjhuWwhAAafxBSxcsVbGpg1yZwblDVbaXDDF2JXOBjqkAfIzQZzJUO2Sm7kc98E7OVfCqzTf183ZXbmtKSJvgd0Oble4Z8scY%2F08E%2Fn9QEe%2F%2FL0%2FbO4JwFIU8Fi8IUSWYaXD2iXnhSvowp5bKNJVAcLELHSjAtF5KYM5M57aK4FCXu5uukF8yfPX0GS8isM4GW5piDAsd9Cl5fsmJAAmhy59Liv2kj1iOzvTLT1TvDrs3y53vJjfzMrVjAAEXc9Q4ubBUpcP&X-Amz-Signature=67a6d2e88378db52113cf0144c8471f17c1e0b96bfcd1107af2bc22e1845e7a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WYVL3O2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIHirzWv7S6hpoNAQke6ppdh%2BdQfzhDUWz%2F6bjT0BsbeuAiEAwJR5t7tgtgIZFvPOp446RRZI66J5fojzlskJf00TTYkqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN9j8X5MrUj4nwM9gCrcA5lT1eQusPGWwILBq73hDg2mSlXHqcHFw9hm8bXC2B0shtAPXe9n8z7iaxokyJFTDA535e23LMzA301wEAqxGQBF11ZF2l3CrUjSdweffINIPIHVBhYN%2B9T2kRHPvi2KvcqpznHwXvrUOH1VW%2FNrXDsDITnFxxmxg1vSt%2FHA32VK7%2FYYOL5zOJGWtifgiU4SA8s1Yf%2FOfow4fdDsfp6TRHmihIAHUjP9QwuoO0BxyjFXSbNmhIhRX%2BtppJ8vIGU007WOJ1vN1Hc%2BmPD8q6efN8Ch6jDp7witInrThsti%2F6YX12OHZAI68pc3dY8l4MdW%2FSOuKPI8BTrTJeh9S3IXAAh%2F85xyOgWEj1yz3%2BkE1yRV6%2B2rRWH%2FP12LR0zeJGu2lCnlzltOKW0BMDCM7WhioeQ2MWpRW92XJm%2BtSRPSWEyywH39rQBBA4pOZp4gd7APvXaAMdX3H3QMBz8GPDLocb9WygALoXXOX8qwTWBlV4%2BJfRmdqkyGfPKnVXJLt0IN4MiAzi6RnAlgRnlnSmyidQEQy2ZwgiPZcm%2FrqORvt0N9kQwUZgfpEZ5io2nc31PPiIzct3ChAkRd3wpaogFpP2keoJu8AcHR9X5e5kt0sPtQEhpUcDxcUcwF1cnPMJralc4GOqUBsYCoQ0JCqd0JFIQmaG7ba1CxVcRX6hHrUPO0fn4Gz0Pord32gRN93L4%2BA9ja87QGmK8rfgcfOFjpmazFM9SlKqH7F4e8uqqZwKro6Vh79dGNM85dUNygq%2BZg2ThbAQ%2Blqih3J1rFzJRyV3KUEr6wcMZkTfuhXwovY3WkDkOGBfEuMOA%2FGDC5vUhS7S8Ol7lZSvNtnkgEJNvZ0G0oQvYDD6CgMmeX&X-Amz-Signature=4d0925bbd0d4a4e057c4779988977d2a34a61893a14f6657d18719ee7a2b2c9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZT7OPPF%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIHs0vdwzwSOPlzxr7F27U3mt2ncxBEX5cDeWHWeR0E3rAiAwlpDvRmtinAqRU8i474weRw7AanZJeXciFm0leCqj7SqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F3DpzKLsQLGXe6ZGKtwDD7ylhAg3URkpUZ6LAcw001OlrlKJXE41EQQL0DjFVpID6J23HhQzWOGNcrsuIQ8%2FZ1gdDlrzH27swA0KhJLeZIvq4trIJPb2oRHRkd11wjy8pebAKbZkTbt%2Fwf37p6lAdXdIEQBjQGJ5TR6Chl1NXkCJTCMWC4GvudeS%2FSSXPexfAJ4jgBhTNgfnspTjBwHOCp2x6DzQW1BwKGfYbN5KBuG3lDdkH22s1dAidBzLuNCZn2M2lLmJuNFhqLrn6OxRw%2BA2hDaXiemhworYSq5pDUqZ5qte7xlIWAroNaJLRYWrzw86j5kRwJCnnOKyotNsGCtPC92zH5Vm7200ZdVNdvdsOxg6gtYVz%2FK5rn%2Bhw7V5JcvrMAhJwCZl%2ByUbDPu1xHqg1IeLoukMx5lfsgVMf4SzNK1vLlLjkqtP655g6HeEPWzvR5OPImtmN3xWeWJIfg7a4uHuXENBmrq%2BvgXJaj%2BZcw1vaOqQpalsuOPK8kBMizD1iQHZqgv2Yo4XoJ9z7RUqmVKaCmK9GlVI1fdSnMiirv0LoXIune0HXzRJNKGGRCf0iJnLagjUBypO9CsCH8TZSmimW%2F7BA5nZjiVtYIonrRICuCAbxpvr9xYlnMF97h%2F%2B5MjGyvbpEiYw6tiVzgY6pgGvDcCx77%2FR8VSot1A%2BFLm%2BrqgQw%2Bh3xrP5w8oj5RGv3qedJdLB%2F8Gw%2BcxxYeUZ6xaGMrWnBfi4u%2F680iOOdeOC96Zeewe8ngKCnmxgc1i5SEfBn24xv6rXQb%2BNzi4VIzNNYIDTF4fES9spfh%2F1C5acX%2FGonJY1749sR1F8tWmsOSLeUwmbdzfzTDYJ2vF20imA1jsSfw8POzq%2FMCU9H%2BDgEhTeq8EQ&X-Amz-Signature=78e8bfd3bc608ca711e2b866e0d0f557ebc174d862d95f816084225a5f549e4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZT7OPPF%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIHs0vdwzwSOPlzxr7F27U3mt2ncxBEX5cDeWHWeR0E3rAiAwlpDvRmtinAqRU8i474weRw7AanZJeXciFm0leCqj7SqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F3DpzKLsQLGXe6ZGKtwDD7ylhAg3URkpUZ6LAcw001OlrlKJXE41EQQL0DjFVpID6J23HhQzWOGNcrsuIQ8%2FZ1gdDlrzH27swA0KhJLeZIvq4trIJPb2oRHRkd11wjy8pebAKbZkTbt%2Fwf37p6lAdXdIEQBjQGJ5TR6Chl1NXkCJTCMWC4GvudeS%2FSSXPexfAJ4jgBhTNgfnspTjBwHOCp2x6DzQW1BwKGfYbN5KBuG3lDdkH22s1dAidBzLuNCZn2M2lLmJuNFhqLrn6OxRw%2BA2hDaXiemhworYSq5pDUqZ5qte7xlIWAroNaJLRYWrzw86j5kRwJCnnOKyotNsGCtPC92zH5Vm7200ZdVNdvdsOxg6gtYVz%2FK5rn%2Bhw7V5JcvrMAhJwCZl%2ByUbDPu1xHqg1IeLoukMx5lfsgVMf4SzNK1vLlLjkqtP655g6HeEPWzvR5OPImtmN3xWeWJIfg7a4uHuXENBmrq%2BvgXJaj%2BZcw1vaOqQpalsuOPK8kBMizD1iQHZqgv2Yo4XoJ9z7RUqmVKaCmK9GlVI1fdSnMiirv0LoXIune0HXzRJNKGGRCf0iJnLagjUBypO9CsCH8TZSmimW%2F7BA5nZjiVtYIonrRICuCAbxpvr9xYlnMF97h%2F%2B5MjGyvbpEiYw6tiVzgY6pgGvDcCx77%2FR8VSot1A%2BFLm%2BrqgQw%2Bh3xrP5w8oj5RGv3qedJdLB%2F8Gw%2BcxxYeUZ6xaGMrWnBfi4u%2F680iOOdeOC96Zeewe8ngKCnmxgc1i5SEfBn24xv6rXQb%2BNzi4VIzNNYIDTF4fES9spfh%2F1C5acX%2FGonJY1749sR1F8tWmsOSLeUwmbdzfzTDYJ2vF20imA1jsSfw8POzq%2FMCU9H%2BDgEhTeq8EQ&X-Amz-Signature=78e8bfd3bc608ca711e2b866e0d0f557ebc174d862d95f816084225a5f549e4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U755K22P%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T175106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCY17Qc5GJuJHuIViX5Jx99PgF1%2F0dxtV8IbSlJ660KRAIgLWNf%2BTNlmv%2FcZa%2BSV9KgnUQBtC2g3%2F5WaN6M3cdjk3IqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEiB6Pvv%2FHU8sjZu6yrcAweiCigE4s%2BVt%2FyQvC9A3czomdS7%2FhR9ZbpEs9ocJpQyRS9j4Y2Y6FD%2FmVCC1CeCR%2FVyguso0OwEvobsaa2bNLLN9qN1RgZMGA87PWsn3JQY2xMlhGDKOP6%2BxKeex5H5af6D4YtqIo4jQ98C%2BOmYiAvThvRKk%2BfECLYRSQVhazPrcSeQVQJWIgE5uQBLdkioGg6%2FDx02NIOcHqokuRnK7Oe8CHaAyjvJ3lY6bQYXykED39yb0Ppc6WZQPMrgQl11KZBAoArqQtGzXSVUcd5tKm7Z4CU4lrlSnBDbpDJjguMPBr0XN%2FNAGaxcJVkojqR329tsuvwnq%2FgfEKYDKIfsT8EkyJIWOdb%2BFEVZmA7H%2BmYl3U%2F31PBoGr9QQHtcKyINcAtbOg22wiSnEjOdwQFnGcbE7F2DQV%2B9ZvrCLHbY6IypSzILAeQrlwWM1V7bE2QsXMtRvVZM25NmqFZs2Ueg07axXR%2F6w74n5N1nARMCUflPJJaNOYtutPSg9mA9ZglhhKENM6z%2Br8cc%2F9cAvE0XFNBNdbjC9ktvRNT%2FyyyFckOqChx1evBicu%2BQzdN1LtVEs6w6MzuhkZv9hwd2qBVmQHBs5CBvuUmdOnmmx9zggms%2FGc%2BWDfK6Y4m7ULQZMIbZlc4GOqUBhSYfTunJhlEn43k%2FZTelYydK%2FRwSY7sg%2FLeV%2BQQ9lhaLUqD3sv5WMeBB0NyvwIeHO1IcsL4%2BdCXGHgm9VDXQFuxQAw6ePdoKFh7pGas3EjXEXPDR3yhURfoIjSN7VghkIEDU9ndLu6NmORU62xOeGkVdu6TrSxKSGfQoz6kaJF7uAZs09kfiM4SyxDPTHadBfCr5dEzGgeMsAtM%2FlRWU1ITsIrjx&X-Amz-Signature=97a4885891fd5155ed70e2e773e6909b38138c62c4178f8e2399f4c4a10a18a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

