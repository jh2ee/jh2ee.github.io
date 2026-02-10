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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHFFXSXY%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCyi5rX%2F2IjbGQmChyavLQNBiGINC5x93PsbO0Hy2hrQIgK0rranG80EkTr2CJFq7MKrKEG%2FxbqXNxlnhg8wXDiGoqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXOMYbiXDAdqS4usSrcAz1YmhLsgoJkJHvQETBNRJUFxapHZKebtI1wSBOWSRsDKXcXa5DVX4wY2vASoJRzT9wHlZbOLZBe0eDVbmCk2VioZA40dmCWLK%2FtwAuwGy0IBWxiXLTsqJohiyKaSiidtK6rlvzSqnlIn3C1HPYg6CW05jUirZMjlCHEe4ChzPy%2B0sH%2BSSECIUbsAAz%2BD%2B57Rb51n1PvDfFQs8swMaZ17ENeGeFD9lzzMSVWfo7N1uT2V7XHgXsTuIweNMxl%2BZ0VrJ2fuRHCuJ3wI77Ey8LS9f7kex9JNTVWDwB0L%2BPafI4cqev8bqUKoMbcbj%2BGf%2BOn0KK4rOYhbvy0DQpcv%2Fzs9vjl5yU0fuaFOTanD6gnHwPtuGKEVefRCtL3HkG7VH1msUVaTrr2rSQpkqc2uYZZuSa8b7HMmPP%2F1dPdH2FrfNRr%2BD%2FNpSdCqaY0SjzsChiigbcBy1koUm0SXaT%2Bcat7OSkgeVCxBX89%2F1PWPkJtgop8nmF7AbBg79NLsl%2FHeI8nPX%2Bca%2B5jE1jJWr5F2VS6co2nJXZVok1rAiKmTo%2FHv4g8%2Fd2GKnnjNt9R8w6Y36KJ79FecEwxTrMkWc%2B7fSD%2F448ebAo6ZqNyhenUNTC%2FpIihB5gpm%2FDcmsKWM2ULMLXgrswGOqUBjhzcBCn2EPvAr7lbc76I3KT5E%2FWPJ3dBX6PmKZXdvWitscIdrflaRb%2BcbPvquR3wj6uaNQM37%2FcM837ciazccB88QF9FRaysiGCTxJ5wQKhs5%2BO2X2f5%2BE9YEJMsEhD4RM8cFMOG%2BNCMkA6MU9QZgHmC9CsBkreVb36SurV2U8Vra96a7OjrmqLoetMnlEZWwYvjh112%2BrLYujML6f8MnBDnYHWd&X-Amz-Signature=e685bdfb140f96ef49c8ed124da2dfef3397e833051418350a748b8e3ea446be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHFFXSXY%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCyi5rX%2F2IjbGQmChyavLQNBiGINC5x93PsbO0Hy2hrQIgK0rranG80EkTr2CJFq7MKrKEG%2FxbqXNxlnhg8wXDiGoqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXOMYbiXDAdqS4usSrcAz1YmhLsgoJkJHvQETBNRJUFxapHZKebtI1wSBOWSRsDKXcXa5DVX4wY2vASoJRzT9wHlZbOLZBe0eDVbmCk2VioZA40dmCWLK%2FtwAuwGy0IBWxiXLTsqJohiyKaSiidtK6rlvzSqnlIn3C1HPYg6CW05jUirZMjlCHEe4ChzPy%2B0sH%2BSSECIUbsAAz%2BD%2B57Rb51n1PvDfFQs8swMaZ17ENeGeFD9lzzMSVWfo7N1uT2V7XHgXsTuIweNMxl%2BZ0VrJ2fuRHCuJ3wI77Ey8LS9f7kex9JNTVWDwB0L%2BPafI4cqev8bqUKoMbcbj%2BGf%2BOn0KK4rOYhbvy0DQpcv%2Fzs9vjl5yU0fuaFOTanD6gnHwPtuGKEVefRCtL3HkG7VH1msUVaTrr2rSQpkqc2uYZZuSa8b7HMmPP%2F1dPdH2FrfNRr%2BD%2FNpSdCqaY0SjzsChiigbcBy1koUm0SXaT%2Bcat7OSkgeVCxBX89%2F1PWPkJtgop8nmF7AbBg79NLsl%2FHeI8nPX%2Bca%2B5jE1jJWr5F2VS6co2nJXZVok1rAiKmTo%2FHv4g8%2Fd2GKnnjNt9R8w6Y36KJ79FecEwxTrMkWc%2B7fSD%2F448ebAo6ZqNyhenUNTC%2FpIihB5gpm%2FDcmsKWM2ULMLXgrswGOqUBjhzcBCn2EPvAr7lbc76I3KT5E%2FWPJ3dBX6PmKZXdvWitscIdrflaRb%2BcbPvquR3wj6uaNQM37%2FcM837ciazccB88QF9FRaysiGCTxJ5wQKhs5%2BO2X2f5%2BE9YEJMsEhD4RM8cFMOG%2BNCMkA6MU9QZgHmC9CsBkreVb36SurV2U8Vra96a7OjrmqLoetMnlEZWwYvjh112%2BrLYujML6f8MnBDnYHWd&X-Amz-Signature=e685bdfb140f96ef49c8ed124da2dfef3397e833051418350a748b8e3ea446be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJQ624IU%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG%2BbDB0Wtnr2doB438oyObPupoP%2BWep%2BCwj1RcST9YgSAiEAhPCK91se4oW4efF%2FfyFHFW76XQvWYRoq%2BXQLV7f8LKcqiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKCY805WBQg4XO6PaSrcAw0A9o57KFbGzX9oxz2Q98gTxjWbzWwSKYTMA9QJOmVHBlge%2F%2FS%2B%2BKsHQ7ANumhHfoW2FduANV9pNVAFr%2BZxekSC5v6hKNDH4Sm9r324xCtbD6bGkKMArk%2FOxdxQq%2BjBaZ%2Be3Sax22QM8pG7kWnabUc%2B9HYqx2mE0qwBw0mc%2B74ODtgyqQO4C0eskBLHOKcbjdV5Pzpr7Jtd7j2s3FsfrgVCfBIvMCWfvkLxortp3G5MxiqFt9MbzmgBbKukxeCVWvi13zi8GM3jS5HZ7hmGme6sCceqO4T88AGO81%2BIZ0M9P5LG%2FusjaXXntBcKqMoup0wKboGoMGyMfnak9%2B4bTCN7ocz%2Fndu1t53vzYYoU9SjHVy2ZoI2znJ91RkqVkUevaLL%2Fb87Ped8UGYuNXF3pWcK18nP6Bwp3t6eKAthB2oq4VUuHE3uX%2FmH4E2rK%2FsWUfneH%2BSE%2FvMY9OD3MLdLPOsbfoc8wSPyppvvaeF1jtsEVaVYZej0t%2B%2FpYogWGWGNJMChk3a6nKOmarfS%2BIercqQ1CfYkWe7%2B70kZ1%2FdPG9uHjXZNYl4qFfGj5tBhCFqstN6YMjYLkCdiRMiZ9bz3Km%2BPquFpRjZu6DKCr5rZs1kiOp82zyBUSLHX4j0kMIThrswGOqUBjuSrPV9BUuET3fIhzso4mLBRCd%2FKt7EHlD35e9VQwlBvIa4YJ%2BKRMsRLYvxBmN5AiDWbU6DXQ1%2B9bJKyf5fHpfTlHcXB1vHmUL8Be%2FA1LB%2BjxdnjJXOWGMDIWBPmFhP%2B77GML7PQlpqsR9Q9s%2B%2FxndMQQF4OMgkUsXIrmMXcE1aMWb1BVFpwtCKdu6USThYpGUwrUpANzeZeW%2BYsIM6Hd%2Fa0slPT&X-Amz-Signature=8ee5c0f2b6ca96d0bf026835db3e8795574871ec746b257dd91cfdaca0752b95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWHEH237%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrvvxyoU11ZatxW9mjjmnOlJ44iitXqX6PEITNtXjtvQIgaIYJ%2FAzfvM%2FIWsRNQFuNNEhZsPab6h9mxt9QJkQ1mfsqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCruMeOVVh5qKX%2BBKSrcA9UCTYBqaC%2B%2BOrtcYqRkH9t1Jn4pHA26jjHmBKUDwZnrpUqwkg%2BELjbpVS11jeR0tJCew1UpMS62cL1ERqWDU9Xjona%2FJr%2FTofOK3X5hJQtMNDduiavzSeM74sUksGmum%2BlDd52IAl17B1kRq8XUpNgeTkRSd38SyYEBFY5Zl9zHvzcRMMeSYowi%2BXGgjKGHQHrQw93SQBnC4YgVdfKovaWmUIYIIWjId1YUVeUaE1DmhilgtfYixWRwkJeQxvz4MJxx5rmPUHS1PmsGjQa4TGFqW7cbmiAqZ9orUJEYgWZL%2FVxLr7kIyR3qLArI8AZW2ffpfOIOuE3whuMtITwRqRKlos9uv%2FRCMarWpwABkRANUb%2Fu%2FBhzbsNyX%2BqHIW9lRz4DVMz4neB1HUD9UgYVYjhaiMCi4kDPLTLBNTSnEkaShlhoWjFw7Ov9QJ0IoYTtTH5ae5vDp4RHU6PqI37sbUgsYTA1n6rPaS3qkMMH%2FlLO7c3F9EL%2FeEcR0ECjPIsCJ8Ke4PVTsDY55g3yIvpb3LcvDOaPwB%2FF5j5NUsXwkPnPvHTe4Lq2hUBredg612xOBmvCSRjueyH4bpZpIBN%2FjNtvSiz%2BLmBEibWTSCCsJlHyjq8%2Bj4zjA3FJY5RrMJLhrswGOqUBAt38qDtcA9NjoC38Y1xXqV3ikem6V%2BZ%2F1CDWsDGOh%2BrJWVUTXKY5ycyBOKlKQM27%2FOIqeDk4Io54rXnIrHELEhLD4Z8lX27C74UAkQXNYLqIuY74bo90ZHJMkVr%2FrtuUS%2BZwiTOFNPFN5eqzxrj8JEEa8T9SWyh%2Fp4%2BswXdxTaJ1%2Fuzx0KW0vxBGjADR8dtvVsmkCfWTBYIOHLZQQ%2B8gYpyNF6Gy&X-Amz-Signature=9a2e9dd459f160b5afffb17de644c9e83d9b054bd5ce120c11c543fa68c1c5df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWHEH237%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrvvxyoU11ZatxW9mjjmnOlJ44iitXqX6PEITNtXjtvQIgaIYJ%2FAzfvM%2FIWsRNQFuNNEhZsPab6h9mxt9QJkQ1mfsqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCruMeOVVh5qKX%2BBKSrcA9UCTYBqaC%2B%2BOrtcYqRkH9t1Jn4pHA26jjHmBKUDwZnrpUqwkg%2BELjbpVS11jeR0tJCew1UpMS62cL1ERqWDU9Xjona%2FJr%2FTofOK3X5hJQtMNDduiavzSeM74sUksGmum%2BlDd52IAl17B1kRq8XUpNgeTkRSd38SyYEBFY5Zl9zHvzcRMMeSYowi%2BXGgjKGHQHrQw93SQBnC4YgVdfKovaWmUIYIIWjId1YUVeUaE1DmhilgtfYixWRwkJeQxvz4MJxx5rmPUHS1PmsGjQa4TGFqW7cbmiAqZ9orUJEYgWZL%2FVxLr7kIyR3qLArI8AZW2ffpfOIOuE3whuMtITwRqRKlos9uv%2FRCMarWpwABkRANUb%2Fu%2FBhzbsNyX%2BqHIW9lRz4DVMz4neB1HUD9UgYVYjhaiMCi4kDPLTLBNTSnEkaShlhoWjFw7Ov9QJ0IoYTtTH5ae5vDp4RHU6PqI37sbUgsYTA1n6rPaS3qkMMH%2FlLO7c3F9EL%2FeEcR0ECjPIsCJ8Ke4PVTsDY55g3yIvpb3LcvDOaPwB%2FF5j5NUsXwkPnPvHTe4Lq2hUBredg612xOBmvCSRjueyH4bpZpIBN%2FjNtvSiz%2BLmBEibWTSCCsJlHyjq8%2Bj4zjA3FJY5RrMJLhrswGOqUBAt38qDtcA9NjoC38Y1xXqV3ikem6V%2BZ%2F1CDWsDGOh%2BrJWVUTXKY5ycyBOKlKQM27%2FOIqeDk4Io54rXnIrHELEhLD4Z8lX27C74UAkQXNYLqIuY74bo90ZHJMkVr%2FrtuUS%2BZwiTOFNPFN5eqzxrj8JEEa8T9SWyh%2Fp4%2BswXdxTaJ1%2Fuzx0KW0vxBGjADR8dtvVsmkCfWTBYIOHLZQQ%2B8gYpyNF6Gy&X-Amz-Signature=52ccf989c9a1133475be73a7bedffde9081c05cec15b6e45f27d1726245b24ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PAD67KK%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTmGHjXu7PFwPVSF%2FG9B3c6WVooKxUzfYG08qvFeMRigIgXX9iT3LXsqhMliIJCTv9Ku759ZB70yb4tTHwsxadWE0qiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEYQTMvk6wVohy6ZqCrcA5w7G%2FS2BziazeTpcKRP9i8RXg%2FoQcFjZdPdtCoCCTbOFGfCrNcVnyXOisO5CAl7IAAzPOfU1UGrxf4q9TwMQ3WjusjV36oK8Q1ZtunWcy6j7mYRVMRpSA0uPlUG3%2FgcNb5qzxjJO3OzikCxVDVN0er1llVVzkDGn62bZ92SfS9Q6FseoRTRB2vPUSYqS0yAYU%2B9qzNk67SCE6GdeOkvpOXWK5PVwE%2FWez4wYaDmWKfG5vfDfOFDRQxfvfpsfcw8NfdHo13CSz53aWwXtF43%2FDXpWtVbxqcv0eDFrnRFVrvRb24VwcQE4a7EXy2GkRSYYT%2B9k81EEYVogHCntd0epEn527L7ThvebFtgxRgDwdKqZpDkU4k51f9cK0eJpAgXIS6Xo1Lmc7o3KnM8lUjtxz2Hmv3FEWuuHUy2B5%2Fzyh1kT6v7K3WGTessAp5WyWd4%2FmgUJ2zq795M4UiOH51AgDtmWdvBwseoqSAf96Jo9F6OKMDrBd1LLM5oUFsW0UtMPhCLmH5Xxt0REUid3h8%2FFWkBBCeNNLS1y1a3lQwWVfTMlN7eINpe4jqHQi8ACw7AwD%2BpqHq%2BZ02oFZqfUOTHHAd6kSejkf0YGUtVjvtjv3n4OuvVwPB5pBhmNvD5MLjgrswGOqUBLYM2ujGY4oG8s7vwmEj%2BteM2Ippjs92gV%2FVpdd0mI3NQ6ev40F1P5piAuyqN2mE1aq6b2DhwXc%2BUtCvSmhGb3%2Bq6e%2F1GhwcGXqqzOPiMmgBZwMsaKNkVj0xNSf%2BgqjXgz4E5zSgbGEcTcIxqbvwDGcv44G8NwyAvdcQGxtDXLG7R1XNCaR8EXc73Ed4Q2AuRZ%2FBDOH2ZTvVY%2B9032FLAivhh7M0w&X-Amz-Signature=fafb0d7442cd176a0dda49fe9537139c227e86640800e3a413be962b631697e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JJTW5F7%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFV5mvdl1eKCxJCPd2GE982jV2Ir9ANN%2F8osSUVVVdppAiB7lRNV1zOQuPFIXNvqO2Sv%2FDNQC0hZjcAqN1inRTo4TCqIBAiw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5ZezuMhPQgaol1nIKtwDoLGrv16uHDCUM02Dhv6oh5lrd0pPwT1dj9AgsPQBl3Rm8o%2Ba2O0h5RzbJHN%2BSEUsfnmQwJHFC9YI12atGza9ejSnCaerFgtcV559dqE02s3T0T9wE%2FzM35V7H6FptqnoKcWALe9X37CrzzyiiFhc3vIiYRgcWQ43M2FcLVdOWB7%2Ba5Z7GRTWewVlzop5qxPAPHBsb%2BzmlPKZA4Trm6H70c%2Bp77YQe8cAsNKw4B9jKWIsBd3esWFpezHkPmdwMIR4xieUJ4coub7wPNi%2BG0Fi%2FTiiTu64YCQeVuTPAFQcWMErAhQ3eR8yBeA9SkCmbK2IO9WDk0Up5Ka7b%2FYf3JEQ0EOctILfMA9y%2Foht3b6UdiBTQ2%2Bz6f97D2JeQDXQdZUlmwyOIquCk1a5mHDgbO2Upm2Kn99MpYw05cKA704iGydxpYxSpU7pJ1eEYDpdYzYYs9cMBwC%2FYFSnBLKennD%2Fjohe1fgb71K%2FxHDAAGUKL8nxeced%2BY8RgiAfiQ6a1%2FKeAHbv%2FRi69ycLnJsMj2y8aPSLqh0C0%2BYKf2utR8l13%2F4hHafFYn2MU5BVuK7HpI1Bz0NdEEe42OQyNqyJTXoBJUnSMC4komBAmVsAz1Sgz6WhYhoZn4GfBNyfbyUwq%2BCuzAY6pgFzP8sAvXuehYlsVeSf22lqPPZvMPs%2Bd4yfYcFPP6Pln2zAgkQ1kt3hBkWNyJtI5qetmPBQTG0gCtX2jItytsLnR28t66wvH6gTyXQzywAaiUISU7LE2mAk0M0aeGhe%2F28oxms%2FToLyChajolYeLqNAG0NC9msLN1FFKgwiBXGBy4CRm4EMoUp72b5Q%2F2RuhT1KNQ2vxHWdIJErxXuH6mqJNpcsl5ZX&X-Amz-Signature=b2d1f87137efdbd4f12727429c29ce99b19cb94b57d38a891d3a516795b33f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZTUG7XC%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFXjLc2pQp8incQh4RGeE4%2FW0SHPNLZeasahGoMSaG4LAiEA174D%2BMwZcxEu8TElE098mTYzDjfhintjaxaoN9HrTGsqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEo4qngSuR2%2B%2FgcXTSrcA0L9F2BQxEDP3ptKJxdp03U%2BX7nGS%2B5o3S1U3%2FYJ3LaSBb4VsIHRVDwTcFIyq3ygTujtYPvx4O%2Be%2B9J7GCKQ%2BGM8HlV7SNr3lChVzMSU1fOVJ%2F0h5jJzxXZz6LqYahq0OARgMZ48h4X4j3FYDTWz6%2Bjl5wxgCKyNg2D9QU7ToRFtAw%2Bm4JsrZBDtisRTocNQHKMVuDElThmQafRJEzwwlYMPoOWhPt%2BQyLMVhw6iGQp%2F9PlDewp60KSQez0dt9iKOm46Mxd6XevkrOeaNUpR3d1Dinz7Fis0qh3Snkyuq%2BKuBwGPsjlE3Ed51JLaj5xyBurzpwhssB%2FTPWo9oyClyTJkQk8CQT91c3%2Bkj5a%2Br%2FsLu6l%2BJZesvZCjjPdEftr0msFmtk%2B6eBp9RuZy1xs6BVPozv4M%2BciknIFLX7iXTbVGNUttcnbfadaenoiOjkmWhMlPmLPXmT7PmeK1QuTRT%2BCqe10HSbfrN6NjQkOpO7IoP5vOFwnCNZ6SxkWOdfTeC3Oyq3HL8V9t2fnWFjnBz86N4o4eGtDs7unNml2lnu1VWZLT0LAbGInVxzzZcaYWShaf9TKqRMy6%2Fls6V0e0dnKuLYCKNKoXAbuHsohQ%2FZPTKczjoxLe%2Be1vDLdbMMPgrswGOqUBbvmrkLfAHasHoxMOluedxlLiuTD0PmpQoOy7ONIIDUV8FAuaH1yIUiy89t1UcwpyMaiq%2B3ynseqZXfJw%2BBML95hjw5CmNdmSiW7QvZbfJIMxIPu6PbujByBYRyU%2BzMIVNhLElfLA%2F4pUd6UhaIysHUxnmeKl%2BvfC2NCCfhBsCAxTp9g8gUHn67kArJJQzrs4c1Rq33%2BDlvM9DEK2FWHv6J9ap%2BZ2&X-Amz-Signature=88f8ffbb424790c7d90cd6e58eb9a290341105a15994b8b3efe748d41c4b684c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AERK6TY%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUMDVYNEom%2F97v3Zc0bSuO4oRCledQskmGEzBqA4L6CAIhAIJvu2AgQXpkF%2FxDTi%2B1t6sQrqSul67v4xUPMCQzrULcKogECLD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwc0joF66G5Oz7%2F%2F0oq3ANG7yvGHLYaM0N9toUVNF0KqsTwKmXmtW%2BO3axzO3hsXzt8%2F3wShZwzFVDmpkLu5G%2BXDr7sj4hncuAzO9MzNNuAf3jy2uRyKZl768g8KMEdCc3TzmVghgsU282wqHfBLCbg3ZCHs8GbwsmC5Qx3onQb5wplZfzFuNo%2BdUJr79%2FepWogt%2BMjUqLNAT37HAEYyB9NNBN6szSBmr5J66rENR08MB1oQBTDbOecxcKJ17%2FkjT3fYRatXEUlQI5SEzX0ZX5HUdHkSOzfgzMUUTq2%2F9HXoLPLfXU9EIZqQX6KX%2FmFUQi0SyXo5SXb1dK42ftFXRHMwEaUkiGbappZnFA5K4QK4BdlRT%2BeOYBG1xKZkCBJXDYmE4vb5Cb1I49HyY3SpSsAq4IRi%2FlrbVUHWFubrQ%2BcAdDsFCtvwCUTdIWUWZRlp1A0KyE7q7Mkdu22M1zAhuEnrn4B%2BOsoFWMPSy6hESVpJqW7uPOfmjgzbemunPejjmqYAiE%2BYIIgOJfiChdb32Yc1ZMM3vFIqox33s%2Bf283H%2FXWlLYLc3yqi15SuNb%2BFwKp85PZFa9zAPZDr1wAoYSR%2FgyDPRZH7DexWS4q3AUwje%2F9q2J%2BqSE0fgt0o%2Fu%2FvHLAWULLNqqS%2B604KHDDJ4K7MBjqkATaS5rVz7n8NQh6%2BDkxlJtEgnPX%2FogqzqnQS%2FAi5LXy%2BUBy5UgWouTFo2uYoP%2B2lDPeiDDaigJIgis1quac9Uw0WN6q7Hph0nphZDxxBjfBKe6R5tTHJ48RrrvNripGi3Tyu3nBCg3DBAw295Zd81DNgBYxsgZy6buM0M0GLgdstXJadlDRg5CvTjaZnzeQbfj9tqFtpuVIHJPFIdqX9TJmsbqNd&X-Amz-Signature=07392796bf121dbab504507b43745bf1aafc8ad0fe5d75326e4899a26fbd78ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AERK6TY%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUMDVYNEom%2F97v3Zc0bSuO4oRCledQskmGEzBqA4L6CAIhAIJvu2AgQXpkF%2FxDTi%2B1t6sQrqSul67v4xUPMCQzrULcKogECLD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwc0joF66G5Oz7%2F%2F0oq3ANG7yvGHLYaM0N9toUVNF0KqsTwKmXmtW%2BO3axzO3hsXzt8%2F3wShZwzFVDmpkLu5G%2BXDr7sj4hncuAzO9MzNNuAf3jy2uRyKZl768g8KMEdCc3TzmVghgsU282wqHfBLCbg3ZCHs8GbwsmC5Qx3onQb5wplZfzFuNo%2BdUJr79%2FepWogt%2BMjUqLNAT37HAEYyB9NNBN6szSBmr5J66rENR08MB1oQBTDbOecxcKJ17%2FkjT3fYRatXEUlQI5SEzX0ZX5HUdHkSOzfgzMUUTq2%2F9HXoLPLfXU9EIZqQX6KX%2FmFUQi0SyXo5SXb1dK42ftFXRHMwEaUkiGbappZnFA5K4QK4BdlRT%2BeOYBG1xKZkCBJXDYmE4vb5Cb1I49HyY3SpSsAq4IRi%2FlrbVUHWFubrQ%2BcAdDsFCtvwCUTdIWUWZRlp1A0KyE7q7Mkdu22M1zAhuEnrn4B%2BOsoFWMPSy6hESVpJqW7uPOfmjgzbemunPejjmqYAiE%2BYIIgOJfiChdb32Yc1ZMM3vFIqox33s%2Bf283H%2FXWlLYLc3yqi15SuNb%2BFwKp85PZFa9zAPZDr1wAoYSR%2FgyDPRZH7DexWS4q3AUwje%2F9q2J%2BqSE0fgt0o%2Fu%2FvHLAWULLNqqS%2B604KHDDJ4K7MBjqkATaS5rVz7n8NQh6%2BDkxlJtEgnPX%2FogqzqnQS%2FAi5LXy%2BUBy5UgWouTFo2uYoP%2B2lDPeiDDaigJIgis1quac9Uw0WN6q7Hph0nphZDxxBjfBKe6R5tTHJ48RrrvNripGi3Tyu3nBCg3DBAw295Zd81DNgBYxsgZy6buM0M0GLgdstXJadlDRg5CvTjaZnzeQbfj9tqFtpuVIHJPFIdqX9TJmsbqNd&X-Amz-Signature=ba8e7080e2e5ff39f9a55d22da84419bb7149d6cca9083de9f6a0574c1ed5efe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDPYXPSL%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEzIJGkEqo8Lfhipmi%2BG4W%2Fn2ge%2F1vy5f3aBSjCbTcqtAiAWDiP7cuLPKnYO7g0WtK3hcRumA7G70%2F0NB1Tm3WVNNiqIBAiw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFgfbWj0BpW0MzbNlKtwDOzYrXjiJT9rbbhAfdJEH2EUBPdxsXlRQcs82s8XGqFilHSfZcV3FyoxnhEkeMVf9meWybm%2FlJOh%2FcxLM7O1jBn%2FOkWbituogKQk6ARbV8fX1BofOvo1OWlNGZn0W38Q1wz6n2DVT2HHrR19usW%2BqJQF78bx0rrdOb%2BQng6jwc4RXhzz9xfKsLHul29%2BAsIBmB%2Frbx7757spdcEsm6XEXXC7GFEKL1lAyLzIlqDNdS7NB3r%2BaQp6YA5vLPcSQp2MZ8mINvBgmSoAQibQ5bX3BJ58t9EQI1o9i%2FBGBpzIAiPraFYIu0Dd3IMkCgMjzgr%2Bqr2FffRwiPJSgefwC0TgZNkDNlfO77qqXhJGpkvs0SMdQOG5Kj9L%2FFdF%2BrvN6dZcKNvshNU29P4ynJCeT43CxQ0jxT8gMwnoxz5pwZ7YU6F2ordN7APqXEW6pg1VZWv1Y5sW3KgcBfW3eLSVa5jtLH%2BjcbJUyiS3lz%2FSR9ge3L1JyL%2FFeiLffFXcO9M%2Bs433gmOKCZB2FGWf0GkvO%2B%2BILS45gsvro21w7WsOvZDHRNSQYJfesFDAofZMhGB19ANv1xfMLmHIesOV2w0TcxtkBnLizACPxwbHXtPViu%2FWX6Dt%2BSzK00n4F5%2FqrIvAwp%2BCuzAY6pgGbXqMFbBZS%2Bo%2FLXSvBt%2F4lzKxzEjo445%2F7aR0xQTXmD9kuc87Cy0vd08YcuXmqlYOKbA%2BLQpsRpATaHnNtju3GiYkjPGBgg0Q3ysuwRkXGxcL%2F1UMPu7Sp54OZo3nDo5bmOmuRBUyM9VkR5dGvv3HiBvQWFc6%2Fgz%2FYX8orITCnLBVwKip4NXTmHhfAiCWZtzMZp4azgyPUhIH4Ofv6b87jOk9GBB8N&X-Amz-Signature=9d381dac2746074320ec0553895727cb5c3ddcb57921c8af3047f874f61917f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTQKLMVQ%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDupiI14hjp2v3GKBh01kwtMwEkWd%2BfnU%2FQ9Hp%2FlqUJXAIgMbZBZ7wXtrvf5QafLqLYg0tpRU1cOCBA%2B1%2FlCLtMZJ4qiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPQmFIqXSm3umuDvAyrcA4FeV9a8yDZ58zLledUrIirHfZdJdrxspR4CQo78hz0n9h%2FD5ZBqniy59MMzcoeRDkuGKrYsI1Cj%2BE9hHNOkXCWdoFS07YjBpJMpBrFthUpK%2FMIwqMv4Aw9u5U%2Fnx%2BOWIj4r209Xggy%2FOPZ0jso1czF8iuZTilWTP9h7Yroq%2FXgUpfKPa4eFjtl23nideMn9y6um%2FNix%2Bjm%2FCjZP3kVD0X3GXc2BWuXhQeW6eoLYu%2FpM2H%2BEDX2QC03eXHWdlW54FJX5pTK4r5ZPvrTV%2BklN1JMQe8ljloWaUUyxAyAesRLSkNKwtGp%2FdZhms%2BUY%2BztldbUhQ6dXMRSlot2VV0NBxoKBQlwzYtzMyAa0tFoxNK5c97Swga7IVzR%2F4hKDvxP9NvLPlLgE7%2BAYnFmN5IqjqhYZYXtAT8FVk%2FwKfveQ97GiMM39chuR4sYEaj7UZ3p5LDM3sKYXUznHkiHTBc6vuc3vh58Yb5X3hA1VO2ejUHIBIVdwON7%2Fau1Sy16JilsMtHRsrM98A4voql7ZpxSh41S3rWEBWXs0seuH0wfIBYDhyMym0t%2B5juwHSwg2Y%2BfHHozQz0nD0NW%2Fhcgf3kfzKNh25gzjOr2X3QdKrccjUk2yYzQ%2BjQ%2ByheK05dyOMMngrswGOqUB4l4v6NbuHvleYBMj0cpwesv0GiiUTcDJigpRl0TWM1ZhDUNQ4c6KWd8igB%2B0QJjWQOHn1rBDbtOgHncPFW0J8%2FLSVg3p0xCcYMXICux3hqg1kQLpoIdFbpWmx4dg1CZT6i%2FqEnQ3W7FD9tBF873%2BHldbNilLhtiOuruUsH4OUj1HnB%2BnPb58NRuCRUvT6IEEYyeNOuOnbwJJF%2BHa%2B7pxt0v7%2BVHI&X-Amz-Signature=02f39e1d363f713b5f93c6221f9f5212e24db326d395acd187dec758fc31ea25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTQKLMVQ%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDupiI14hjp2v3GKBh01kwtMwEkWd%2BfnU%2FQ9Hp%2FlqUJXAIgMbZBZ7wXtrvf5QafLqLYg0tpRU1cOCBA%2B1%2FlCLtMZJ4qiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPQmFIqXSm3umuDvAyrcA4FeV9a8yDZ58zLledUrIirHfZdJdrxspR4CQo78hz0n9h%2FD5ZBqniy59MMzcoeRDkuGKrYsI1Cj%2BE9hHNOkXCWdoFS07YjBpJMpBrFthUpK%2FMIwqMv4Aw9u5U%2Fnx%2BOWIj4r209Xggy%2FOPZ0jso1czF8iuZTilWTP9h7Yroq%2FXgUpfKPa4eFjtl23nideMn9y6um%2FNix%2Bjm%2FCjZP3kVD0X3GXc2BWuXhQeW6eoLYu%2FpM2H%2BEDX2QC03eXHWdlW54FJX5pTK4r5ZPvrTV%2BklN1JMQe8ljloWaUUyxAyAesRLSkNKwtGp%2FdZhms%2BUY%2BztldbUhQ6dXMRSlot2VV0NBxoKBQlwzYtzMyAa0tFoxNK5c97Swga7IVzR%2F4hKDvxP9NvLPlLgE7%2BAYnFmN5IqjqhYZYXtAT8FVk%2FwKfveQ97GiMM39chuR4sYEaj7UZ3p5LDM3sKYXUznHkiHTBc6vuc3vh58Yb5X3hA1VO2ejUHIBIVdwON7%2Fau1Sy16JilsMtHRsrM98A4voql7ZpxSh41S3rWEBWXs0seuH0wfIBYDhyMym0t%2B5juwHSwg2Y%2BfHHozQz0nD0NW%2Fhcgf3kfzKNh25gzjOr2X3QdKrccjUk2yYzQ%2BjQ%2ByheK05dyOMMngrswGOqUB4l4v6NbuHvleYBMj0cpwesv0GiiUTcDJigpRl0TWM1ZhDUNQ4c6KWd8igB%2B0QJjWQOHn1rBDbtOgHncPFW0J8%2FLSVg3p0xCcYMXICux3hqg1kQLpoIdFbpWmx4dg1CZT6i%2FqEnQ3W7FD9tBF873%2BHldbNilLhtiOuruUsH4OUj1HnB%2BnPb58NRuCRUvT6IEEYyeNOuOnbwJJF%2BHa%2B7pxt0v7%2BVHI&X-Amz-Signature=02f39e1d363f713b5f93c6221f9f5212e24db326d395acd187dec758fc31ea25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QC4ALMEV%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T232740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAXBJgDCIJztNqG6959SAymB4azc0igT0sK7j8UpO%2FtsAiEA3F9Vx2DPRRBp7a3pDmh93Mu4caTk%2BrsewNkZoynCAXUqiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKczuf1idmLXyONPWyrcA3sLZfEBpHy44HqgB7A5Xo9jCBgViFmbQKLaVPd5HzdXFQvNBbGimO8DMrRoPpHWu2Mbjj%2BIaJCwXCcFimgawRdThm1b%2BlH0%2FSa1ykPGYydi5wlhhPt1YtEZFz%2BV3fkPOAHam6ze5%2BKm%2F51H6QLKpXVAO2rvpvYfhwb8aTZab3vFSd5OQxjX2TgEUbDWEblJqtl1pKUl%2BA2x43q8qd%2BsUflv3iOQ7jg3DjvtUVVDh4wDA5Jx8M95Qz9YnJpoJZTRC8rsJMZKPsdrsqhZCQAFaOpFJkCNU%2FW1HLcDgOVJlq7B9%2FaBc8e9Pl1OHi6saIMjmRRJxfiXgctM8GegPD%2BX3ODdS%2FKdS9zrdCowkZOgD64KU%2FcS2m6v4oS9VFym4B2ygfgXymAnoQddhXUx6IGaBQ1QOyHAKC3ucwyW1UVx4M0TyacbdPKTtGb%2FxvHFkupISFSGansAKws%2BRkR2tWj7rYnyKe6XRscXdnfyQl%2BHSZuhIbvsGHCiKW7avqp5bwbxLeAEeyf3jsxOlHmaDoxWnFSniUqoELM1I%2FlROxJoAc7%2Fc%2BC9Dfj%2BZ008VNIIQpYelUSq3%2FZZGOk2oE3iV0jycq8U0n9J5TZqNn0ofya%2F%2BESZ2tZXQj84s7vCc5YHMPXgrswGOqUBvjAHyQAn8xRji1wwtHbeYrd1wpknmv1zGb3ZGTJKVWsffke2n2GvTmAtHJ7O%2FjkV8%2FRkZQ0q1ULKpW0YxnYgsgOJ7RIOAlcu9PgVLab0olFc9Rtzlk%2B1KM60MEYFWrvT1Y6%2FRHI%2B7IuiDWozIMYMqMDhoTMtkezS1%2FoYuoGd%2BbfENEqcamk0b6Qb7K0VORnCiGYnG6UZLC0p0Ipe3800rrRIkg%2FR&X-Amz-Signature=66c42b264caaecddf285a9adaa7a2687680698d8a900b56e77728283ced76e6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

