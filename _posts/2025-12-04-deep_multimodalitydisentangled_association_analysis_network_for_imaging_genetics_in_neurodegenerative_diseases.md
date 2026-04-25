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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5GZQGNH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFHOoA76c9anW5mMWGOi0KFqGYjEyqkRPC2nAM27qUfiAiEA4AQlBGWjwDlaI2%2F2vW5p36CXxo%2ByG8lyXtuhcTCxELcqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGUlTqoCPQBBeUSFNircA1HyThdQl2mwbUalC6mQ%2B8RdAwOG6RgonaHOHh9Kj5hQ1ScNGD0AAANjGbUCh0%2BMzHX1NxwrkKFUz90XGr2XI4p%2FfIIAmFog3ez1AI2xCKuSSUKHgUU9B77l3I8C%2FXCapjjbHa8IqOYlJJZ2txJkXVdhl5L%2BxJYwPUNBFoIK%2BM2EFOY5x7zU2FDWMget43BXdfWezFhTBcd0LuYhDx5N3G3d29vA%2FYLzuwr3UMP%2FYv1F4ebjFWT65DWM3U%2FO9TAKg4ZUIGIUunY8j7UoeiRaanmbTwxmIQlhQk%2FlEZWL1QTgXbhv1%2BqdcBkWTa46amiAbkAwPgQQAdkpppr0k6w2iEc%2BbsAVdbE%2FX7FBsA7AWHpwRwY5AGOrlzISVXgA5TxXK7xhqkQ9AwLGjSrYKYBbexlxwI8KX5x3MIH0T9FBzcU6DbrbdEyN0Y6blof6aV555d7xznSHiHDcaFUzPY5dp7UD3Y9DBPchnKvcPA4Ca%2FaCCn716EaLHe%2BCxN0UD9zBW%2FKMIU9Y3tipTGTRwYkbQZgRK0E0Dvp79V0%2F3mgU%2F9aNsFB9hIZCPgOvob7JrULrcvKIRLSitBa0sUp5TwRsjYmPvMUkY%2FSC0k0iw7hNkOho6X3lbmDpgqFE%2Bu8qMN%2B4sc8GOqUBZQhe64xWhKw7d%2FJacF4QmqLHrIfL9zp41XrhwVHCRMjxeFgTnaRdmgH5Vp9H8XKD4ZFPWnJ3PmHE%2F1RxNdtFUEhdvlGSVi68Zg3TyqRa1s0mJ8fXp%2F%2F4j7Nxp%2BSATOCgo9gcIb3s0LF7p5gLrXd3hsXkb2L6n7ANlvwk7WgVMReNlgvH5O0GzJLdFDSqVqAc%2FCIm8PZ1X26XTNNt9bZ4S%2BzGfWZu&X-Amz-Signature=533a4eeca2ce030c67ab1753dc87b7aaede58fe446e32bfe81d131bfdb441d81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5GZQGNH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFHOoA76c9anW5mMWGOi0KFqGYjEyqkRPC2nAM27qUfiAiEA4AQlBGWjwDlaI2%2F2vW5p36CXxo%2ByG8lyXtuhcTCxELcqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGUlTqoCPQBBeUSFNircA1HyThdQl2mwbUalC6mQ%2B8RdAwOG6RgonaHOHh9Kj5hQ1ScNGD0AAANjGbUCh0%2BMzHX1NxwrkKFUz90XGr2XI4p%2FfIIAmFog3ez1AI2xCKuSSUKHgUU9B77l3I8C%2FXCapjjbHa8IqOYlJJZ2txJkXVdhl5L%2BxJYwPUNBFoIK%2BM2EFOY5x7zU2FDWMget43BXdfWezFhTBcd0LuYhDx5N3G3d29vA%2FYLzuwr3UMP%2FYv1F4ebjFWT65DWM3U%2FO9TAKg4ZUIGIUunY8j7UoeiRaanmbTwxmIQlhQk%2FlEZWL1QTgXbhv1%2BqdcBkWTa46amiAbkAwPgQQAdkpppr0k6w2iEc%2BbsAVdbE%2FX7FBsA7AWHpwRwY5AGOrlzISVXgA5TxXK7xhqkQ9AwLGjSrYKYBbexlxwI8KX5x3MIH0T9FBzcU6DbrbdEyN0Y6blof6aV555d7xznSHiHDcaFUzPY5dp7UD3Y9DBPchnKvcPA4Ca%2FaCCn716EaLHe%2BCxN0UD9zBW%2FKMIU9Y3tipTGTRwYkbQZgRK0E0Dvp79V0%2F3mgU%2F9aNsFB9hIZCPgOvob7JrULrcvKIRLSitBa0sUp5TwRsjYmPvMUkY%2FSC0k0iw7hNkOho6X3lbmDpgqFE%2Bu8qMN%2B4sc8GOqUBZQhe64xWhKw7d%2FJacF4QmqLHrIfL9zp41XrhwVHCRMjxeFgTnaRdmgH5Vp9H8XKD4ZFPWnJ3PmHE%2F1RxNdtFUEhdvlGSVi68Zg3TyqRa1s0mJ8fXp%2F%2F4j7Nxp%2BSATOCgo9gcIb3s0LF7p5gLrXd3hsXkb2L6n7ANlvwk7WgVMReNlgvH5O0GzJLdFDSqVqAc%2FCIm8PZ1X26XTNNt9bZ4S%2BzGfWZu&X-Amz-Signature=533a4eeca2ce030c67ab1753dc87b7aaede58fe446e32bfe81d131bfdb441d81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VK2CTQUD%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQB9gNddHjDL8TaoVjoRGT3gjoleyi0bGAib28kAvk%2FwIhANLDSEfB4Jvug0lC0nCvTSfmfbeYBEW7x0mFQB9oTGp7KogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzfgSyJVC9y0Tzw6tAq3ANAMgA1%2F0K%2F4LgmgGHF%2FzM0eP9hEz66QTN3CMx5TnRwVDlVNWhbYNtv3g77g4xwfsYQIC0Vk06yYcw%2BQY7kODB3anlYv%2FxhIzoVeV%2Bq8UAYU7aELVmtdak9Ye0TjEHia7zqcN7uNRpQ8TjYrv3mcq1V5Z3Tu2%2FDxr1QHnK98NAvXu1dPDhovI9xj%2FoH5hRj%2BHhQkpHrL5a36ysQzezMsluEKWwMWGz0uxpen%2Bq1zaxN5u00%2BsDkqLUD0yUB9TC4Ty9j1TWsf0O5AnNwVFhucfR%2Bi570qstn7FjkNonlB8OuyyccAPLPe2DrodvvPuuPkGqyNmuuYE15EMGnwEj1j7CROj1KOEw708Z7sKm4PIxCPpI1fv7xXrGhtlhoJ7nAL9%2F3WpWJIDRq6ERGGAA3%2Bk%2BPOSnkhpllZg4CjfZVLvntcBAzNoYkFDsQHXtwf8puSfDgm0Tno5PUTN9pV7QirxibOHFo9Yi6QKTq7gdiZ3lnVIZqyhQloY3G1VeF7xcFhOESroNCKKD9Ry6cJtpIi%2F8rRFh%2BMq1dvUpaBHpAdFUJH6%2BgjcEXs6WquU8JQCCLidqiZstM6IwU2p36eMf0A5GpSOeV2L79DCuwQD1qoq7%2F3zyB5c76LxoD1ySA0jDruLHPBjqkAemj%2FNF%2FqHB9LGd%2BGDPrulhSSK2yVe8P5jRv2YJG6dwH4hn0Wcr4ln1wjKqvfAuhFQGMbkHXYgAhySvvbQXo1pPK5zKWG3xpU2iRcbSoAXL3RLizGP8iwOPQ9lLo5Qmjlx8SgjegICwQxZkNndc4Fr45m7tKsGUYK9%2FIIi3fngBxHLRGxwM1Y2cQAtWBXPt0aHXVcBMX9zxC6z7Kf2SjCJxl1NUP&X-Amz-Signature=6979af2984cc790593dc576ce7cb43706d3daf56fdc7968e94b8c77f51ee72ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFUXPBMV%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWb3VvaZ3R7mUNZn0KkIpNV6xvIG2BqZFUmlxo4Y0YewIgMno13itkSe7KlGHhJ5QBK1KU5d2JNoRPkzYHjy8tm2UqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDBqgv4ttuxZO9tU3SrcA412uZ8Yd35Sdw7%2F4VVm%2FcM4uO43WxwKJ8XlAobCRAOOXcBHOxOkhV8sCXO%2FYPsndkPXkAIhSX45XnqR84uW5OCJN4H4zV40FLoCUI%2BYBTxil324l%2Fu3%2BphuSkfSyQCgk2Ina2bX1NrjmXYZBu9ARxwBkqWvaRxK5i7BZE8%2Bs5cuYjszlQw6fjVG6lQPvMw3%2FPFjP%2Bdrxj6xH1NP3IUQdRONeFzmzwpTmzG%2FOTmIPqe4xJVX4dt3N%2BNJL%2FNXnxkVIEx7iV2e8N3INlOPTWwT%2B3ocdbwnJ1iNHNDnm0LUMGQ173TBykHw35WxVraYpNhrXnA1KiSUMIWClCnMxUlk99%2FeD6TxXxCqYtGzdmc0P2j82etLxRyvwRSOYiPLTT11ZTgCvBb8uxnn9AreESv4ylqWlkizew2OeMhhFBM%2B6xgO4dJNocQFUsTa%2BfNBjmKp%2BMg7jjfrpAwflmb7MJ5C9PfVD7wZtc6yxXloJRh4gsiKAs5X3rPvK9GdD0Sgac26VTthyKCzi8onJJlHENGFrA1gDq%2FQEyhQJtA74duLLfZCJ5ggyH2RikUcEFnGBSxagoMoQ8m5ATkXmHEHB692j%2B%2Fo0GA5dgvyxuidpM27vsasTxBBGFXOxlkI17UuMOm5sc8GOqUBkZpbsKfSFSACPRFKlU2YxQtJc%2Bw0eoS%2BSDZq3MDvgx96pRzCu2cGLqS6V%2BkFcknWsGagiXUws8ALxEY8F0SWOzpDcjjcFMqk2oeBoQEYzN2Vu8mompmBzWwzgmCk3qO6Tu9YQXUCD1uz21q54SweX2YnU0RWiCG0x5HpKCgQOxVJzsTOP7sRf0dPQjNqx%2BFDvHhtj0%2Fh%2BisBKun25gtB21dlqeqr&X-Amz-Signature=32d159234b31761fd4a387152dfba80b7b0e0ae2968b57038b3313642e7d1917&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFUXPBMV%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWb3VvaZ3R7mUNZn0KkIpNV6xvIG2BqZFUmlxo4Y0YewIgMno13itkSe7KlGHhJ5QBK1KU5d2JNoRPkzYHjy8tm2UqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDBqgv4ttuxZO9tU3SrcA412uZ8Yd35Sdw7%2F4VVm%2FcM4uO43WxwKJ8XlAobCRAOOXcBHOxOkhV8sCXO%2FYPsndkPXkAIhSX45XnqR84uW5OCJN4H4zV40FLoCUI%2BYBTxil324l%2Fu3%2BphuSkfSyQCgk2Ina2bX1NrjmXYZBu9ARxwBkqWvaRxK5i7BZE8%2Bs5cuYjszlQw6fjVG6lQPvMw3%2FPFjP%2Bdrxj6xH1NP3IUQdRONeFzmzwpTmzG%2FOTmIPqe4xJVX4dt3N%2BNJL%2FNXnxkVIEx7iV2e8N3INlOPTWwT%2B3ocdbwnJ1iNHNDnm0LUMGQ173TBykHw35WxVraYpNhrXnA1KiSUMIWClCnMxUlk99%2FeD6TxXxCqYtGzdmc0P2j82etLxRyvwRSOYiPLTT11ZTgCvBb8uxnn9AreESv4ylqWlkizew2OeMhhFBM%2B6xgO4dJNocQFUsTa%2BfNBjmKp%2BMg7jjfrpAwflmb7MJ5C9PfVD7wZtc6yxXloJRh4gsiKAs5X3rPvK9GdD0Sgac26VTthyKCzi8onJJlHENGFrA1gDq%2FQEyhQJtA74duLLfZCJ5ggyH2RikUcEFnGBSxagoMoQ8m5ATkXmHEHB692j%2B%2Fo0GA5dgvyxuidpM27vsasTxBBGFXOxlkI17UuMOm5sc8GOqUBkZpbsKfSFSACPRFKlU2YxQtJc%2Bw0eoS%2BSDZq3MDvgx96pRzCu2cGLqS6V%2BkFcknWsGagiXUws8ALxEY8F0SWOzpDcjjcFMqk2oeBoQEYzN2Vu8mompmBzWwzgmCk3qO6Tu9YQXUCD1uz21q54SweX2YnU0RWiCG0x5HpKCgQOxVJzsTOP7sRf0dPQjNqx%2BFDvHhtj0%2Fh%2BisBKun25gtB21dlqeqr&X-Amz-Signature=534018d29ae8009933f399bc53c4b3b097b18babfcd58e09bbb6822a2020a4f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NQOFMS7%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA7L0uRkOYE80hp8%2FLHdcrX6kfHwK0MvhBdBIGvFjMEbAiBF4IOj%2Bk2KKvWE2HxCMtI4zMbXGL3OAjo8nKjAcoWJbCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsYTVTISptPAGQFH9KtwDaKIQZJ8%2FIXcpEOUJZOn%2FTIdelTkWzcHsFdlGBiMH4%2FhaQdmYCWIdMQ9ThYq%2B6jVt%2F8nka7%2BNgF9G7G%2FOHOgTzF%2BCJFDAwDxOSp8aE88kjR4axxxfmRXi7PtTbWQVY5qdI1cVQOe%2BaCxpQGHapN7U%2B3NwnsGgg1PNV5jrd7pF2zn4cC5a5cznkwQnKvyzwzv8Bht372kmubVjXpAYpAf7FwvvC4fQ%2FpaifqGFLUMCmuV2dIiWXjU6v45gw1BxL0t1HDPeByNAOWzXn6PmIr1BKH%2FgOzDknTTxV4SbUSUbIMbupfRyewa%2BWqV4NOI3cIFRyvrjtlVqZuJiNV3KJRvDtyQB0QOaOSe7xOpTlw1lKje9HQm8FfAwsEey%2FoVFk2LxnwyxqJKus%2FfC%2BUin%2F%2Bm64q9O4jqBdUo4nbQUCZBjh%2BIyR9OTRuMRItI6Mu6PFu9jX750EMJPxW8HSI4jbsL6d4Nxvp3e%2FvJsN0OZBXj2TelvXGRuqE%2FeD7yHtwv4xVxlyX9tZ3PzM0xAQjspJc1v6ti%2Fw34QNCYssFAOmb7%2FB5rPMZ8425iJMaQa6GMYxXDznD5nsJLUvRAd0WLnDcejmc5j0oHUgwjWgUuUaQOifeApnzc9t%2B6RDFueSeYwrLixzwY6pgFtL%2F1%2BcWwrFBFkcv2Xn26tbapOidJgVM4z4TaA7NYGk%2F5HOmysyuQss%2BI0g8eerwiuEWeeReuB7bK9eBo9%2FjIxefhfCAY7O9eOmKKXbldBUnl79oT6qv95MpOh1k8AnISj6ZGrPRfjjV1ypb00iFHay66JvLge%2FLzziRggLUncugWjK6F37GhOPPQJcRyRRPyHIfidt3YsIXV1y%2BgR1twLxv4sTy%2BM&X-Amz-Signature=a3a44a43cadc253837259bf6f5e7b71e9864d13077ef950d74bb967824bfa47c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBAGL6UG%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKLIFYVawGmUb3vN1WzdOsNekZrBzyn4639Iesq2wmDAIhAPJpfdbBBLEhlgIk0z3eiLPfXmzyE9ApULoS7%2FjRmDH1KogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyS%2F2NIS4drmAWDN2cq3AOzUfRBVQwV0zbg0kiw%2FDdaeurzh%2BxsJ0VD0qmVc%2FbKy%2Fq7xdfezR4tUkmJa%2BXxByeG8KO2REufW48nCidFq8eaKkBp0jEZSlL29HQfyX0X5jGhyKRQK8FUjyF6br5slQkNMmhqPYZu2o64co51zdTh0T3O66SKt%2F7oSCJ%2Fu7rEZe1b87F6O9ElpQOhu%2F7st5m2QBFTFoDoXlJ1o3d1OZC6oW4nJ7yeGmwyz0eDu4nttOgL%2FRkAIvRxuO3%2BXqBUN%2BM4%2Bq9oBOT9QIkgre2Rct9BNZg36t8Q8v6D6uKSZnmulfOBw6rsGGyRY5tvI8U9e84EqRlAhMDhZ7QLjYIG546dbuNcGFB1yfjrvfCQxXcn9zOtixFnF3zY9VdS0x8cIAdGANND3k7J0ohKb3g2vumnklCfzrzVueg7%2FLzWKCLweN7cmFAQ6lPZw6Dikc7RqbO6HUhYUNl5SOGkVK%2BMzLnljzfHYLzlO5efhQSE1GO3%2FUScuLoPUJYbyZfqr5F21q55DzbCVvX4TUjc3IxUKWww3cazYA6X0IrklsQF3thrs7k1MU7uf%2FYHD%2FAFXL9axsBfleiM0zOBnMXwe9yar%2FUVnMxYgiJiB2CulEILlO%2Bvld9UrG3GtWJdXQ%2BjQDDquLHPBjqkAUu88uEZ8Sk%2BczLFbnTrpEOTvG%2FNu82qrzWFRh10fM5GMGBOj3PrXJPkIfKWyo5m8cfUlQzehP4RAcxfCBro4XCA1GWauScx6Gg%2BFDzsLUQL0ZCg2UJ70Ilkrk8Mhl9YZwNjQygykkyFLyx1AlRWlvZPUAIufe8h2EGp3r60a3NxuMQH%2F5FNhL45PXUq4kBuDQnxdwdD4jJPSn4UUunPxQhUubZJ&X-Amz-Signature=0e3ab7f9952fa90e0dd6847729d9b07d9518b7e3457b17af66ae375c03d5b2c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAIUS5J2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA3XjHEhDdox25X8PtjR976ss9msGstHMXh9wm%2BM9TFhAiEAyKvDfbGIuBOn8BbcM3d9V%2FsEuPohI2O1sJT3bjX9jmoqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJHMlgNVk74808o5MircA06yo5IMaF4aUfg2R7vbSj4zLqtF0Zddg07LgjHgXxq0LsmT3fyuug8xJ6D86xbh1Hrma45MHiuycVaY7GfXTmkGQBVQnLqwYuxIhQ3%2FiVSYoiNUjWVoTWVrFtWSyBBRV3ZKhGSDRzLgQYzpAuovwK8vu%2BhIulT5E9tsYs5PI8rY%2B6%2FG6u%2BEPWT8IvXcfVbCBW9Tv%2FRjA8eTm1Db8zTN6MQYh5mZUYMUzhj4Jp7Gm2galHQjIV3y6iq2bvREqnaxMUC2YrSEd%2B8mLQNH4lvDjk93kHA8MSDLJ0Qhivv2ZK9BGSCa5MsZL8vGgp%2BlttvdbUBkNldGqrWEprcFm%2Fgs6Zd0aU%2Fc%2FxNMa34lPiQKItwv%2B0f5nR4FvBzmKJYpSGoN%2BeBLVt715MraQDn6TL54J%2BfynbriPmfpIUnXdmRPJzDOysy%2Fj%2BUMyOvbzpuve6ksMbYm3YAl0leyjwVEH0l0S6PYvRcSLrlVFgnb6NWJOysy5FXM4Agdka2VwtDwRukdBWxRBCV53VaWs4QmChOfCohewohocAXl2LgDh8sjf%2F%2B4M5par9cLuF0SW0yWvT3NYTMEz6%2BCKkmaxTMuRh%2FmVJO7%2BIMFvVn1BnaduBxpm8QN42Q3d2st44wxftrXMKq7sc8GOqUBT2cwvPgLNjbbEJ06IDN%2F0Ml8N0PdFkVo1s1inY%2BeTeAY6BoAxGo8sCcchAPyjhrm7dL6g4LfHVorKXoevsMJ61wHDvsNDX8FjLkOZz8YBlgpcBwfEII%2FOzIfBi94EM5l4i94vO5dHyad0ji2ZU5FJQWvU20%2B3JxiuAkAVbWmyEtGz4qRTRUoTfVzhP6NqGL7IzOZ6kfOetNfPXq7BjeyH%2BntPYjE&X-Amz-Signature=99968a2b4e564c734f661ee7b0306fa5edaececa19a91db8a6eb7269d1a69a55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTGZPYAR%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLN882cSQCS5ISDXB78THPFbuDdraieu7U6VAnZZis2QIhAJM3%2BOU3ATcM4L1x3dL9AxbJFAnKjh1gqGS57%2BJaPZtuKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzEeWEtHculuNJd8QIq3AN3b52QAJLjNUn5von1yV8BSA%2BUUKUfiuz47RshQbwLCnVghAY%2BuDj7gxohdX6wXXDX4TTOZEwlOFjemGSAATy3DGI%2F0yCjTk8zFIKro2Cmii33lmeJnPfMdERYMYwmc6DmWA1AzW53mi86tZVLtKmLBdZF0SGwapsUQZEtzZNhA%2B6y0l9hoKxbAjBEKr5IfxfMgUnY3tRfjfhZ5HQAfc4LqKETrNuXLYg0mpHPUxxf9ru2H1BqYSdxrYuhnhBkjGUdrEXSis0Nt4jRNHrBIeGdIOgmj5%2FiIq6%2BQmKNDfDtbDG0sodN01vohe5DgBoZJ78XwDr3C22B2MCMV4bBrQktRkFn%2BXpUMnZyu7ffuQXw0z1G4HxTW%2BeWK2YOxGs2%2Fo8gCj0sFe3ntTtlUIY8XIhCSahUsBfFoHAz%2B%2BdIxgrZz%2FyeohFed1NgMc7A956ovOktaJUYGGisjUhOAQ7eFC%2FC9JjgEQEa%2BJoRnjY1q05tqcsi9kcnyXSQGiPezbnzs1DV%2Fqxdy5whAnghxi6cZUZdjLNeinRZcRj6PdVy0bc7pdhAuwnx52GyyKX56dq5mEUwvnR9uloQajHXqaicLH%2Bcz58tH1Ye6gb5CbrUYN9nhdHN9Ml2q7ZvhS%2Fz3zCVu7HPBjqkAWu8x9TIqg2%2B8SBeYBcsh51vVYDTXXe1dM6oJ6HxUesSIbCrcmzpqskqtUPapcZVIX8BE%2FUYe1%2FKsxG3z0ve9wxIVWfbGsBLyAqcMUcGQWtw9UcmaqTngSzgNhTBTAlHog88IgOrwChUeF6a5Hj4LrLXnh1Ld35gRW37It39MwPgy5fAqiUWQoxvujzRxsRp6OJFeH4qJG%2FTZuu2HEqlcFSp7AST&X-Amz-Signature=cdf88238c18233fb5fbf19a072064dcea6adeeae854b0deac4315546e0cd1674&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTGZPYAR%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLN882cSQCS5ISDXB78THPFbuDdraieu7U6VAnZZis2QIhAJM3%2BOU3ATcM4L1x3dL9AxbJFAnKjh1gqGS57%2BJaPZtuKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzEeWEtHculuNJd8QIq3AN3b52QAJLjNUn5von1yV8BSA%2BUUKUfiuz47RshQbwLCnVghAY%2BuDj7gxohdX6wXXDX4TTOZEwlOFjemGSAATy3DGI%2F0yCjTk8zFIKro2Cmii33lmeJnPfMdERYMYwmc6DmWA1AzW53mi86tZVLtKmLBdZF0SGwapsUQZEtzZNhA%2B6y0l9hoKxbAjBEKr5IfxfMgUnY3tRfjfhZ5HQAfc4LqKETrNuXLYg0mpHPUxxf9ru2H1BqYSdxrYuhnhBkjGUdrEXSis0Nt4jRNHrBIeGdIOgmj5%2FiIq6%2BQmKNDfDtbDG0sodN01vohe5DgBoZJ78XwDr3C22B2MCMV4bBrQktRkFn%2BXpUMnZyu7ffuQXw0z1G4HxTW%2BeWK2YOxGs2%2Fo8gCj0sFe3ntTtlUIY8XIhCSahUsBfFoHAz%2B%2BdIxgrZz%2FyeohFed1NgMc7A956ovOktaJUYGGisjUhOAQ7eFC%2FC9JjgEQEa%2BJoRnjY1q05tqcsi9kcnyXSQGiPezbnzs1DV%2Fqxdy5whAnghxi6cZUZdjLNeinRZcRj6PdVy0bc7pdhAuwnx52GyyKX56dq5mEUwvnR9uloQajHXqaicLH%2Bcz58tH1Ye6gb5CbrUYN9nhdHN9Ml2q7ZvhS%2Fz3zCVu7HPBjqkAWu8x9TIqg2%2B8SBeYBcsh51vVYDTXXe1dM6oJ6HxUesSIbCrcmzpqskqtUPapcZVIX8BE%2FUYe1%2FKsxG3z0ve9wxIVWfbGsBLyAqcMUcGQWtw9UcmaqTngSzgNhTBTAlHog88IgOrwChUeF6a5Hj4LrLXnh1Ld35gRW37It39MwPgy5fAqiUWQoxvujzRxsRp6OJFeH4qJG%2FTZuu2HEqlcFSp7AST&X-Amz-Signature=1eefb2e74b16fae57c3650e08ab57826af420d485e71002fddffcc2eacdf5ccd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YJJ6AOB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCiZhsNP0Mgk8ioI40DSO3yHrChYQ%2FI1q6BLX9X7QavNAIhAMWs1TeaSHKQMq4A8WpxZDtrCjmCkVIYQrHgoSW7iwdwKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxqWbkkzeBXLGpwa34q3APLzZea7%2BrBAJew6aDyR%2F0XWrwSPazep88I4IhSEq87D01TdHEkznZz5hIiIu%2FTHzm99mqHDggStLj3CSkoTAJ5CDwDLSR6FneZrbzBu%2FVJ8Fb0uGqbw636%2FWH2uRnzrnax5impmPqTyXU63udYUGH6SqEyjC607vJ74RiJqMP47ubBeFA8yJ8kx8OGlUuJKfm%2F5lTOxVOE%2BcmHN950fTWryBAiHYl%2BH05kjx3J92LgNzTxn9AWP6jA73RLUyERuNZ03rPti%2BqSV%2B4UgaMaiZwskDLi0rsvLlnfefwk5e%2Bp5h%2FmlMM4%2FgJrGlPXqoxPrrDaUF%2B8c89tXGXcKTC6dajUhG20oiU3fFEmg4M5w%2B29i2WOzRIQevqDwYkQJN7WbpfWW3rpnTPe2DITfqMuMemzJnACDxAUw6%2FGDfcJcPJVRIKIK2tw0wskYKTu3KxFiPn1zR%2BJDRTpcfi%2BJg2k3M3ygsOR%2FsBLPV%2FRRIYiUnN%2F%2Bcp7IJW0oF7RG4lk4LT61uCONlMsI2iK9kE7Wum8mBJr200TY6kh1MnAdhtkxS6N3FoGgyGj%2BbYX%2BnLNEK0gUltdDbi53H2IVv2cfQuRRp163f9n4taolhxoDGbjp8KmTW7rUr4838zGlB%2FTdTCtuLHPBjqkAWZ72OYJNe0Ca0qAAE%2FyMV1Uci3GyrVUe5xHW8Dd4qYyaUmls375CGirI8xUYdtT5JzK%2BpFcKDO%2BeJwysOBd4yG5EY81hrKzhQZ3nmO7A%2BExG1OLKNDtiUlyuo%2B2Np9ta3Nh9LFWOFNTdW%2Fmby%2BOiFucDnJkFGLCwdbtGilIeZ%2FMzz%2BPAqVRLqqXK7Dx1jacvTX0vzrM7yJkCaLgvv9N4EVj6V%2F6&X-Amz-Signature=197fd6dd865a4eed46e4806db7406bab2468b92030b3d048cac65a9266186596&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655E7BSZ6%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6A7ZVhiXz4AfajcJhfa7Q80fbEGvKjIYzKn32s1918wIgWgIvJyhZTmjxOZjjHIMrJJ2Zqt8qh3BtIL0xlccqCKAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2Br%2FEmgjkwzF%2Bu91yrcA6waDUw8PNdzwmLk6ZisBxV93Oq3%2Bo5FhP9%2B0c1HzvBN3ias3YNeKNNk1Z%2F5DJxVdqNCI4IbAsLvMctUNv5EWYzqfjpQhDE5BXY7WeyTzlchBI6wLpopsOaoVoI857SEj9xUQYmWUQo7xX3JMWRZDEs0rlbqoZnIO3WN538NplpCQYEF7x5wQNcjsdlVonYDfwkt6n8%2FdLvy7jT7uhhbyIDUyBEIkhweg7AqnGjobqZP9UB1M4ZHDZs%2Bb48vFuii4eihVHKQEVZFDpOWonPzZHnOUqKu%2Fp9zXIOwOTdfRRphk54HnoslZ%2Fh%2F%2BZPBVB4YK1GFEVWFoAEIpiLxg7YwubDbzZEW0rnGXgeTo7Z4%2Fnw2YMcBL4FQHP0SAL%2BDEP%2FWFqMJCfwGtCAqgEd%2Fr37Fi0IYdgFgu8otr%2BM19q7T5jl1AsND448dVBokxgS%2FXEpWGQOX%2B3xR5noil1Oxc%2BwaPaCU9uIU%2Ba1W31VvP%2Fn91U8wqrH2v521iF%2BSvhfYuoFJ3fVmwl85IX8WOzd37S5pDl2MKelyFUZWuahTGTe%2BfRtTSZbh5o7gYU4F2O%2Br28iHI1TAGG9tgJGw4m2%2BTC4WzWCtZUNupWU7b5YS0N997uTwYdAKKzUDuJan8YWRMMC6sc8GOqUBMuI9%2BR4H5u0cIckrAPp4dc4y%2B3%2FYp2rY1eQyipu4yIjDbRsFaIBgK3GSseRRFMcv4s6m%2Fmp7Z%2B9ZbRkKjHE9%2Brp%2FZ3vuz11fCsur4Z%2Fe3MeBW6lQHoYZIreDcYCW1vK5LAqV47tzKH7mmpvXKA%2BwGk2u1OvG%2BgTEZ%2BRIdMPw%2BvOynzWwTjaulsXv04y5A%2FDzCOd0HGoqRMaviPvShrWgCxUo0fKF&X-Amz-Signature=2f46ffbc9e2bf696bf34c66b7554e70b609f1415f456b33755d4e7405ef66b1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655E7BSZ6%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6A7ZVhiXz4AfajcJhfa7Q80fbEGvKjIYzKn32s1918wIgWgIvJyhZTmjxOZjjHIMrJJ2Zqt8qh3BtIL0xlccqCKAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2Br%2FEmgjkwzF%2Bu91yrcA6waDUw8PNdzwmLk6ZisBxV93Oq3%2Bo5FhP9%2B0c1HzvBN3ias3YNeKNNk1Z%2F5DJxVdqNCI4IbAsLvMctUNv5EWYzqfjpQhDE5BXY7WeyTzlchBI6wLpopsOaoVoI857SEj9xUQYmWUQo7xX3JMWRZDEs0rlbqoZnIO3WN538NplpCQYEF7x5wQNcjsdlVonYDfwkt6n8%2FdLvy7jT7uhhbyIDUyBEIkhweg7AqnGjobqZP9UB1M4ZHDZs%2Bb48vFuii4eihVHKQEVZFDpOWonPzZHnOUqKu%2Fp9zXIOwOTdfRRphk54HnoslZ%2Fh%2F%2BZPBVB4YK1GFEVWFoAEIpiLxg7YwubDbzZEW0rnGXgeTo7Z4%2Fnw2YMcBL4FQHP0SAL%2BDEP%2FWFqMJCfwGtCAqgEd%2Fr37Fi0IYdgFgu8otr%2BM19q7T5jl1AsND448dVBokxgS%2FXEpWGQOX%2B3xR5noil1Oxc%2BwaPaCU9uIU%2Ba1W31VvP%2Fn91U8wqrH2v521iF%2BSvhfYuoFJ3fVmwl85IX8WOzd37S5pDl2MKelyFUZWuahTGTe%2BfRtTSZbh5o7gYU4F2O%2Br28iHI1TAGG9tgJGw4m2%2BTC4WzWCtZUNupWU7b5YS0N997uTwYdAKKzUDuJan8YWRMMC6sc8GOqUBMuI9%2BR4H5u0cIckrAPp4dc4y%2B3%2FYp2rY1eQyipu4yIjDbRsFaIBgK3GSseRRFMcv4s6m%2Fmp7Z%2B9ZbRkKjHE9%2Brp%2FZ3vuz11fCsur4Z%2Fe3MeBW6lQHoYZIreDcYCW1vK5LAqV47tzKH7mmpvXKA%2BwGk2u1OvG%2BgTEZ%2BRIdMPw%2BvOynzWwTjaulsXv04y5A%2FDzCOd0HGoqRMaviPvShrWgCxUo0fKF&X-Amz-Signature=2f46ffbc9e2bf696bf34c66b7554e70b609f1415f456b33755d4e7405ef66b1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G3PWSR3%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T075652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQKReI9vufLQOjoocDLRUf4ANceef2Zud50zouQyihlAIhAJ5RvaTMVqi6vGQX1iJOkQWFmTioAOb9AKOPxYlh2OGWKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHfK2tPCJbtNIhJ94q3AO5LXsdNXonP9OidoYsp9k5IHCuaWO6MgrhXx2xDlYnqHXkHRGSZz66tw7r6HGtVlUPzEdqm%2FFEU3l1MGUfOpqrmnja%2FgfxYxXaKzfCkxEhkgc9MOoXFbCzkBSREqPkAdb6FZDa%2Bm7MY19GZZK7g2mUIvCHEgyqCLaLFyTdOHOX%2FgdkzR0t1pIROQ2PsRYPW7TiaFaCmOEVdp3DNYufYuT25QNksmMQGHJ5PqqHxSIwZANkKb8JMXejmp2it8cg8mBbGhy1D7wJ6Lxzs4%2BdOdpROb%2FpfQOB6msvIzwWOejx%2FJ6maGbBPyWoRB3WheH0rkw%2B24eaT%2B6398pQ5PFrurWhuQ80lDwdIATwJv3k%2B3wJXZfBc8ik8HOXQYTXofLIEi8esrCh4eXtRRxYC8zpMQQB81hxQp2eqePYnNCKNMkIC9GnVbRu4b2E7N8HsmuxjxyaFkkB4dPvFc2EqKCYfYIXc4Svs4HezAegM7FyfjAMyB0jEX1QZCdXixWACs3EW7DTdODGL%2FUT45EQcQX4%2FbJLBHgGYsZUyQ5tMpIUBtVWca9154wsgKep2MbfdtCVKqSy%2BMYGbYaD57l2MQmcSSEPkueW%2FJaozV3GDiMGqyrlFL3D%2FsF9fmmDvsS9wTD5uLHPBjqkAYQ%2Fsl1fETodfsBXKN5u1EzcydTzmLMK9qI0LUiNjGWqC361O6DZ1TlJN44%2FRf5UAa7Yc1fL84W0aF1ZBQGuTYymv6zzdtqoIV8GeG1CrPis2c0f6WrDrpobb9iMYFy2SaK3J8EHEUrcqFQQn0XSKvYk%2BhqDkilDWZJNiMEbF0evNNxOvw0177D8MaSwxMEJgN26lW3I0XAABJneGl1vzO%2B1ga43&X-Amz-Signature=b1193f19d1f9f969edac384052c1426f8d56d1c8778386a16b41e4a0c4513f3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

