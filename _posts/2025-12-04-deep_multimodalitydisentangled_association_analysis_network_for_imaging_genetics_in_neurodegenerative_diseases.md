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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SSMR4E4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDTAfwDM2pB%2FwzkhFLu1%2BHyXMkFZgkpWWNGK5tT1F%2BowgIhAIwUGRltSSbuQqYJNTQEprOl24QBPFwdQYEj581x1iU8Kv8DCDUQABoMNjM3NDIzMTgzODA1IgxdYdwIWn3jPIaIN1Yq3AMNBAesh4kzAwde%2F9lR3PNyKPKAv2xL0mXPfpgVbHF7DZbVBbwfb8YM3vh75AU8DN6SlJ%2BrAsopthTwbiBWhuGprN1CWmm4VrnV6BZz9m%2Fpnx%2B8fweB3hOUpKaU9E3FD8RfuZtxw225MykUqjBbk5plWAU5ySErVCpI7Q5islP17NDb6gN65KmSKlhHom4WnDJj0exv91PgWbx%2BO5mhqPTIqNRD8hY9R8C9dg2MGP5yHJxvK14mSIkuCEYzKN8KIz06sXAfRkOc0ky708L5Vj0NL8Gk1fg8%2FslupXInRYBGTKx0QZee3vRNUz%2BPH35sI%2B6GvWX2nvYFJhko0tIFqoqaJ%2FZTSO%2BKO5NxbJGuyYDMd7bxufRGWwIexsTrKRCZ4hJ12r9x7qBjafhgLV85PPoXKyKiNPRnQinB9%2Fo8puptn93%2BX3o22rDWLD8EAKCOXBHOlpeurMMFRC96jcqciZ8g0HambqxG6z8%2BnyIFLF6BdBuMuf3LEWer0cC6SRjEP7D%2BOnqUm1R6NHjgSGL8t2uzedqLsGFF342kdySGbb4viVHTpG7yCT5F2v05YfWmzdGe9xg%2BkAd4kGDWJuDro4BO2EYE2EfVfv1MkxZu5tBhafYc4%2BLK0vR3oEnfqTDCiq3OBjqkAa3KmiVKByRYTQcDcH9TA5MTWedehn%2BtJeTZzQdpoHYGrSzqn0A3Vs%2BHvTq4gQygpgZaLO6Lvipm9MkLJiEMaNtJ%2FoYTkHt%2FGrkX16NFxmoKGa9jaezkoUSo3L9STfQqNlGk5SxvNjMQ5kQCKo3p%2BBMofbgw9fTL0%2BOYx5SWteZF62AFaCKZILHyQMYPa5tWk1XHGkWGEqBtsN3RbtxecAwZIRDR&X-Amz-Signature=7a9c0c613c2a9cd99deb112073f0dd5fce680899414f8b712b103322406cd66c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SSMR4E4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDTAfwDM2pB%2FwzkhFLu1%2BHyXMkFZgkpWWNGK5tT1F%2BowgIhAIwUGRltSSbuQqYJNTQEprOl24QBPFwdQYEj581x1iU8Kv8DCDUQABoMNjM3NDIzMTgzODA1IgxdYdwIWn3jPIaIN1Yq3AMNBAesh4kzAwde%2F9lR3PNyKPKAv2xL0mXPfpgVbHF7DZbVBbwfb8YM3vh75AU8DN6SlJ%2BrAsopthTwbiBWhuGprN1CWmm4VrnV6BZz9m%2Fpnx%2B8fweB3hOUpKaU9E3FD8RfuZtxw225MykUqjBbk5plWAU5ySErVCpI7Q5islP17NDb6gN65KmSKlhHom4WnDJj0exv91PgWbx%2BO5mhqPTIqNRD8hY9R8C9dg2MGP5yHJxvK14mSIkuCEYzKN8KIz06sXAfRkOc0ky708L5Vj0NL8Gk1fg8%2FslupXInRYBGTKx0QZee3vRNUz%2BPH35sI%2B6GvWX2nvYFJhko0tIFqoqaJ%2FZTSO%2BKO5NxbJGuyYDMd7bxufRGWwIexsTrKRCZ4hJ12r9x7qBjafhgLV85PPoXKyKiNPRnQinB9%2Fo8puptn93%2BX3o22rDWLD8EAKCOXBHOlpeurMMFRC96jcqciZ8g0HambqxG6z8%2BnyIFLF6BdBuMuf3LEWer0cC6SRjEP7D%2BOnqUm1R6NHjgSGL8t2uzedqLsGFF342kdySGbb4viVHTpG7yCT5F2v05YfWmzdGe9xg%2BkAd4kGDWJuDro4BO2EYE2EfVfv1MkxZu5tBhafYc4%2BLK0vR3oEnfqTDCiq3OBjqkAa3KmiVKByRYTQcDcH9TA5MTWedehn%2BtJeTZzQdpoHYGrSzqn0A3Vs%2BHvTq4gQygpgZaLO6Lvipm9MkLJiEMaNtJ%2FoYTkHt%2FGrkX16NFxmoKGa9jaezkoUSo3L9STfQqNlGk5SxvNjMQ5kQCKo3p%2BBMofbgw9fTL0%2BOYx5SWteZF62AFaCKZILHyQMYPa5tWk1XHGkWGEqBtsN3RbtxecAwZIRDR&X-Amz-Signature=7a9c0c613c2a9cd99deb112073f0dd5fce680899414f8b712b103322406cd66c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQ2U3NZ5%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCiZfbBbQ0qV3yE%2FaojIfdWas7DomOYa9Tux07JpD5TqgIgImu3SOcAjW92wpSk%2BzWGJed2rU%2FkbcbDP7xYuUhfuNcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGkHA6Lvj%2Bi1ubax3CrcAyGxJ1%2BPYLhK2a3N3FNw4V0k7oW69sI%2BugCe5Byg7RIENuvNSGhZUsgTvvcGTIrrdKM%2BpBvi5gPgmYyadTMdd%2FNENBT%2BXdeLCm8awfOw2322Fwec0sHpWkdUfL%2F%2BVmYDimnc5ba9ijfC%2FOr9qw9jc%2B%2FVofeiDU6qLWsqSUKDpdG%2FR0cA7YltupdfaW0ZZXz8jgDRRI117yV99bkipkJ%2BoMb%2BheNpM3ZzpiNQNEd46fYznuN5Oj5Uz1AqshAROlXcqzSwRlhu3uwy8VtjxEjuB33CYifC7MpWtSetcd7ymdFuNB1MEUywXH%2BZ5u6ro5cJsittiEqt81PuAxSJJVqA8IvKdZRs%2BRl55kUI4ld2htT6YxFfp7bsryrij14RsSieNkAP%2BN5IoSNDILSt264o5VoLHmnTP8lnuE9ukZB%2B37okvZvHVtMGUuZw9cPQuFMcCzCjuwYoKNUkP50FY3UOWRj269PJL6KQcJdDkQqWsfppjGm2R1NJ%2BCn6x0jFWsDs90MtDOM0WCca8rid%2BHH%2FCy5iFJpkFX9NVZpNMh6AGfu4FFbu1RLqNDs4wYLMuykdAR0dvpKf6y%2BstPMK7WraApLqEY%2BrUmwauHVp%2F6sAZ2IlJC22R59x%2F7KbHA5yMMqLrc4GOqUBf1tcqQIG3W7A%2BTYXQSCHkGmNjkM1oeFWz8QZXTDjJRrRiFgSUjzGIndEudkNU7%2Ba%2FwuxAZ7H7m0Pj35SZ94QdQ2Ys3eA99TTA6c1bmouxg%2FMjsJSSs97PIpvOfxNn9SyEw0%2B8kXYW%2Fw%2FE1rs8gGvjsKIsnXojVNbzoG0Am5wBS6T1Glf%2BzmyK4hvuCoPnRidwnw%2FqJ1MgRckrmVIAKHRyMY%2BEckS&X-Amz-Signature=d8154bdaa3d2b25e856bc88b1c9ffa5b2fd2d207ec41204e4dc427113881e899&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SRBKENJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIER3LfJsOc%2BRlMBx0%2BG3v%2BlGk6DwEYBNOyGplcqfCJsVAiAQOrlNBFoKR7x8wczEoxqQlf3CZnc6DhdgacCXlI2Tyir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM4qarCoPdBZ%2BozK%2B6KtwDydNk3b4Pf9IMIj1NDmUVxkK4kIlnolSDrzUko3AZZuDxfXHMHOtFwU%2BSrzGatUKqcavL1NLjx3OrWP7WzBNnOy5JqAEUoDCKjUqWGrEpx3xwDQ6GcebLcK07FXXTjyPRCj%2FsV2p1d7HL%2BfbhLw%2F2drw7UDRYYA6JuFXLvyMAp8TpgxC4X5tfOqdd2FH2Ap2GI2AZQ3Fryqu17lWG29n%2FNY0%2Fp2LUJtx1Ied%2BT2yU60D0ZsqwI98wFb%2FD47paPDlJBZ9f37V5aF%2BRm6ZbQGkeTSnMGkd%2BHMAt8PlQDnZKMQVm%2FA4NKNQQF0h5B6UBsrbKSJ%2BmpstGGeKqZ1Fj4OqHkB8B8xB89HiAI%2BgY2kVPGL6AcgN7%2Bd4%2F2uOVvRbMTuH6AjU3eNT6OxOKl2dUbhZF5hBGJIPfe1KdGuN0y0HPeV13oY1%2FxW3KY6ug%2BeuDiBogTBE%2FyvAjUbI6ITEqGu9khVfa6Z5XSC5%2Bd%2F0zwA8JLQZTulyPLBHWOR7CU5QKFFJddszgRmg%2FOHj0snsbsgnZhrpo1O8LyvhxcNyXoyyDZsZcSc0gUfwmZKXH9egSJt0wjQ%2BejDvrLM%2Fw49he%2Fxp%2FdpUYB8cF%2Bzx0%2BVr%2FAtATeU9%2FD4ZcdJo1gLGtyXMw4oqtzgY6pgH5QR0TDrgrx%2FPySIXpYG35hIAv6v6zfSuB7FruYI2zunp9lx3mVy%2FQ1dvcXVgeMQYp7tJHcWT1rwCMBwwf7dh0kMHpQeGD0v63nL18Bnx13DSN4fVRLb%2BauhMCN0QAFqX0B78sUS7%2FdpZQAXXPy3rs%2B8t%2FcUC1slWr%2Bp56pB%2FZErllcZvsun5bLG8%2BMj%2BcfVVZZUlMLVccPccHfS5CxxmUpzf7wWpn&X-Amz-Signature=1d0b79a563fd07a1662f3ee1a0632c6efedb3e838afba83b6a82c8375a6ea8f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SRBKENJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIER3LfJsOc%2BRlMBx0%2BG3v%2BlGk6DwEYBNOyGplcqfCJsVAiAQOrlNBFoKR7x8wczEoxqQlf3CZnc6DhdgacCXlI2Tyir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM4qarCoPdBZ%2BozK%2B6KtwDydNk3b4Pf9IMIj1NDmUVxkK4kIlnolSDrzUko3AZZuDxfXHMHOtFwU%2BSrzGatUKqcavL1NLjx3OrWP7WzBNnOy5JqAEUoDCKjUqWGrEpx3xwDQ6GcebLcK07FXXTjyPRCj%2FsV2p1d7HL%2BfbhLw%2F2drw7UDRYYA6JuFXLvyMAp8TpgxC4X5tfOqdd2FH2Ap2GI2AZQ3Fryqu17lWG29n%2FNY0%2Fp2LUJtx1Ied%2BT2yU60D0ZsqwI98wFb%2FD47paPDlJBZ9f37V5aF%2BRm6ZbQGkeTSnMGkd%2BHMAt8PlQDnZKMQVm%2FA4NKNQQF0h5B6UBsrbKSJ%2BmpstGGeKqZ1Fj4OqHkB8B8xB89HiAI%2BgY2kVPGL6AcgN7%2Bd4%2F2uOVvRbMTuH6AjU3eNT6OxOKl2dUbhZF5hBGJIPfe1KdGuN0y0HPeV13oY1%2FxW3KY6ug%2BeuDiBogTBE%2FyvAjUbI6ITEqGu9khVfa6Z5XSC5%2Bd%2F0zwA8JLQZTulyPLBHWOR7CU5QKFFJddszgRmg%2FOHj0snsbsgnZhrpo1O8LyvhxcNyXoyyDZsZcSc0gUfwmZKXH9egSJt0wjQ%2BejDvrLM%2Fw49he%2Fxp%2FdpUYB8cF%2Bzx0%2BVr%2FAtATeU9%2FD4ZcdJo1gLGtyXMw4oqtzgY6pgH5QR0TDrgrx%2FPySIXpYG35hIAv6v6zfSuB7FruYI2zunp9lx3mVy%2FQ1dvcXVgeMQYp7tJHcWT1rwCMBwwf7dh0kMHpQeGD0v63nL18Bnx13DSN4fVRLb%2BauhMCN0QAFqX0B78sUS7%2FdpZQAXXPy3rs%2B8t%2FcUC1slWr%2Bp56pB%2FZErllcZvsun5bLG8%2BMj%2BcfVVZZUlMLVccPccHfS5CxxmUpzf7wWpn&X-Amz-Signature=0858f229ac4bd74b42381f913e6743b2d149ab6b8198fdc23e6c4bb65eb8c9e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UV7UPVO%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCUv0afF4LgD%2BlOvVBVgsJPIe3VBiN3GsqeBkhrsgPaSAIhAIYKSOF%2BwiyNex7u6WMx3wTdvlqIEBYd%2FUS4xN93%2F%2FnrKv8DCDUQABoMNjM3NDIzMTgzODA1IgxQvk93DVTno0DcFDEq3AM1pfZnO0%2FC5UGDZXL%2F2gIRifwiLkHawUJfC9KRn%2BdspHOkCM3B6V6afnKLs1mUOCRTPquDpV%2BT0%2B4TAddamuabE9e6xRZFaWNrz%2Fly7b5YJklu7iU6V0AO8MJEu%2BtJD9CEYetakMAmkvL5B2DkvMvgGlWInDZ3xcCMjRuKQHnsb32aUYQ3i%2FaQu5%2FQCUD5Mi3xnwiRHm7V7V9PGANMPZraF%2BLcN%2B9VXgVl4oB47jjGV0qOZkamsnp6rZgVp%2B9MAdTHHM2fUcXr1NG9Jdc4jC%2F1N122k%2FsdHnwe9n%2FVs8Tu75fr4sS44hwD2geYCJPN7845vj%2FEgXLheKUdpopy610uMPRFsuS8YGrPz4ZyZ%2FgzEKv4deytLkhNcEQc6sV6FsJwOsSnEsXdXB1H86er5hoA6giNo3mHFYYiM8wZDMdbLhWvqtXQUic0Rn3VbXH7qPbbVLMppq%2FRrLPehhsXLGmh3BKOMs1uTuD4IflWjOZ4n2%2BlXtSbX673gtbWQ6bbamtY11PzmD7ll6djFCtFdUn9GSspA1PNrxPGYZoEYPnINoM8RudD4sX9wK643N3E792CXp10X1Sdy8RXgCRnaJZVNC0Pu2MqkUJpCr2gY%2FmlgZqbZUFrZu1WSruZPDD2iq3OBjqkAdKBhrKC%2BnDl5iXTPjvcxUpAPigH49DuZZM0zFGBx8dgelbytkBuPLG7MP7eb8tNzmNjWYd4ASDaDs9MTzW83hmacYmFG1WUG4fEOuE3D5KAEPT0k8bjNLGMB2ImBXM3Cu6qeb%2BllzHv9poKRAUUJU%2FfoZkBxdCBpN7BguWAQhRtcEKYuAE0foPN0%2FVLU%2FWvXsbSTWYNlGvTA6BQ7IOitn5LyaIW&X-Amz-Signature=b40a4ef1b530ca107a0c9331787da9b4bb3e08519a6f637f2ad05c9712d72cf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH7P2VMM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIAcEJE%2BiIHBhYZyOKQ96iCG247ZsWUgLoKOTYpO4pf4jAiBFBrgob0Ko0HG%2BdyVwshd5SWJ8EjJ%2FeIvvFaXM0%2B8Ahyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMGg4hqGlaSU6Ved8hKtwDxiQ3R34%2FGMEzA1IeEk4L%2FJSQCVWPQieTDJLs1J8BQQUsHXsdgPEsjX6DN8Kfx2jZQLj28G87%2FjFFwg4VvbW6FCw8l0PnuZHhb585wPwHtTBJqc1WJJgqfvVWKF%2BycgnMr82Os4b9yL2KYm%2By%2Bw6Z99qn8BN9w2umQGUUn5BXh1mmr4ZfVLDnd4CovI6I%2FJjPH1s5IGUSXCormTlz5mrnBAvSyYopNLrZEMOl4kgpNoQiuyBrYILJS2%2FCIGmjYa0q0QTZH2pfC4NEmd%2B3mSeMqy1ReA1qFmydHX8o1rw1E5oL9dq12TwfmKSoTEnEe0rr0qKQlLdCJbslMqEe56ph7e0o9KyWLTJCGPVhQzeHBBM%2B%2B9CkMSDe33BU9ufqnzaRJK1pOaEFuUAHPZ5YqC4xf23gXOh8MPGf6%2BvGubmpIv062pLomVpf5Ka5tCtJoMJDwn27NEhO3hhV%2BrX0fZgey7nxBU3x62UOGowCT3lg0MK6MAhglvHpJVmuD%2FlQlAo9ZshnWMvc7G8pmVTXn4YmW0zX5qXGWdd8AkM%2ByRdDhdw%2B%2FhKesSKVBFSmJniRFLeG9L7Xf176Vx97mrLJNK2qGaxpYMtoVgA%2BSTvhi4jAeIrwyy1vmQbBPZNNiQswtYqtzgY6pgEwSVf3dTbpmgDE2JCSUdHUJhXbAE8NsrYpk660gGSzyi95%2BlRCwTRHyn%2BIdsmyPnt8vz%2FCX8LqkbYHKieHW%2BcDNFQfjfRgkX68XLD%2FqSPYBqPGc2n8GjfT3%2F0EE8PB4nGUDvQjjimgJNJg4w5%2FWFTYC8ijzsO1SA6txzRL0jAGfqRKplOSXsgbnzCwIUp8ea7G9D00mLrVKAdfLuQInqqNr9oLIZKg&X-Amz-Signature=d54fd3fbf5f77dfab12718c8bb3d735911efae43ac5e58ccd8996395725b1480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TV2SY6I%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQD3sYmKQxOM8l62vVA%2BWgdVqVCVb8Cm7Wc0loFqgPfcgwIgGq88iCEfKAdftzgnChfLpIUwSoCHaOu%2Bc3hes6vs7j0q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDIi5JXnxwpQ3ZXCyBSrcA1d3r%2B6ntV2kkJA83i%2F1X7IIlC9wJ3aowm1Qdqa9vJJQL4SN7k09qBhBGLojfbPkMAjqN%2BBH1jlpWqQmq1xSesvW0Gg5kVvR9umFdT7tr81AWmNs6E9Twc4ZOi2LNUt4ybCWPbDeGquciFNwLNfQ4dk2LkBRZEc%2F7Nzf9DL2uLZc8NM7B5sCZ%2FNA%2FDIm1TODPxiXlkgX9B7wIsdp5hnT%2FBJ%2FEVH9A2%2FtlRmK316lUKdXtEKREbH0oC44OdPutWTkAkEWT391pLvdCKminXnhcc%2BSrO1SXxC%2BUubb4tPyJPZyI85GNqzvHIsgecA%2FJ3Q7hUokfOKiu8o0pK58gQd88R3nTK7yTah68tbCQs5P6x1yylT45rLMulDZMwxJElbYiWEHgSSXib15JJhYaJuFe7LbcPDx4IlFNLRA0wVOk4GSv5mqvh1SN7d8KfV%2B6xcy7kccL70fNawlq5pa1gDNv7olIfHU6WUnJcD0zbirJ6UskSf%2FRjwuD2xu0WXADI1cUa41c95QVbTcsB82Yfv4dddCuzGIGmCs%2F7p%2Ff%2FxkWODhV%2B8ws5YH5l0xv3382FH8r6QUsPiTAqlr0%2BS6nlX3MJzMxR32wKgglmV0VH93LLZKMZduW4ca4ws7J6jvMJuLrc4GOqUBfVweG15%2BIzVTyWugsI7LjdO5nIG0XyczacSxoIGxbpHD%2FmiHox5byZ8TaR0DuMNOc9SnHFBh73eE1sYL0dsxVFekYfdnkVHOT06vwd57scgMrn%2BF5UPq576ZSLAmSvHCAXmh4aP4zkV%2BolyGFZNkvC72ruIbhl6g04Jg5ZMfqzvgvdMVU9PLNJ%2F4elA1kxjNMzIaOicMQYS3%2BbV32OAOY917IvFn&X-Amz-Signature=f7403800c4f9dd2c5f61cef796355ae94b3c1ea280591435fbb9123e475bc5b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ4QDOEG%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDcqEhl%2BKofZKxXHfGueKrjYtW0lH7D%2FD3W1KSx67ttwAiA65iVM5rco5hDq%2FjsM2dwlDSKowhBM1MTV%2Fti6GoVhoCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM4wN8EZSljkFzbzuaKtwD8pDPpUzIsOSnGSuZlWIJjudQisOKhxJZI%2BO%2ByU2QFsiC4ybAxfTAekrER9UznMIflskCfqBhOMJr2A%2Bbq5nRj57wrYPFXsEI59DH1luDexyQAlQ6pu9HTMIv0WT%2FQrdDr9O2Znsxa8ko7c%2BLc3Y5x9w472fcoXr3QktjngccpeUc5fKXMhHcR8eBUKYn898wmeYfyzc%2Bg5uxSPeu5tiZY3jYPkKZFVDB2ZM7npPhTJca4bdp9DB4TqQ1Z247d0aVYHKz43%2BxAr0bnu2aXHg%2F6UngSWPQUqYxUi1gOqzeIFQkGtlAXW4bSgLkun3cumEgbE9uizFkQajoqV7ZnhschPHHLBItrXS%2FxW8VbtZirzWH1PE82%2F1oO%2BfUjbsrGq0nAQN4kfrI0T2QfLE3G%2BKPDb1JrD01ofE4PDOZCIgJYp09uypWAGSryy0iaSsEAhjMlkPy9A8ordsM7943nU6yFaF0lB6rmbPW%2B1xvHFYBDSHIZ7eJkYVrtNOKkOC%2B5VJreehAE51AEY%2FCEWJVZ2RGYSbMJ1BoOK1vxeajmtMe4vjyKz03J8jgE21p8otIzxfQ0KgmNKswoteTh9wplDpOxriAsxSbK0WD9EAdz2mSqu75iZIF29eArfnOFhkwwYqtzgY6pgE3VDf4eMSTweWQPYnd%2B6q%2BbYF%2FYv%2FkzYtsh7z8%2F0GpzQ361jLR2b6oBhmfIDuQX6aVs%2FOWkydcelYFUNU1TakYxOjoiRKrE1%2Bmbf3g8DxLa8Djan%2B4nDKbDcOuhayWfIyA0XsxCXsCvY%2B1WqLrFRQkuA%2B1A%2F2R%2FlDLpT2GQSDZZ6xhpdQjOxmqKGw2w6EQknKfLotHGsJkB4AJkiIog6WZ9exforXV&X-Amz-Signature=79e4d2de53b7a452b293b61dd75616ae6bde1eba7fb88ca10c3636286c0311d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ4QDOEG%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDcqEhl%2BKofZKxXHfGueKrjYtW0lH7D%2FD3W1KSx67ttwAiA65iVM5rco5hDq%2FjsM2dwlDSKowhBM1MTV%2Fti6GoVhoCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM4wN8EZSljkFzbzuaKtwD8pDPpUzIsOSnGSuZlWIJjudQisOKhxJZI%2BO%2ByU2QFsiC4ybAxfTAekrER9UznMIflskCfqBhOMJr2A%2Bbq5nRj57wrYPFXsEI59DH1luDexyQAlQ6pu9HTMIv0WT%2FQrdDr9O2Znsxa8ko7c%2BLc3Y5x9w472fcoXr3QktjngccpeUc5fKXMhHcR8eBUKYn898wmeYfyzc%2Bg5uxSPeu5tiZY3jYPkKZFVDB2ZM7npPhTJca4bdp9DB4TqQ1Z247d0aVYHKz43%2BxAr0bnu2aXHg%2F6UngSWPQUqYxUi1gOqzeIFQkGtlAXW4bSgLkun3cumEgbE9uizFkQajoqV7ZnhschPHHLBItrXS%2FxW8VbtZirzWH1PE82%2F1oO%2BfUjbsrGq0nAQN4kfrI0T2QfLE3G%2BKPDb1JrD01ofE4PDOZCIgJYp09uypWAGSryy0iaSsEAhjMlkPy9A8ordsM7943nU6yFaF0lB6rmbPW%2B1xvHFYBDSHIZ7eJkYVrtNOKkOC%2B5VJreehAE51AEY%2FCEWJVZ2RGYSbMJ1BoOK1vxeajmtMe4vjyKz03J8jgE21p8otIzxfQ0KgmNKswoteTh9wplDpOxriAsxSbK0WD9EAdz2mSqu75iZIF29eArfnOFhkwwYqtzgY6pgE3VDf4eMSTweWQPYnd%2B6q%2BbYF%2FYv%2FkzYtsh7z8%2F0GpzQ361jLR2b6oBhmfIDuQX6aVs%2FOWkydcelYFUNU1TakYxOjoiRKrE1%2Bmbf3g8DxLa8Djan%2B4nDKbDcOuhayWfIyA0XsxCXsCvY%2B1WqLrFRQkuA%2B1A%2F2R%2FlDLpT2GQSDZZ6xhpdQjOxmqKGw2w6EQknKfLotHGsJkB4AJkiIog6WZ9exforXV&X-Amz-Signature=d00623124613115235735ba46a7ced3475a261ec15284fe6f1e30afd0aa07e83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYWLEVCS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD%2FZ4mJKTgu3A4TQyHUjVcc6wloskWg6LEtvUZc93Jh5AIhAJSDQOqUkKmSo7OvdxXgtvvUTGE1l58cOTlsg5pBs%2BCrKv8DCDUQABoMNjM3NDIzMTgzODA1IgzFzT0qWri1307azd8q3AOVOJUo%2BjGX97O95h4v%2FZyMIbcOkObdaMcANXmHv1%2BiKV1%2FxgzsnCJjipnVnSExqFOot19RQH6%2Fe%2Ft%2Br0A4f9CLCFmqj7KeTYM3M7QBv%2BF99a8IRqQIpF7ySXJJph0ylbPlx48jBkzLcEFE2ixou9yytORTkkiPQHgm6A%2BKShfXN43yWb8D3QdM%2BP6eOSUNo5U717RllZ3mMd%2B7GNYwbD4en1ujwGgLJaATxadoyWlHmMJBN1BKoNl0kVC9vMA9j5FO8h%2Bg97JD9aKFEVnDAmdOFiaumocS4j5b4bsixUBhrSg89UXlKJk6DIMMsEIHSyZ7ztqVLULcY3pOeNu1foC%2BddDGiKLTM0gM9lZ5pysHsJaEswojssVqBjHHkRTEtQv842ptPOdskaZPJbY%2FVZ5lJLKzVJIprpYfe2C1dPwQ9nsz2lGThjuPEqDtPczw11vJkNuMZ1XGr7O5Hsqa%2FlKU%2BjGztFZt%2B9S88QVWEbzkuDC8vMve1FnShzTgIuL5IpCOTRU7rqll5qCp3VgPo%2F04YkeDawisZsqPrtLUNxA%2BBJ5Sv5XwWMgae0EwINVZUrmh7cMdQP2MdbaE7jRHb0jsCnX0WdbZps9ETAOO8TPQjb%2BqcadRR97tpX%2F6KzDBiq3OBjqkAeuFnSiYVsuHhk9t%2BBqlisDIdFHQ48qzUDlQpgd%2BEVMPLsVXT%2B1cDsSO0Zw57rPTJhsxr0vGC0TKVmLbijuTjfxN%2BfLvIOVV8AvmUCTAIvdb2e5w8EOJ3Eks3C8dlP6IyZavWDa91Qa3PsJKgohwwJJeVrdq4Wqu6ubfT8ichnVQWXuPuInuuScdqRIzbsUdBc0%2BALWWhW43rCFE9YHZtV9eKW4g&X-Amz-Signature=435fbedcabec9de23eb512f423b78aa60d1c31e36b743f89611ea69d6faa5691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG5AVVZL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD8sZQYHLB%2BzdSVUwKjEapeb%2FEW0E7M%2BWzj3p%2FrdGc5pQIhAPwbxd9ilBnu5rAt76egcE%2BG5fBa3puntVJzOiSWtWLWKv8DCDUQABoMNjM3NDIzMTgzODA1Igz%2FThNlvtOgQNV5leUq3APzMTNRvBPW1Byzxi7fellrWire%2B9fzCUcIWAcWtgJSmQ16nqklS%2FfWPB6S7IEtZ%2FI%2B0r%2FF5RzhNmxuvAPy07JoXZoqck5I2JNMTvuQ0oz5qsyihAh8%2FaTfJXAYOFXFULxDJAdefEBII4H3%2B1pX1bRl%2F2qdupvysiYuSezx8R%2B35Y3dIVdm3xfxjklbc5GAwMIPiLZEIu1Pma%2FUjMEqoLKc3%2B6vD0aEBbk9tdW9xJaGVpjjXpaRM1PxApl1QN2U%2F4tz4J4iIF%2BWuHCuVTpgu6%2BE%2FZL%2BjSKL4kWukWNQPjuAnbK%2BjJOQKiYFNXfqIQ9Q26Ty3cfWsFqlnKwLuvPGc%2BvpvvkyrrwVESLIy66JpB9EtrftDjeb8D0p5Jkn9JjvMsSEIFQXy8hET0HZe6OOeyj2C%2BdFnlOsfrAP1tTX8HpvQuZQO5VQfHkqP9moQhY6tShEfO6EkBzwKgFtiWjrcfdERpDQDh7NXrLE35HC7q9I8UyLEn0z0BM5E2%2FSyIncuK%2F9R%2Bl7D6iLyM%2BcFSYLMsKlY5fmUrbmhO1pwn5UsDGvSfNhVl6rR48QPOoiO3E7tf3XaWJXVDvanMXQsj60vbkCnEp7h4KKfcFxGVFMarwOUoFfmX4mrGLRhtgs2jDMiq3OBjqkAUqWyp053jpL6Keqa4AWJqogcR6PsHSnjK4CVGhg6xzHR1LA2iyA7REqzPftUKrHI7zq3HUHKMChIHwt909quZcxSyZtjMmKpY6NcvS7qinb5shdBU3U0aPUY7mt64JRYW36McSIMLwC48rtOQPscOu6hUsMoiMPwTfR5AqNE7lnIF8YJgRCYF1cayeGOOMa7BPcSWLyswYx0%2BGrEoTjNdkuPCyz&X-Amz-Signature=3984ac6e493e54acc3060d471401215186b9468557b1afb720caedc1d8cb5588&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG5AVVZL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD8sZQYHLB%2BzdSVUwKjEapeb%2FEW0E7M%2BWzj3p%2FrdGc5pQIhAPwbxd9ilBnu5rAt76egcE%2BG5fBa3puntVJzOiSWtWLWKv8DCDUQABoMNjM3NDIzMTgzODA1Igz%2FThNlvtOgQNV5leUq3APzMTNRvBPW1Byzxi7fellrWire%2B9fzCUcIWAcWtgJSmQ16nqklS%2FfWPB6S7IEtZ%2FI%2B0r%2FF5RzhNmxuvAPy07JoXZoqck5I2JNMTvuQ0oz5qsyihAh8%2FaTfJXAYOFXFULxDJAdefEBII4H3%2B1pX1bRl%2F2qdupvysiYuSezx8R%2B35Y3dIVdm3xfxjklbc5GAwMIPiLZEIu1Pma%2FUjMEqoLKc3%2B6vD0aEBbk9tdW9xJaGVpjjXpaRM1PxApl1QN2U%2F4tz4J4iIF%2BWuHCuVTpgu6%2BE%2FZL%2BjSKL4kWukWNQPjuAnbK%2BjJOQKiYFNXfqIQ9Q26Ty3cfWsFqlnKwLuvPGc%2BvpvvkyrrwVESLIy66JpB9EtrftDjeb8D0p5Jkn9JjvMsSEIFQXy8hET0HZe6OOeyj2C%2BdFnlOsfrAP1tTX8HpvQuZQO5VQfHkqP9moQhY6tShEfO6EkBzwKgFtiWjrcfdERpDQDh7NXrLE35HC7q9I8UyLEn0z0BM5E2%2FSyIncuK%2F9R%2Bl7D6iLyM%2BcFSYLMsKlY5fmUrbmhO1pwn5UsDGvSfNhVl6rR48QPOoiO3E7tf3XaWJXVDvanMXQsj60vbkCnEp7h4KKfcFxGVFMarwOUoFfmX4mrGLRhtgs2jDMiq3OBjqkAUqWyp053jpL6Keqa4AWJqogcR6PsHSnjK4CVGhg6xzHR1LA2iyA7REqzPftUKrHI7zq3HUHKMChIHwt909quZcxSyZtjMmKpY6NcvS7qinb5shdBU3U0aPUY7mt64JRYW36McSIMLwC48rtOQPscOu6hUsMoiMPwTfR5AqNE7lnIF8YJgRCYF1cayeGOOMa7BPcSWLyswYx0%2BGrEoTjNdkuPCyz&X-Amz-Signature=3984ac6e493e54acc3060d471401215186b9468557b1afb720caedc1d8cb5588&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PZDUQWE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T042346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCDPKQwILyq1%2BwbnXHYAy772jZJ1uOhOjWrrB%2FlNg%2F5oQIhAK%2BPqQXPUXfWXgLa9d08WBvp7whS8NWfemyt4Tz0%2FvgRKv8DCDUQABoMNjM3NDIzMTgzODA1IgwTm%2BzZDV9IOrJIMgwq3AOMmM1Rd2TZo406bNPeGnsQTWcgUJcUCbJ6ndBduq3G6lxADCy1wqNRs2yOGrqZiVQCUnsaMl5zQzZRorP6lhmGawf74GzVhlycUu%2FSB%2BecIaTWq7EELhen6IzBw2gNRT3GG9wgeUbmA8FXSK91PvkSMtVUN8KDfE4AYah9wcprZrvuSrM0Hy%2BbaW%2FEk5AS5CsSFKFleW5s3suLCv5T47JgKqQ9dxGHwtUek%2FOXqQ4Jd%2FKfFmg%2F93BXtIfmqO9WTaYyY9AeV6Wck39PAr1gT5tuVioRptrIl1igCQKxLnAzljMIek1Cqx0nJlac37ckLyxglrC74RXf9dkzgmPElHrqgqRRWHmkFVnfjNVO24Dp90vhuFHilLXbZpr8VioxgD6L%2ByTltuwIYsnRZDMEX1tpxN%2BI8NZOVgH9F%2B9Yb1p6YSx2xjUmvmIDLbNmamWPn1yiTFalC%2BWys%2Fm%2BiRoekmCtphePi58BSgPYXquyXFI%2FbzX3oW0wfaZZBPT4slsfM8X5zQh7%2BtpNH22drWcIaCkjYxCH6lGkBHeLMJgz0QI%2Fc5oA4RMRHa7OYHKNt0g7yC%2BYETjnisn9UdDGFj%2Fh7hfPcE01tx4L%2FHHUqdcj%2Fzqs3HNOt0BlO%2BxXEESijDCWiq3OBjqkAVl4xgdH24N56f9bXW7yo5bnRL6Thg%2Byl89mGTjs9SJ4RmcOps%2FFnV6X7%2Bwp2Hgeb4X3nOVDsSOM4gjfuQM4FMld0sioCaCp%2B%2B%2Btxvkc%2F16pYnGzL0fUHu%2FhDvWXRPUGfNextXJBAb6iMocvGQ1mdcykAUm3ayPClLP8xFbPtY6C%2FqlIK%2Bm0AOL%2B6mKsSqB8KJQzyZTZ4lKbij6QZBFst8lpfJhA&X-Amz-Signature=5001d75cac052f7ad12ce263a50a7b9e0b3a17496ec9d28504fe5027e1a8104b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

