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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNRALSP4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQC1XWF8dW%2Bk8VVVMBQfM%2BjIaSdBArbUgauOwf3EVjCVhgIhAOZj2z3zc6AGvtuwKZ85wMp48yzMhXmN0n58TPz3cuVNKv8DCEcQABoMNjM3NDIzMTgzODA1IgzNrR7I%2F36A2oKx9cgq3ANGBTuzggh0IZ6UygYzAhk6AZL35abj08M06b2WA8JPzQFHkwdDIu2AdI5NwRbQhYCPX1d4rF%2BsBbK2FAHOq36YEiefiibbb2Uo3yC8IP9nTJvfIRHTv4CkypaOMmqu3JCzBQOI%2FgcHmSCgkNoCSnjcl7tmsOcwDNzXsJO1m%2B6GYdHcnCTMXoMo3QkWlNaeBPqhu33YFa5cOgJAfnWfXa%2FMzoAiNwS6mb8ekH4im9NMr8EMrxq1mifcM2RA1TdmaV68jV0ONF3L%2Bhgr19VwDrpxn%2BVDUdpEosTSf%2BBrEu7JzXsB0m3dOw8mEb4lh%2FPDOtnElurXXT2gttAFfleu8I7U9WtAv8S297My79TBH86x%2FY05g5NMgT9C2ywhQkgwIhbq6s7saQUuaQRQkGfTGOGGMreZvKVeqHJjpE0xttv8nbj4xgRVuJUgf5CpKtjm9mcepkxy1Yu8OEkUaK3dt2knBOPTLwW998vEvOOPBuMKE3WJa4X5dmThWNyGDETlamkAX6mObh6MLW2q%2BwhtJYmwSBgrIn6VRYnZC6fQ7MVP2sAuL9FdPW3qOaCc%2FpcRDjrRQP1mpkIj51%2F0TRlHIzaUbyy7%2FmrK9FJeVfMIXdU8FdP5Gl69jHHIbc%2B5ZTCkzqHPBjqkAUo4l1VL%2BZ1qR2z2mExzP7vjUyYfyjqy%2F2u6KSpariEoOSjUWOuA5hVqZ%2BfYhxWVKMr3PqKR1j1SYQb3Yjrf1PA4KxNx5iR9Du639mjE%2FKjyKjiXT1jWSkeb%2Bx%2BEZ%2FkPjllAsHk34aIEWwb7no2FYcL4MvsMHXyXMuzUadPup28xedLMY%2FldQApyXcesIyim4S2iq7YxkPnhHsZcFhGDroexi3f9&X-Amz-Signature=41650b7e05b17ec70972e25ede3ee01f2c2b0d5f209feaee2dfd03c7c710a8e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNRALSP4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQC1XWF8dW%2Bk8VVVMBQfM%2BjIaSdBArbUgauOwf3EVjCVhgIhAOZj2z3zc6AGvtuwKZ85wMp48yzMhXmN0n58TPz3cuVNKv8DCEcQABoMNjM3NDIzMTgzODA1IgzNrR7I%2F36A2oKx9cgq3ANGBTuzggh0IZ6UygYzAhk6AZL35abj08M06b2WA8JPzQFHkwdDIu2AdI5NwRbQhYCPX1d4rF%2BsBbK2FAHOq36YEiefiibbb2Uo3yC8IP9nTJvfIRHTv4CkypaOMmqu3JCzBQOI%2FgcHmSCgkNoCSnjcl7tmsOcwDNzXsJO1m%2B6GYdHcnCTMXoMo3QkWlNaeBPqhu33YFa5cOgJAfnWfXa%2FMzoAiNwS6mb8ekH4im9NMr8EMrxq1mifcM2RA1TdmaV68jV0ONF3L%2Bhgr19VwDrpxn%2BVDUdpEosTSf%2BBrEu7JzXsB0m3dOw8mEb4lh%2FPDOtnElurXXT2gttAFfleu8I7U9WtAv8S297My79TBH86x%2FY05g5NMgT9C2ywhQkgwIhbq6s7saQUuaQRQkGfTGOGGMreZvKVeqHJjpE0xttv8nbj4xgRVuJUgf5CpKtjm9mcepkxy1Yu8OEkUaK3dt2knBOPTLwW998vEvOOPBuMKE3WJa4X5dmThWNyGDETlamkAX6mObh6MLW2q%2BwhtJYmwSBgrIn6VRYnZC6fQ7MVP2sAuL9FdPW3qOaCc%2FpcRDjrRQP1mpkIj51%2F0TRlHIzaUbyy7%2FmrK9FJeVfMIXdU8FdP5Gl69jHHIbc%2B5ZTCkzqHPBjqkAUo4l1VL%2BZ1qR2z2mExzP7vjUyYfyjqy%2F2u6KSpariEoOSjUWOuA5hVqZ%2BfYhxWVKMr3PqKR1j1SYQb3Yjrf1PA4KxNx5iR9Du639mjE%2FKjyKjiXT1jWSkeb%2Bx%2BEZ%2FkPjllAsHk34aIEWwb7no2FYcL4MvsMHXyXMuzUadPup28xedLMY%2FldQApyXcesIyim4S2iq7YxkPnhHsZcFhGDroexi3f9&X-Amz-Signature=41650b7e05b17ec70972e25ede3ee01f2c2b0d5f209feaee2dfd03c7c710a8e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTGO6XD7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIAFjqMD12aSIrLOuxeV3mZEpJLKxEhJgBJzFzrqzoaw2AiBxQ%2Ff1IpzQNYSUksXzBSwB7%2FxGtqKuEjaUPma%2Fl1cLRCr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMZQ03sc%2Bp%2Bc9xN2PrKtwDbuy9tcN8Tu5tBA8%2BmLPcThu3CWexn%2FxYnVypKlavTRoIExJadcw1Qmp%2F0bHFHxc%2BRzxTW5GhwgwF9cOjXqjMd4Gz4IcVSmW868eJhvLCA9U5EUjqUpNceamNKiZWLaRxvUIKx%2FaH%2FwMXsBvwI3Kg1bMoNBZDDHFmUh1H8fuf%2Fm2cYySxf6lraonvQI%2FtA7sv42CjYfpF8ZTQB2XtioIecOBj%2BvSA2P2kJOADd%2Fe6eDshaTpG78Ghi9ycX%2FSGNPhk1DMUfLi1u8AGc6rAiDxGxBfOPJzGvbLnVTM4262fx2wRqk2%2BfHonR30EjNp95lnShEpJ5D%2FU4C6w1xNZrI5FJWjKs8kNpwgWZ9Q6%2FswBMSjJASlU4e5yWw4Y9O63gUcRKms6JRLPyjx1qUgHeQOFviCyFGzVhVYfWoyf8P9QO9ABxblWjnFvXjw68C%2BlfaLWvJmxsxRrF5tjLOfu7B2YT7U7K2PrwSGnp6nHb3rD4lC3VwIQkOP2zm2sWFWhFK1OGqBLSspMqDbvPJ6imibrIDP4FzN60FKgQ4UKzBW38xQc1jGf3x6dZIO1%2B3Bl34a%2Bmg9sWGInp29n7sgL06q8VgH%2FT7MILiOv4nQf624s4MYVsYf61sTt8iL6NZ0w5c2hzwY6pgGgiIy8tBkLh1ltDg5JXhmDBf5LmFpyl6A7n5O5iBOVSmqNAjZBRR%2Fx77%2FadTwjvvfwbBiwuX1H8ddrJtYiKD%2BvMRqqVy3wzo6qKIP5C9od1XvStEAwpr8Bt9sfhW%2FJgWWbnoc150TOj%2FRwi%2BmFcdr6Szd8kHQTRzns9cap1WFOpCIVkqnnnB0c9qJsCvBH0tys%2FZft1LV8vmOu41j36ilp7wz63%2BlM&X-Amz-Signature=ec0fdac65fbe71c0eee9b6ff5e9a99295229b668796865bd17c72b1c0b5183d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7FAYJGC%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCICs3T7cUjEJ3vgbL4EDPyhbuAp8RKoXaM5gQ86xynMerAiBJrldVmqyHJDbMTrwG5JjFvSxia60cXp7OtngJ6RC1CSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMEFVaPOXvkdk9SEutKtwDpRY%2FKqJDpTwvZoZ37KSrvFM1Xd8j%2BQzN2O3TpXfFKFJe0nQ2g1vJgoCvgvzGm0N7tLhdBkIUuV30j%2BkPCcyYMgv%2FRXyocYm1Gq291mXd5MDknGBn4Hpc75KMmYN0qnG8KmNdCYJkpfQTsSO7HBFESGczDA98ShcMyJvRKuA%2FkOwtmP5qTq5OxEuUkirQak2Yxm8TzKo3BZC3IQgLyrvi9h3D53FYDrdhqo41ZiRzd7SLv2DbFf6wIPAja7nyBhSa78DtPMeDRdrWwB%2FdivB0THXSHWismDyhmCJe6ydf2R7XzLp1zf%2FqmmNuLTVwIr6YswmijYzl5ZPnDCd6NZr25esaPkaJMF4bXGD4DHSq767CwDCeJo45pz46MYuQUTiLIT%2BL631vjNSZIzJoF3%2BvHWMAUtAg1KU%2BIWPTJaABQo0ZP8u2dlkFwchnKQUOMAImZWv%2BPfinljG7RHLjxtHar9E7%2F2d3qEFbgAbFM%2B3xtuAmOiAnKFbtGLS6H%2Fsjo38dGlzuwwU%2Bl4vCLArsKbUdhcnicix00noeKHJn6RpcwdLn68Idy0DLGm2pUcWxwLDvlMDaV6euvi18IrnU0kb0QZaKbSc6CSi2qOQtCJdG%2FulbTZB5sKyjOeyN2%2BIwzs%2BhzwY6pgHbcFXlb2CGuDY5Ipy%2BpnsFvMduRo14%2FA9QVW%2FFKV7kC6gBm3ihzNGge5VqYzEI2EX2t5HH2nuhcj7TTItPeWBvRiZY%2BlmCTt3nS2i%2BcB3Twta6pubBquAZ1MjvZJvVlJEX6kMtEk4Q0FNg9625ex65qOPShb1XSRgqFKdCZlvcF%2F7nv70ADK9occYMbv1IW0rIz1TFn8hJhexp9CgfPeQzCy9khMig&X-Amz-Signature=dc929d2b71504695b50a846334c3abbf2d5e7114c38ce110f23adbfdca5a025b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7FAYJGC%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCICs3T7cUjEJ3vgbL4EDPyhbuAp8RKoXaM5gQ86xynMerAiBJrldVmqyHJDbMTrwG5JjFvSxia60cXp7OtngJ6RC1CSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMEFVaPOXvkdk9SEutKtwDpRY%2FKqJDpTwvZoZ37KSrvFM1Xd8j%2BQzN2O3TpXfFKFJe0nQ2g1vJgoCvgvzGm0N7tLhdBkIUuV30j%2BkPCcyYMgv%2FRXyocYm1Gq291mXd5MDknGBn4Hpc75KMmYN0qnG8KmNdCYJkpfQTsSO7HBFESGczDA98ShcMyJvRKuA%2FkOwtmP5qTq5OxEuUkirQak2Yxm8TzKo3BZC3IQgLyrvi9h3D53FYDrdhqo41ZiRzd7SLv2DbFf6wIPAja7nyBhSa78DtPMeDRdrWwB%2FdivB0THXSHWismDyhmCJe6ydf2R7XzLp1zf%2FqmmNuLTVwIr6YswmijYzl5ZPnDCd6NZr25esaPkaJMF4bXGD4DHSq767CwDCeJo45pz46MYuQUTiLIT%2BL631vjNSZIzJoF3%2BvHWMAUtAg1KU%2BIWPTJaABQo0ZP8u2dlkFwchnKQUOMAImZWv%2BPfinljG7RHLjxtHar9E7%2F2d3qEFbgAbFM%2B3xtuAmOiAnKFbtGLS6H%2Fsjo38dGlzuwwU%2Bl4vCLArsKbUdhcnicix00noeKHJn6RpcwdLn68Idy0DLGm2pUcWxwLDvlMDaV6euvi18IrnU0kb0QZaKbSc6CSi2qOQtCJdG%2FulbTZB5sKyjOeyN2%2BIwzs%2BhzwY6pgHbcFXlb2CGuDY5Ipy%2BpnsFvMduRo14%2FA9QVW%2FFKV7kC6gBm3ihzNGge5VqYzEI2EX2t5HH2nuhcj7TTItPeWBvRiZY%2BlmCTt3nS2i%2BcB3Twta6pubBquAZ1MjvZJvVlJEX6kMtEk4Q0FNg9625ex65qOPShb1XSRgqFKdCZlvcF%2F7nv70ADK9occYMbv1IW0rIz1TFn8hJhexp9CgfPeQzCy9khMig&X-Amz-Signature=30f46922ba5233077264582883464e8c7358be3f203a96dfe1a0eec8d2f9f815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URCPFCXL%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCUbzt6gITSxKcVrrR9BUFVZQmPnHP8nlhFAGGGji9WcgIhAPVYm6eP7dpBcCcW5u06xllNrjFPoP0DBIrlV9stqCTLKv8DCEcQABoMNjM3NDIzMTgzODA1IgxnOcI7FGsGK3TBtdkq3AMyV7%2F%2FSwLsAJfHDdH8e1Q2rBfsIkNrj8Z1XRvZIuHF%2BdYbdy5aIyQPFV4Y8%2FdoJoisIHW4kFAcwbZiGTatzxDSjOUBoiTgH2Horn%2F%2FFYyATUfkMjKZZXd1D3ufT2KotaoBNPGWKFVj7rAnoYGVgPW672ICehIMvN%2Bf%2FHKFRdean4m%2F5Kemf3kHjjUmQVEyH0BFJFom4ibt1SDgYplzFrG5F68KNjaV6FqZX6k8QYy%2B1xnkOzxYJe7ou82fyTPqJnoSgPm6cTqegneiQHdvLfNoOM1ob45Vo94pDLcqAAd0%2FjAPdZQWO8foHU8LWIUwnCfzcoMVhU3CKtCgRPaV0E%2FMl52YWUSh5W0aBkvoKnfAmz0ZRSbMJvj8KGp%2FPcgiWrDwpBttqg%2FWEVSfXOje7Bdb%2B1aLQfla%2Fqz5XmgSeIPT9D2WfeWZ2FK1oRKj%2Fw1%2B8znL4f4ISIZ%2FQHdKOAzsuZgc6BHZ60XxRouNAPsjCz04%2Fvfpn9md%2Bm2vjC8q6Q8lka8d0lqZMiOMJFMhJ8IolfOWS2zmnWRhUTs8LnV0DSEM51IritM0VTFkWZLY1GuJtFHzx%2B6WMohtMHOSTc4MgzndEQS0o8RdXT%2FxNQ2fl5TRbeY1N2t8cPOqDVqnljDdz6HPBjqkAVeC%2FHBEZaMp2jhn3wJDWnKzhAWr1T60OuVoVvIfg8dhFuRIOcKjtqMyz7Wh%2FnJhzLDxbB8A%2BQpIVWQ9F20vRbYxIs7Q5sI8bjODrHCFoVkR9zRkBTUjVxVw8vvY67FP19udQtveCZXf9GlQvkm9Zu5QetSDQp8iNHd1OXkXKkA%2FJAT4fl8ZobeqsQ7fWlTttl3PBn%2FGYISb23Xz3PLsXBXwGja2&X-Amz-Signature=1b31079f9eef06bf8ecbe11b6f6a3f343b992f04a52e13f1b6b143048712a768&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWXHU57J%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIBl%2F%2BMb%2FpUvnQUgTNGGlKgEgfgtbMy7eD46dZGPuS17cAiEAgDcuzULTgTTRFWlQJ3%2BD%2BPoqMxkfzbsI3wBRHC16dCcq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDPJmAGtVAR3y%2Bq8NkSrcA0L5sYQJPy9dZ82zyBJ1VsEvWIdlOG%2ByfLZquP2kTBnZsYesjLqeYjHzvSP8iYqDDmVdFE38pBV0T1BPlrGIvEoGkilBSpfTv0UDoKFBkmwZjb6CIlFisra8ygMzUUSww59i1xCx9bzoajPF3TRXwyc2s%2FfFuo10n4hJWRlO9qTH7FIFPletKdlKkQEmIxvztnPD7qcre%2FGZxu507YR%2FCQ9cgCEMMkNMZH%2Fynm1N3jiKA2%2FqKYUAW%2FWy5Wzw%2Fe4mW4lryhmd8tZOYmwc5lP7knKuwdh5IKUczc9v%2FzI5RP4SwTmotrw0e2uUwtaHK9Q1pqf4gi0QK3vS86ISLY0JhV9n%2BqFhd0nkrIcfzaY2FGV%2F39twAfgBDot9ArY0TXVU1CzAD6Iqvx2S2Hckwi%2Bh2kZ94TgIYSeTwkf9LS7ZTLvwSdpFu2aTlDCnuueWczB1yeRd5WGqc3No5ec9Ug8Vo8qQ8mrFLe%2FsOBYY20INMqakiNqLNmzLNvT%2BMP1HOggWF2J5nypXsAtuanhW6B9bNGYD0rwfGtIFnAHGerN5jCN89EdKp%2FA3lVLSmcz0HQXVYq2%2BGu%2FORzL3CFyFDTMi05T8UqPKq%2FLmz%2FLVsIa6dV92eFWZSx%2BhZWo%2B2M6IMPLOoc8GOqUBVCKUk8i0YuleVJ0Hll07WO8FKNXVrYUueMpfHixcIGAV8sZ7J0MrxHOTGH33gHVxjmztjsBaQGiuTV3sKl3afO8vehr%2BNgn1tqVin11ise04INx3JO%2Fn%2FQodNv9QUBitcq0Q6nSNOJRiZy%2BWSG5Lx6mGvw%2B8KJbfvmOb%2FYQHEucLjTGYYKKs4hWaL%2FbjUc35wiK8kJBFctfznpq78j9eBi3rM9ru&X-Amz-Signature=62e8eb88791c7d91fa1dfa1fec0bef0e739b48f11974510ea53ed5ee34cecd53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5A2IMP5%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDjh5jwtbJbMixxeDWWGVSk%2FCM2%2FJH4JU86ykvuWt%2BH0gIgdNOQUXh9rek5At3UgQ0PrWqbuKbHyMsFM%2F4eS3kDXfkq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDHuWMwWpeIEdWGATESrcA0hQNSBQ4sAvJcoraDuenL38jMoJZJ56kOwTCEjH0ZVCxGMJjt9s%2B7uPk%2BeBZePvsuCNPU7GcskAVqQtqyzMfLcRCJVGS1lMRIdT69Db%2BVbb939qcIxN3HkioYKlNoGzfam0SSHVxt%2FRiQieYFqiXFrIhl6j1hYPpA90kOqFDr09viRPE6652y%2BNKcBBpuFFvuovtdUiWG9n8RSufhNa2ar1tXD2l2kjvasJojQKuLDWbmF2FQKz%2B0Kat8BL7CXAICPh9L%2F03GRncB%2BYo2xEolgrWGcQcbnjVlBQfJ28tXKQyj0J5WeiO0Ik2g4pnCOtMIM1Cbgzl%2BHdVW83tfSD8ijoePtQAfEwIned1IXrfTEU2X9KNQxM9jKtyYwR9t3EHyf7GM4aOQKRYQdhfhIqHfFw5eO86139MSG6YlLQvQLEK2JKz4adjQqQLTSBtnmo8kAbJAEzYqcQTvQdXl%2FwNi1EvWhcyN11l6z4u8ZxQgxYquyb2sWMaxcD3e8kHmnQVbn6o%2FAtFtg1T9pMHnhUYj1d%2Fqw9eRBA7dwtQVRAJI6CKs4ykCPtgd3XUcSvbMru5Z2guz%2Fcc5Q8%2FJm42d%2FpWPT0fzAQUzbS1NzHqvJ55qWcR60FMugiIb2hViNBML%2FOoc8GOqUBBRj0M0l3Q5AkEP6lHzlPcHXvUxdU6CRgh83KZL0GcbFbD%2Bvpbc1%2BV501WYZC7dctpNKwJQJkZEWi7O%2FBQ09ie0BrUHyHXVwR077Urvhx5MIP8AVCkQOMKXZ3YwqL%2BGAHj5FCwufhOATGxjbfzbTntawERcOAIBdQGo%2B3qmYWrQjgA7F9%2Bn0ou1IrkPOLoV%2BMABh5V5DqbeN5fcJN5rNQ6e6VDkKs&X-Amz-Signature=c8af57651c23b5f498bed410a7f4ddc81615fb9f05e380b08d5a6c62f2a0eb78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636WBSRR6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDzWZBLIDNK0PKmCMWVMiUISDW2D5WkaHeT0YeAozAuJQIhAOrkBpaRDioWTO779bq0f8ncAq22Svky2H%2FUa0jEnPB8Kv8DCEcQABoMNjM3NDIzMTgzODA1Igyg8zMtYBLDZqRIH6Qq3AMA4EQyqd28EveIsv46Z6jBbq46ULrRUMZ6j3ywu7vdTancILKloGqJ0kW21wYLXnoOuG%2BsbbsynSPZLF9UhsxhOJunhuIQF%2FNugUmaSs8o%2BfUu2s%2FZopnjVWD0E%2FDfT88Ynaa%2BiRNkAmpDI8SL870FttTjgZ8EY6311hbfYvI7KqaTHpMxV%2FlBnLy%2F8qzSh3g107wpqMGSmgmNTr8ZekqcDfEmqdzWBcUQBKLF2Fb5r15E2yTpHbn7j162dZVu%2F%2FxHG4wyHkHyZr7MFwOy9inYTzIZN%2FoLeejlR0bHTmN70mksaZZ3QeYIx%2F7vOU5S1m4ms3p6ushdiJz%2FZa2vNy1BaJXClXZMGgItDV4eOMabc%2Bfiq8HiBr%2BVsE1Sp1iscFb3Vq85N%2FK3s5CtKwELcmr1mYDX7a3ynIJc1hjGdvYk9EI5Tzpuk3d2Kua7BOVULQ1TiEr%2BZ%2BWB7ly01LblKBBBJSgj8rX1ZW27mOg7G3dnWIkrJlafM7UEUi0pGam083KvLLm76nxn38Lkkq4g%2FslKyzfqJiQdqYUX%2BAsUnPWIHgUMOPSl9zbQ5tBG4w7CvN1clgTlIWWXacRGUNn%2FdV2OFGMbKsi5Lwo33ptcZPbIidk2LedKvC9j8cZwgTDvzKHPBjqkAdTmU0iyOznDYpFGas5fNdlpOL2jGXwtw%2FIvdQ0nA1LinuHw%2F36qNmzTEWpFxKDOye3T5bc8OshefVZUDMcUe1S2GYswDJciMyPer%2FOwH%2BKfug6U2IFEeMRI%2B1hLziBlx7IaLdnNlYAuVCL6dGJ4KnD6mV%2B%2BqvzmhVyTgh3sACf68OrsU6KU0rMa7oPwtIUbN8204F7tiziIDgaFAs10feYta8%2BU&X-Amz-Signature=457c40ba2a77712e9724dee97e4b7aa0312ecf466d6467867ba971dd0ddd50a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636WBSRR6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDzWZBLIDNK0PKmCMWVMiUISDW2D5WkaHeT0YeAozAuJQIhAOrkBpaRDioWTO779bq0f8ncAq22Svky2H%2FUa0jEnPB8Kv8DCEcQABoMNjM3NDIzMTgzODA1Igyg8zMtYBLDZqRIH6Qq3AMA4EQyqd28EveIsv46Z6jBbq46ULrRUMZ6j3ywu7vdTancILKloGqJ0kW21wYLXnoOuG%2BsbbsynSPZLF9UhsxhOJunhuIQF%2FNugUmaSs8o%2BfUu2s%2FZopnjVWD0E%2FDfT88Ynaa%2BiRNkAmpDI8SL870FttTjgZ8EY6311hbfYvI7KqaTHpMxV%2FlBnLy%2F8qzSh3g107wpqMGSmgmNTr8ZekqcDfEmqdzWBcUQBKLF2Fb5r15E2yTpHbn7j162dZVu%2F%2FxHG4wyHkHyZr7MFwOy9inYTzIZN%2FoLeejlR0bHTmN70mksaZZ3QeYIx%2F7vOU5S1m4ms3p6ushdiJz%2FZa2vNy1BaJXClXZMGgItDV4eOMabc%2Bfiq8HiBr%2BVsE1Sp1iscFb3Vq85N%2FK3s5CtKwELcmr1mYDX7a3ynIJc1hjGdvYk9EI5Tzpuk3d2Kua7BOVULQ1TiEr%2BZ%2BWB7ly01LblKBBBJSgj8rX1ZW27mOg7G3dnWIkrJlafM7UEUi0pGam083KvLLm76nxn38Lkkq4g%2FslKyzfqJiQdqYUX%2BAsUnPWIHgUMOPSl9zbQ5tBG4w7CvN1clgTlIWWXacRGUNn%2FdV2OFGMbKsi5Lwo33ptcZPbIidk2LedKvC9j8cZwgTDvzKHPBjqkAdTmU0iyOznDYpFGas5fNdlpOL2jGXwtw%2FIvdQ0nA1LinuHw%2F36qNmzTEWpFxKDOye3T5bc8OshefVZUDMcUe1S2GYswDJciMyPer%2FOwH%2BKfug6U2IFEeMRI%2B1hLziBlx7IaLdnNlYAuVCL6dGJ4KnD6mV%2B%2BqvzmhVyTgh3sACf68OrsU6KU0rMa7oPwtIUbN8204F7tiziIDgaFAs10feYta8%2BU&X-Amz-Signature=007eb8da48de0cb659ef16eda91d66eb7edf4d3567ce0d37e565621fef8f5d79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZZ2ZEJE%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQD%2BMwLZENIKTFKPgJiP8%2Fk8f77dLwdP2jhvcvCmPIFKtQIhANchAWTVDXjBc5jfwih1FsJ2YAEgs4Wz6mYMjRwBnPAAKv8DCEcQABoMNjM3NDIzMTgzODA1IgzcBqzBcx4scOxy1sAq3AMMhWq9KT15Dsych03e7GFL0Q6gsyJdMD3c3S4T%2FbdPylXe5CsEaiL1dzXy88wOXAUdnGDRbP9BTSLoOxRjF2tdLnp8vAWO2uUxfoyscDKXF27vwIjkv2Z%2FezaETbxmtMyXF3KNEafuxqS74FvYqnE7Fd7cHwwHv9kQh5%2BGiBqKZ5yWNhKMOiS6UmYZQal6yw3XU%2BR2fiFxMlC%2BRUrrxTLEhD7Jf4bJew9eE9SN%2F10KkPg1WaudLr%2BMOsUsN0bvSVHb1PuwsJUfAjODEWogXlhOX0ZU16R5UQv6%2BT2KzhiltvScWAONy7wKt8FcfuO1ZmDrPZ3gDQcwgH%2B%2BbpyoG2qultRHjHZt49awyX5BmY76gYaUDKr5PQGfL14uUrVWzGINcdrA7JtgyGuEd1WGCf26BwJl6lu278Y7IoiKpYLFYedpIqtSCW1hWEMtJZLw2wpNamWOOnMMqNgO1JQfg8tCqtqBrRWiDwws0rGzxCsiewLRqbpimMxowO7FoSqVCHlP%2BCBsGJ6%2BXcOqni8NWgzP%2F8qReulaRsf99k54%2B1TzZoNy8ioqDq%2BALGGK5USM983eYB%2BAN37mHOS57lBJrKkU0%2BN56MEwNCyycv9hlPr5cMVdcAbUnFRHDTyRnzDezaHPBjqkAQGgqcL2lCzI9pHs6DMVVliSONzEX2jLXdpUkh0BXm%2BZHVmxNm9aUGCC2p6MMdpvhrigg1ZP89ZPm%2FWTyvs%2BnQFhBdxZcu9QZTumn0CqSnOdc372KFt8t8ZZMW1XbDvCUENGBTHbdvA16dZtRZceND%2F%2F2kz7%2FHbLGZTlvfYrMtJLhMTsMUKBGeUSAXAsC5PHjVrDQ%2Fa6ZxXGMQKbwFL9t1HrHI3d&X-Amz-Signature=6a286329b97965210c157604f8cd4198ac820428796cf40b1ba5a203e310d6af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DZ43NIH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIG3xGqSVAJV5%2FyRjnfR7my8AfubYtkCHXWlYmCdWkrSoAiANXMnvpLuw8nbyTbJgiEd81XRYbStVMe5%2FHP7rv1mS7yr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMyd82LFoR0AtLpyVnKtwDiJl%2Ft6%2BZ1RlbTHY5diRx65VblaxRZCPp1lxIxX97i0DYd0UYYZ3iJLcJOGAQsW1WuCNbUjbjQJ%2B40q%2BBC426unOUzkOIADs54XqKpYI8CadXfN7qYhSKvHdJ4WJSREzXlMhr5du0eg0yGhCc0%2F7sA2XpPfVht2vFMRL7MfWAjXGi2qvBlYJzXVf5SASogtaC%2F4YZxv6%2FhWUBpug7cTV04BU5GminR%2FFZYEeLHGZg8JPNqZ%2FSfOVJBk7jz%2FoO7U3Umw6za7zPtJZCoRETdRR4k2k%2BpXbDiXpovaYTsUrKpy%2FDJxgn3IkqcwECt0WL4UMftIbrkcpdLmm3Hj5cDb%2BtrPYFchDQaP1TnQwzYOxl5QEgaaxMW0zbifcHCY8mT7A%2BG1pSBOLNKCCGYXlLy0tQQcMy5Xv3keLyUW2o1u%2Ba%2BfF11Z9KCQigXtJIShaDVyTnrb3bd3XsMQZU97rmvDcto2M%2BjacDhBWXF7UEf427SGlLYYsKSmYaVKhGmqGl7Cqy3YtSqiB9K2%2B2IzazuoU6cyVFIc9%2BH7%2BcqG%2Be%2Fet2K2DaVgehw%2BqYmMA45G%2BtqyQPy1mxCHekkSZIcWYuNqiz0NrJSO0yFwBjoqKE%2F0QaaSzKINTWoYgtUlp5Jrkw8s2hzwY6pgHgCy6Myqlyiirs%2BIdUPGMu1DNswpQNVLu7E4ta1L9c8jrxCN4G62MMzG4Srmci4N0ciPaNMhVxTOnpG5%2Fep6UESSoXygECxin2oFN1JKE605LwPgcmhfjJjUCsCh0zDF%2F9V%2BSruYkphZGWvm68584SfzFcQHS0u0U72YXma%2FgzL1PLnRHiNbTzhgo1tPKNtFOVDZw%2BP%2Bg2STV85WDlcQleqNRQRCwQ&X-Amz-Signature=82de0ea3e4518e23c6889f9d08ca087a9b348a414974d1eb36bf176da25c80af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DZ43NIH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIG3xGqSVAJV5%2FyRjnfR7my8AfubYtkCHXWlYmCdWkrSoAiANXMnvpLuw8nbyTbJgiEd81XRYbStVMe5%2FHP7rv1mS7yr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMyd82LFoR0AtLpyVnKtwDiJl%2Ft6%2BZ1RlbTHY5diRx65VblaxRZCPp1lxIxX97i0DYd0UYYZ3iJLcJOGAQsW1WuCNbUjbjQJ%2B40q%2BBC426unOUzkOIADs54XqKpYI8CadXfN7qYhSKvHdJ4WJSREzXlMhr5du0eg0yGhCc0%2F7sA2XpPfVht2vFMRL7MfWAjXGi2qvBlYJzXVf5SASogtaC%2F4YZxv6%2FhWUBpug7cTV04BU5GminR%2FFZYEeLHGZg8JPNqZ%2FSfOVJBk7jz%2FoO7U3Umw6za7zPtJZCoRETdRR4k2k%2BpXbDiXpovaYTsUrKpy%2FDJxgn3IkqcwECt0WL4UMftIbrkcpdLmm3Hj5cDb%2BtrPYFchDQaP1TnQwzYOxl5QEgaaxMW0zbifcHCY8mT7A%2BG1pSBOLNKCCGYXlLy0tQQcMy5Xv3keLyUW2o1u%2Ba%2BfF11Z9KCQigXtJIShaDVyTnrb3bd3XsMQZU97rmvDcto2M%2BjacDhBWXF7UEf427SGlLYYsKSmYaVKhGmqGl7Cqy3YtSqiB9K2%2B2IzazuoU6cyVFIc9%2BH7%2BcqG%2Be%2Fet2K2DaVgehw%2BqYmMA45G%2BtqyQPy1mxCHekkSZIcWYuNqiz0NrJSO0yFwBjoqKE%2F0QaaSzKINTWoYgtUlp5Jrkw8s2hzwY6pgHgCy6Myqlyiirs%2BIdUPGMu1DNswpQNVLu7E4ta1L9c8jrxCN4G62MMzG4Srmci4N0ciPaNMhVxTOnpG5%2Fep6UESSoXygECxin2oFN1JKE605LwPgcmhfjJjUCsCh0zDF%2F9V%2BSruYkphZGWvm68584SfzFcQHS0u0U72YXma%2FgzL1PLnRHiNbTzhgo1tPKNtFOVDZw%2BP%2Bg2STV85WDlcQleqNRQRCwQ&X-Amz-Signature=82de0ea3e4518e23c6889f9d08ca087a9b348a414974d1eb36bf176da25c80af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRNDPGL6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T062633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIHGlPEcWuWTcIJWz3TfpV37vyBG1YA3HSKCelwkWw9XBAiBHVaf7iwArci%2BKUjeh9elmDdmOocxTXQETpayEoCB9Jyr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMPy81nnegSXxahiPSKtwDigID19Tlz8MDVlgbMSfQ6m0KmmHoWqT%2FRdL%2FsLiNi%2BG26NewnnjOYzLSgs8Z3zrKKPIo4TZ%2F5cVN7KzoS49gITJFZjH%2BqPmbHien9W8F%2F%2Ff%2FzoPhb6LWoVTW3VJGhszv09ck6zfgHLiQM2e%2FGp34I2g8JaiF5x5IytG%2FnrqZRUaGrd5%2Fl9dxKRGuFZF8LVJ%2FxcMLvT2kEsCjilLaV4KfqXrIszpybhFedmY4HwPfcEuqroUUEovrtfftgReD%2BfGy7Rv7uc8sG6erVVPvNmci%2B1TItD%2Bi2tA14b2UPku1ff8DvyfFeGoyyoeG9NhFnDGsOaTaMkpSyga3yy8MwASZ4eUd6k6etFMJQFxB3NLTm8tTTk8fXwRff%2Bm3221Hf3r2GkR2vuN%2FCCfhtWOI6GAnw4scvJSeb0k2QoUrBPWkL7ZV7K%2FTECxiY%2Feq%2BdAZg4%2BE5RpRvAYqd6o7LouHeTSy3drNwhoyJRbNLUUWSsrkMT50eQ3AORcyGyPr%2FlBPBS9P6vbaiAyhdqtdwJPxDriZxgQtBpaSBfa7kuoRaDS6wRXudWV7aLnEfqAqdcquQnW3NaI42z1hyAnUFKw6S%2B0NFtuWCMJwpQdkvCi8%2BYuDfk5e23dVSZWB%2BnCoY6swnM2hzwY6pgG9E30YFE5KubvzoZET15xnBueE9dDSKsZXyTKVJYAVGAB02ModYTHcn6APo338InDq2K9JtSDqidDeLbpQqKEaAKmF%2FDiS1poRWXsmPXDdJJIuGa%2Bq7S%2BTZ0sYmK8B%2Bx9r7CE8gWXKl9PTITTCvtXTZsyoi1VIku8RxgcArWhybBOpwJ3tPXL32lUUIsUp06rUsFGUsJI%2BmxoSwWxsD0mci9qu2kNW&X-Amz-Signature=51cb08c88c3b8f9d3eea169902127feda08a07ffc6097ffcbc9a5fd77a0cd22c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

