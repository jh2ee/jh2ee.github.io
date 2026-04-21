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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BNMGZ4K%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIATLy57a91YSXwBGHlqz5XHvRMs0JJN81Kv308xldrlnAiB8PbOtXN9aRkisNCB51UUIgM51eb37cs6nYL6IIKDCoir%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMXRnskPk8z3NBWMmGKtwDISC9nhZ7aKzlhyV04hX27r9Dpw6ggqQlmHry5aI0Hsaoxu1lx2whZJxuQIGlg%2Fu66BfzKqjqFZ7FYBHdJH%2B4zDVItKDyRIvLMgC6OgFD82eq84BBzzy28fFAF6bHgHrSylmoY1r3Vmvjt09tdlbq%2FFCUWPh0BaRwINHTxnceLrdnyjumULygcEmPRBx6pIfHhZy948T3ffNerCpr7xi%2FYHlss8ZaVTc44J4e0mS5he%2FwL9qgj87eO5ix62MvmbEhD%2BISpQQ%2BmY5xxN1nE8dOnJ%2FR7kLOGsvCuCN8q1QWQ4aDEi6Uwh2%2FdpbHzYeU%2Fdgr4JUxNGKccqV%2FkvjVWrzXEb5CBiOmC7n7qPyTw%2B6Yi9Jn7uultd9Pc63VwUAFh7ApmKoUFnL%2Bbh3Bpr4%2BRnNc6iF1IiUZzj2KbqLg0pWgDNf0m%2BGgKcgxAOJtLAUzXxfps2aX3naLaTeHkA6WGkoljgg0JevlrQrrNLvnKt8w0QfK7LKkjhhn0PZaaf9PQV8boVce80iASKhOEZk0TnL4pUeRfm9FXC5xEksr8CnAFIFTAMgzrhk4%2F2242DzOPMzyW%2FM9ssy%2FMqbWZ5arEHgOlbihMahwb5CiZa3CdDsqI00heKPZCAvbuZve%2Bdww0OGbzwY6pgGo%2Bc3dQmivj2sg3098hlh3HhE%2BcOFkhiAaW0hPzmk3E92mfSMZEl0y7nw%2BqFVMQN4eKGMdumuDDHE8wjArLvsdV5h%2BpgfLqm3Q0CQPYRHWM5zTA1l2acMt%2BifPdSLeWyVAmBmFCOUYnFknzqFlMxrLN8GD3QRcp9dQEzArS6fzvwwLFc%2FGMLrtRi0WcpW8fValwG3ShwhBRU4q8SBkY%2FfiQmW5uOgn&X-Amz-Signature=265e1e778794330b2ee9a4bf884500adbc62680108be25d7702add8f44471a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BNMGZ4K%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIATLy57a91YSXwBGHlqz5XHvRMs0JJN81Kv308xldrlnAiB8PbOtXN9aRkisNCB51UUIgM51eb37cs6nYL6IIKDCoir%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMXRnskPk8z3NBWMmGKtwDISC9nhZ7aKzlhyV04hX27r9Dpw6ggqQlmHry5aI0Hsaoxu1lx2whZJxuQIGlg%2Fu66BfzKqjqFZ7FYBHdJH%2B4zDVItKDyRIvLMgC6OgFD82eq84BBzzy28fFAF6bHgHrSylmoY1r3Vmvjt09tdlbq%2FFCUWPh0BaRwINHTxnceLrdnyjumULygcEmPRBx6pIfHhZy948T3ffNerCpr7xi%2FYHlss8ZaVTc44J4e0mS5he%2FwL9qgj87eO5ix62MvmbEhD%2BISpQQ%2BmY5xxN1nE8dOnJ%2FR7kLOGsvCuCN8q1QWQ4aDEi6Uwh2%2FdpbHzYeU%2Fdgr4JUxNGKccqV%2FkvjVWrzXEb5CBiOmC7n7qPyTw%2B6Yi9Jn7uultd9Pc63VwUAFh7ApmKoUFnL%2Bbh3Bpr4%2BRnNc6iF1IiUZzj2KbqLg0pWgDNf0m%2BGgKcgxAOJtLAUzXxfps2aX3naLaTeHkA6WGkoljgg0JevlrQrrNLvnKt8w0QfK7LKkjhhn0PZaaf9PQV8boVce80iASKhOEZk0TnL4pUeRfm9FXC5xEksr8CnAFIFTAMgzrhk4%2F2242DzOPMzyW%2FM9ssy%2FMqbWZ5arEHgOlbihMahwb5CiZa3CdDsqI00heKPZCAvbuZve%2Bdww0OGbzwY6pgGo%2Bc3dQmivj2sg3098hlh3HhE%2BcOFkhiAaW0hPzmk3E92mfSMZEl0y7nw%2BqFVMQN4eKGMdumuDDHE8wjArLvsdV5h%2BpgfLqm3Q0CQPYRHWM5zTA1l2acMt%2BifPdSLeWyVAmBmFCOUYnFknzqFlMxrLN8GD3QRcp9dQEzArS6fzvwwLFc%2FGMLrtRi0WcpW8fValwG3ShwhBRU4q8SBkY%2FfiQmW5uOgn&X-Amz-Signature=265e1e778794330b2ee9a4bf884500adbc62680108be25d7702add8f44471a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGQOQHMS%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDkAfyj7tVuVAnOcHY7cKOFTS3oFqEM97V987UpfWqdcAIgGUDd8coKfn0BdwgtLBnmcDQ%2F3GXGa0c94FREpXwSnhgq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDGDNCZw7hMLQR1j2CyrcA4Jkn6Ph0RY89Hir%2FeBZ0kFd4EFzVdJWbZ86FjjQv6t0B8q6Jq5xYBai87kkmFkXYytLiB8lOpfWQTYG56ptloBBDuX%2Fq2U4jehDLRDaZjF1lM61V%2Bz2KAr2QG0NzAD6G5Kj7UKiVuOKVbge5jQGQh%2F3DbKqDYW3GUh0n%2BkN4LWE5gKTSeKxeBr%2BQHSPvHCYGqOX0bEwUfdxY0jPo8iQkG1cqnIa3%2F8vQd41z1LF3hmwTWzI50fbqOvoGdXTjumZQKjix5P3rl%2FIASH3mfubKbq2U5bFYHJbmH53mtFwb9s54adtLkDt%2FOP637TNwDUnjTLbK3%2BxziA8xfD9GmFNSoEWCnr4%2F4Ma8%2Bo5kJhttuBrLzO%2BSBhuW8ZPrK%2FPWujpjYJ1SvqEIpaAK%2FLs%2FBMZx0jA%2FvecIPmgLH%2FU8nwSStFJWm9c1o29%2BmcQwrqW4%2FQO0Uhsb7bzmotLqKhZINFdKFm%2F%2Fdi9xtedC2KavJKamQ4eKSkIKmds5CyHlMieNpcdp7WNoketpURpWutXJmsWaRFXf0j4DDbLAqSDRSGvYWrMlHO4mp58JMxUNKZ%2FEZGYnboqaEXQfTwyPgIuVY00CUymyKzF1p9pXL%2Bb9Kg0aJMvYM5MBhGui79FIVFyMLzim88GOqUBhTEs%2FZc7upHKEhvKdKQXPZwugML%2FPhJd00TfpdqC5soFIb5mpVDBm%2FruogbI%2B%2BKVll6Qzeu7A9L6IJbKMM1HQ1X%2Fecm6X5rV5VLzuKn8gPbuqNNg7rZHhmQXboM8Ef0zfjTyRf%2B2ORq4bqAJlUL7PkeaEeoeMV6qeVLbPQf%2B9wXgTvT8yC0rNh%2BYy9tFF0ABQxD4cumH0ALgdyuPw1XE9FkGGYZ6&X-Amz-Signature=8061ae1c1165202f6186a865df460c4806cb44826088f2bccb8421852ccab511&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HEAW6WA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIDUpqDO9XZi%2BJLXjaCdJbzsgBlxVdB9Zh%2BgHmFwUEhXnAiARqKup2lkntOgJ3vsUeWc9shee7lonXGo19WBp73yzHCr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMrKCSNW5lWSsff85bKtwDPQDSPc1UXNDmjTm8FRw%2BUvXwgdTQLIyvtDgpi%2BFnF%2BHmvTYuXIadfTU%2F3cS4cVh50sfzxpagwdXpeN6e4K%2BEeD%2FHSdRiPDgReNovwSp%2B%2BKE42xsfBEl1h5FXJpWHZBNIPMxwTlPCwq8mXUJyvEFGAEwX2CjSfly8bVK38p2F0ooqCzgJGV2J6czbl4O5Jw5eGwAHY8vjmFqu255sTiNrU%2BUdZoKotU6%2BxYtSuCahm%2B6O1Z2n1hvuej%2FsD0astfcZGz0CuMGunU96QHNn8UM99JSZ1qGNGRsr3OPni8GuoilVWQ%2FjmScdhvKQBw8r7KQ4%2FCdaaH99kWeGjW4NigATmgSmZHCZy2Awy68Yu3gGx2ineONyPRYDukgoukZT3g4qogo40PNG1HUVTn1eBD3ZrUH68Icr9VZvZtxNcmWc1tbefI%2BVhE%2BYfarX8VosuS20CxkKQMDiDnqeuM8f1zctwYvSjR3CRZGFqP0p0hzitrysZILSFbz6FXUFPXk1zWkvBxfYNzlaBsTvijkA9b1n6snOT5hIq0rNGj0tLxScJ44V05qQNNqCqdqF7cFFjWSL%2FnpkgNwJABtx8vzATh3%2F3xd%2F1V0QsOEujLcv%2BGXEbOhKhV5jtqSrWeqE4OcwjOSbzwY6pgH4d9hNjsAEW7sCCkTegfnKfxfCKP4B8WBjwjm8SNaQPRc3oVaDkARguemgH7voURhALm1MYJGp42iWllFYn1q2ivC12nImWnj9wQEqnLmri3wjgDbbUKdelq%2BbGSRpZd98EA9Y4BKR8jqiT2YsKut5m1mUuqjFdf%2BnC5c9%2Btd2wNwlD3i4qXOMrXXoDPGq4AqnFemArqUlEGDmDqgv94SHgTTPOLAW&X-Amz-Signature=0ec880d456587ef96ed5a2228cd5337e354b6836205596ae549570b258cec3d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HEAW6WA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIDUpqDO9XZi%2BJLXjaCdJbzsgBlxVdB9Zh%2BgHmFwUEhXnAiARqKup2lkntOgJ3vsUeWc9shee7lonXGo19WBp73yzHCr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMrKCSNW5lWSsff85bKtwDPQDSPc1UXNDmjTm8FRw%2BUvXwgdTQLIyvtDgpi%2BFnF%2BHmvTYuXIadfTU%2F3cS4cVh50sfzxpagwdXpeN6e4K%2BEeD%2FHSdRiPDgReNovwSp%2B%2BKE42xsfBEl1h5FXJpWHZBNIPMxwTlPCwq8mXUJyvEFGAEwX2CjSfly8bVK38p2F0ooqCzgJGV2J6czbl4O5Jw5eGwAHY8vjmFqu255sTiNrU%2BUdZoKotU6%2BxYtSuCahm%2B6O1Z2n1hvuej%2FsD0astfcZGz0CuMGunU96QHNn8UM99JSZ1qGNGRsr3OPni8GuoilVWQ%2FjmScdhvKQBw8r7KQ4%2FCdaaH99kWeGjW4NigATmgSmZHCZy2Awy68Yu3gGx2ineONyPRYDukgoukZT3g4qogo40PNG1HUVTn1eBD3ZrUH68Icr9VZvZtxNcmWc1tbefI%2BVhE%2BYfarX8VosuS20CxkKQMDiDnqeuM8f1zctwYvSjR3CRZGFqP0p0hzitrysZILSFbz6FXUFPXk1zWkvBxfYNzlaBsTvijkA9b1n6snOT5hIq0rNGj0tLxScJ44V05qQNNqCqdqF7cFFjWSL%2FnpkgNwJABtx8vzATh3%2F3xd%2F1V0QsOEujLcv%2BGXEbOhKhV5jtqSrWeqE4OcwjOSbzwY6pgH4d9hNjsAEW7sCCkTegfnKfxfCKP4B8WBjwjm8SNaQPRc3oVaDkARguemgH7voURhALm1MYJGp42iWllFYn1q2ivC12nImWnj9wQEqnLmri3wjgDbbUKdelq%2BbGSRpZd98EA9Y4BKR8jqiT2YsKut5m1mUuqjFdf%2BnC5c9%2Btd2wNwlD3i4qXOMrXXoDPGq4AqnFemArqUlEGDmDqgv94SHgTTPOLAW&X-Amz-Signature=008e2c3a9a618cf855c8c8a340ee8e6ddbd281b0605c4a03aa7112a50fd6431b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653HMVBM5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIGUvzvOl3N6BI%2Bpo9GIyBhcTp4Wpg6O0K18xdau1gJT7AiBV1yepIcnjgNA720Gih5SH064jjh0%2Bg6pz3dbNMiDkNyr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIM9A8VFvs7mEw4YsQZKtwDg2J8ULvV%2BvcnA%2BzSX91%2BiBOYzY45y0vgsayaiV7o%2FSv5fPFj00e4CC17nUqDOOUoN6tnHsEJeGFle7IRtTdDcQaJhuRO0dvNCD5ueNFPxsyCbRqYRm1PFGVVPR3SLkoXgnlr2pkS2HrULqI%2BfQeUkV6exGx9ALT7XgUF6oAOZ2vQkeusRpR3Kx%2BOy3eZRnO5sSwOtDJl4VJt2U3XCWzR8jOkxYiL95xUJ5ISHDEdqF6WDUewMSB7mBiFYlUfIReaOCwqwghsC7RB919rOkJrKbHt1WJbhmc0q8pxO1tT%2BxPxhYyoJIh%2BvMRCEilIwSBxYRaA6GYIkU3ykx3uvSFu75TXmr5ATP%2FkbaFZrAjXKM2yZ9k1K8hA6VFm6nKfGuEioCVqGGPVqaPTyEpb%2FkdxRMOMIr2AAIDP%2FqaB%2FukfeXfqBQZu6tpuyMb4wI6DNunzHk3UQPvDbOjdBzebYGi7sgFTTma9dfXQfvXIx8AEypWEQoUj%2FyZe6GH4qFqVgn%2BX56%2FQalujYzRrAYJwlMxa5Ei%2FTvDpGzlNxapWRs61d1b0yh7vOZXpEclVBDm1I1Rd6rzQrZsX5ikUbcuAAo7xgJ298aYwM%2Fucs8FvLseNQwZEHAgqcpe2H0ErwEwwnOKbzwY6pgEok7bbVy657lGYD6LLw%2FZ13w0%2Fnkqd3sbcdO6kBIATS2cQVGqmUbmWRfB4Rgl%2BzB4an1L10YvVS6hQ2r2JfMP3ysK1M6ZmqmdnCsv5mc8bsEe0Rd%2Fz1Vq%2B7KlaMvYluI%2FjY8glBfsMfSWSV1OeVWlSGU7eKxoceQZ4bP5Mee5yoasTbqu72Xc2%2BAmt9BUEdKrtvF7TIJTJCN%2Ft3nA0ARyO%2Bn0Ps%2F2v&X-Amz-Signature=086944d99ce306ebd6a6b3e126725d918d22b5e3d9a892ca55aa318b8d047e5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THQXEIC6%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQCgGQPQ08M89kEcIxh1Gf6cv98OIT5Gpfuw1dY8bTttnwIhANt9lBvrl4qjqxWNoJdCYc9qEei6pGp9MkNOjfMfjcMMKv8DCC0QABoMNjM3NDIzMTgzODA1IgxyEvoJcJ1dyxxOCuoq3APIMFjCgYeOgrHSjlpN1ux5XeL%2FyHaAi%2F6rJVqy6MQ8fra94We1BTYM%2Bxs9ToflTqnie8ZEsXWerIzESEhTfDqBHo%2FbQ6z6VpDUQvAmAuxt1VpkmfbJLStRDNdBCB3sYi3On37nJcsRhazeWXMqm3R5u1sZmuBSz1Xjc7rgP2N%2FoH8i%2FnYbwc5700BEOj8ryWXluwFTI0JEvEKNUy%2FpZBVUqqZ1KYpkaR5zb6IyVqhW5dEWxLgPXazVxtAxCAZkh4dXfXto3yqrJrRcby2VRz6iRNQ9DnBMHC4AILZ1K%2FgcZeuOvAOz7eoA72aDR2T20H2VW8HFv%2FzQPgrXalZIzDHbKK396%2BF1RwkVECwHZLt32RL0yfNCxXy56jSDg7IHLdXkYIifAnHNBBSeP5rkIGefUrd1dB10x8JY6FcQnJJcBhmN5vivr9XOxx%2F4IvSfbLBTTwrS3pnB8DMZaEOXueEXiDmsSXhN7LX%2FF01TM8t%2BMGTy9Qo00eCP%2FXIfYZoDtfASDqCrEifZaiUGK%2B0MferVDaxHSxdBbyaietlJ6%2B1vN2kzVbZNQST7qamIXFmxekwkqz9ouA8JnREtuR6NXTmwOrvpkVx%2FB64aj44RsfCDzmf6V5LoV%2BBOJSh7%2FjCM5JvPBjqkAXjdo5%2B7ah%2FJkbFk69yYD%2BMoK4OJB73uzXLoAxr%2FqJMWwPqlNudMUOSeA2in%2FCQ6VV3vKriGI%2Fd1OzIuDt7vSL9nBWmY4hewEXo86UbW3jVMSv7xBs8lsL7H1PX7PjRLxZByg3p5wK0rlCWBW%2FFc0F4La4BRhoMo4dshPahQ5ERRdGAyJkQBf1i0tdu8K6KEl8VjecFERiV1%2Fxx9CeLa4AwQOVJD&X-Amz-Signature=1e1e83f5587f6c7ffcc146b552d1c08a6407be0d6787855eba86474567a631bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVI5RPVG%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIBYtSpCH%2Fz56hHvQkn044e8dqOgBPfJ0uBgARkawcfQtAiAC92nZApz6dO81YeaCiWt38zkW3GMbYZudHl%2BQOxtuSSr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMrrBZFyZsfP8oSPXmKtwDnLBP6rVjOyhiGhbWNpg7Hqc%2F5YxgYCWFw%2FlA7KAD3olxn90y%2Ffg2rRlPgglNNjkvIgthBo%2F9DayFhB3g7goAW%2Bbjxeg9ISUZPf594oGNtbfzkc5DI653%2FJeCpMKaq3q1ce76D06Hlzu%2BHPPYYkygAMsdbqqSOkM1AbDLdzjHYyiq8T%2BA8BXWph64s0yHuCnfEO51NOF%2BxH72D6UH45J%2FkwCyrtGF6oeEYu6Q%2FECUggjgnvkBrOgWMDO2xzbKn3OqJjYOJXXQ%2BdgKOVTR18Rr8ODvYfYfIa8zoRtMvI1jszFHXyuAIl6O72mzKSxbdAbHlZplRDABXUjId8ErZ3VNU3UnfGeppFIWvSxEt%2BIK89XmP0JpLsPmDudPfWexrGyyObxwoa82o7G2Q9QOXGPz43ssmQBo1ogQAj22FD%2FbM1OC5VJH3hEpWs5sfWHd0yIdnpK5Hx1QWdM3yn7sIUyG5twUGKztGtEhYHwjceq8BVXJQk6xXaTcGEheL2ckBAB469jfGU6z1QxljgL%2BpPb22VUwaFyMefFK6ZcvRUuRyjqS%2B76sAJ%2FQIpnDdyHGXVJOGJrOVy%2FJHnkFJNXAQbHhyiomCdDCTeiDbalB7Ybbf9gQDe8SZQa9Txdg7DIwjOSbzwY6pgGNQwqmrlQ0%2FYH7Jt0QRe8oIxojWH8zFZJfv8nigZ3qvAxtcSkmBTQCcZmM4Qcr0DIDvzVnkSnjFBKKF4PnLrTX3f5hFlvXwsYyalopvNhpf07V0RpX6ntrY6O0dmgqkPJJ7suxiLih6k344wFATtjPptjr61L0NfV7MTUh3XLB32EWpI3yYpo%2FXYnTkyUa%2F7BKJxBQ0Q0jF%2BUAxffeu9tVBdqhZE4T&X-Amz-Signature=e8258e1af08afc0305f10158e76dfc61f483b30ad3dd63d023d61d12c65f5576&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAA57IUC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIExQEp7RkUFTAAAA%2FcSFHpoLJdImEvfCwmhOYlpL0mZFAiEArb1NJl9Bh60T15R5%2B8FY0J6d%2FjQNWlrv8uqldVL4xxEq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDE%2BBBjqusZiOg%2FSRzCrcAxpewb175xfmJ37y4koOnZ6rwZk%2FhFw7VJPFz9gYf9zhPqW%2BARY24TgxBTroKDZOdn0ukGrTbdV77uCRmVoNVoh45HjJ6re6ZxadxCmaLgV4xniU5A%2FOrd6eNyldZrqBg6BtxZflGszoX9YV7v118u%2FixSFvbK3PPa7Shf6ycUZBKsWqjv%2FkwmrzAzCY1EA8dc8%2F8qv6qF7O%2BSOAcavAQf12ClnuvqlJMqE2LxP1K1L9S%2BZiQlAAw7IPoyBd7hYlOcNCN6i1N9xdEoCaKEh7OEDyVHkHrTQoJHj5FO296512lVA6wf4R97i1YU3T1azd5nwNnjqAXPFbee0bj63KxRXtsrBpl5TsB5JBWRLv94TrqMi%2F7oFzeUpOzyN3Frxng5LOOAc05E1Tc4aXLV2O5aqAyKIlYTZEQ6CU%2FLXJB5rx5s%2Fso8INj7ySU8ZNi1Tz9bfs6AFfEQmoqEK9v%2F5M2YopqcYerWObts3A6KuuR7fL6Bw6trTUD%2FxZFWvfuuhjOWa8v5AgDHoEdF4DgdR%2B6O4TBSwzhUJiQw6ycT0rpN4oYmwbKCAcB5EKFdOFeujQQsY%2FVPGrbkRM8CGjb4ZYyGhuOw1so%2FEm4kkw35PR26ABDC9eMgGjg0D2jrG1MPfkm88GOqUBPwL6BQBGRXEL7uO6JaGtLzlDyfnfOalEpm0xlbQfumwtlGCoIO3EadwphHSed4skCMJ%2FvuFoQBwKkoqS%2FuXiXC9I9FU0PXRJmvodp1tr66PEj6llyV26BG1dmwn5pjVbZbGBDNb5O%2F0IP7se33%2FsgSI5kPHzzCQWUF44R4rYufqfif5fXOge2WzlaR18vmeHb1mezBBvazwjZqLXJkOChjygUl6G&X-Amz-Signature=656f365ece888d7c7fe653bd25f7c82f64aa67f83f871ffb3b467e721cffb396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAA57IUC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIExQEp7RkUFTAAAA%2FcSFHpoLJdImEvfCwmhOYlpL0mZFAiEArb1NJl9Bh60T15R5%2B8FY0J6d%2FjQNWlrv8uqldVL4xxEq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDE%2BBBjqusZiOg%2FSRzCrcAxpewb175xfmJ37y4koOnZ6rwZk%2FhFw7VJPFz9gYf9zhPqW%2BARY24TgxBTroKDZOdn0ukGrTbdV77uCRmVoNVoh45HjJ6re6ZxadxCmaLgV4xniU5A%2FOrd6eNyldZrqBg6BtxZflGszoX9YV7v118u%2FixSFvbK3PPa7Shf6ycUZBKsWqjv%2FkwmrzAzCY1EA8dc8%2F8qv6qF7O%2BSOAcavAQf12ClnuvqlJMqE2LxP1K1L9S%2BZiQlAAw7IPoyBd7hYlOcNCN6i1N9xdEoCaKEh7OEDyVHkHrTQoJHj5FO296512lVA6wf4R97i1YU3T1azd5nwNnjqAXPFbee0bj63KxRXtsrBpl5TsB5JBWRLv94TrqMi%2F7oFzeUpOzyN3Frxng5LOOAc05E1Tc4aXLV2O5aqAyKIlYTZEQ6CU%2FLXJB5rx5s%2Fso8INj7ySU8ZNi1Tz9bfs6AFfEQmoqEK9v%2F5M2YopqcYerWObts3A6KuuR7fL6Bw6trTUD%2FxZFWvfuuhjOWa8v5AgDHoEdF4DgdR%2B6O4TBSwzhUJiQw6ycT0rpN4oYmwbKCAcB5EKFdOFeujQQsY%2FVPGrbkRM8CGjb4ZYyGhuOw1so%2FEm4kkw35PR26ABDC9eMgGjg0D2jrG1MPfkm88GOqUBPwL6BQBGRXEL7uO6JaGtLzlDyfnfOalEpm0xlbQfumwtlGCoIO3EadwphHSed4skCMJ%2FvuFoQBwKkoqS%2FuXiXC9I9FU0PXRJmvodp1tr66PEj6llyV26BG1dmwn5pjVbZbGBDNb5O%2F0IP7se33%2FsgSI5kPHzzCQWUF44R4rYufqfif5fXOge2WzlaR18vmeHb1mezBBvazwjZqLXJkOChjygUl6G&X-Amz-Signature=9059eff0f2ed1ece734ddfd619abb313dcd184e4fc9c354e9acce9112c598f04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGGCU7OR%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIGb8y1RhcC%2BXTACgJNrteMXXHETsh0f7XVidzjYxmNyvAiEAjkfinsbR8zLyqKB9VMhrbnKNWks0FAH77gS8gmIGDOEq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDEg8zP7UwpKIs4Q7jSrcA7gkFxv4qTJWGbrR%2F5DoYz4Jj8MOEU2WfRGVg7lSlGalRq%2B67DUZ2p84x1U4WNNAZOuizkWcV8NBAufYwENsGDrD4RTYfjupDUaTiFh%2BAsXyAX2CyG6VaqzEF76P7a%2Bqo01kXk%2BrkL%2FoZRJe%2FDUu0qszS8o4GeZQHbC1GvjCbuL23PZLCD5tIQKBMq2%2FB4M2CPaJ4m2fA4qIsEHsKYcG9EnRw9gw8GkJaBsqe6lY2ThBmwR%2FwRGW5%2BsfMB0BnfjuknEo2B%2Fu3gh%2FFc4ozd0%2B6N1np7KsdMRZDQjK6WGDjESA%2ByAPVNzllnOfYQxaIVI0UKpAVgwgG%2BF06k09G2HvzPI9kvkBXZk9ZX%2FuUaQVOGOmYU0aS3tPRvcLeVczJm%2BThjYlF5Z0Smk5mT0T95hUWmJTgxdm%2B3vwEJdk1l3ykpII29bBVd5QPFsiKf5tuTMbrSuE9Av3D1OlZfp6ZsAv1UthtgTVCWaTNmOa6rZo1HxaVbQmWhEPDKi7ylM90H7WneB71zFiCpRfSYMU2zcMWt44LmQSyVPp52HHO%2Bh%2F%2BiM8ayNybJm0X24lax7AS8Bwb8z1oNdrAOfEpZIGMWjaZzB2SQMbgk1WMK4c1CIF%2BExGfrTE00sWzZ6hJlw%2BMMDkm88GOqUBxbvF0c%2Bh%2BJXMrKg%2FXrP1B1XyuUComPaGkxqwygtNorDq4RUPnseJ8iJ57SifpEF25%2Bj2VdJrMdUQPZIPAJfF%2FnF5gK4Y07GAWkq19zWj1K9zZ6haHOf%2BL8NJlpy4jj42kbsuZ3KIZWSsCgQDV9BDLh4x4UFqhu0IF5J7iKnjyvb1PC23HDeXVFRgjWHee%2Bt66W7fr%2BdUjeiaoF6SIDhp%2BKobgVoN&X-Amz-Signature=76541e38f86c449f7d9aacc63d6b1458bcbc9ea8b678ba95aee896a6b706a8cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMOV3T7D%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDBz19trRIUVgeaTXNiFHnOx6%2BGfhVixZWys2pruEMu6gIgC1wKbTMtwczVoh1xPHoZVibpKr7mkNRmwxd1Cq%2B%2Bcfkq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDPuWp5Ae5J3POcjNzircA3yYP%2Be3Yi%2Bjwd93FwXsBszlUhMJV28oWBD7YD3LwybRusdxNs3K7Ns4eN4bf2RTWpkCPpuSxT1%2BB7Ui7KT%2BGdspAR5a9yj4kXBBXM5%2BORdJjUkCe2MFgr%2BdpgmCsfmPdoJ1JRu05wzHSVUl34U3UZlIjUCCengby6STdGJyPf%2FM316vGV1eSZB2qTPqYeoh3ZWKxDpOH2%2BFmtijlpYA1bBkFH4eiOWWzxoGdVZ2kHlHieOnYzUxG9Gc%2B7V2hZ4XspkC9uySQgYYZdTDx7o483CH2ImtjF6JHAVhoYqdfm%2BQztyoqnLaLTaVge95%2FGq2B0vlFpobEj8GvLTvudLwjx5oK3lOmQsM1WIgylXbuFCoZmIxGzZSL694xJ63JbkN0qGLk1QqP30Z4BvZgmI9CL%2FhjhuZ%2BDgJPbe00eVYU19xsHaR5lpSDaF0cZUcCEb2Jq5tkkJ38RV07z1zFrmcAJN95I998HkU3bL3PUDPfTlngdTKArLp8Uprwjf7toaDQvOiB8vnfApFGp9VVYAgnQTPP7GdHux0QjMF2QbbqJIvR6atV8%2Ffo4jySqhKXHEvSRrqzg1iMm2U91GwQ%2BaBZKm%2F%2BQFdg0LKPVuutwbccy7PR%2FoeS1AHc9fChMx2MJ%2Fim88GOqUBE1CJVT6TZYuYdxPzR%2BdphPoMgCe5WGBS74oT8kWkaVVZCmakxFFbxJVdU%2BVXDeLdc0Bnh70qRA8b45lEod4h9nvh%2BkCN0%2F1nSonT73zcglEs7tsHVRfrase5Z3LdYFzx02z3mgUhzFWQXK3CWMC%2F2Uzf5vgZ3ZU2sG1no%2Bu%2BByq8py3TZ6NsYXZ72WLzbQ0GkGrPxTIMfsQqlJmg06vgUvK2auqN&X-Amz-Signature=0531c5998781e2e9e6571a3e5e0616b67101c411bbe6c74ddb0b84b43a5a448f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMOV3T7D%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDBz19trRIUVgeaTXNiFHnOx6%2BGfhVixZWys2pruEMu6gIgC1wKbTMtwczVoh1xPHoZVibpKr7mkNRmwxd1Cq%2B%2Bcfkq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDPuWp5Ae5J3POcjNzircA3yYP%2Be3Yi%2Bjwd93FwXsBszlUhMJV28oWBD7YD3LwybRusdxNs3K7Ns4eN4bf2RTWpkCPpuSxT1%2BB7Ui7KT%2BGdspAR5a9yj4kXBBXM5%2BORdJjUkCe2MFgr%2BdpgmCsfmPdoJ1JRu05wzHSVUl34U3UZlIjUCCengby6STdGJyPf%2FM316vGV1eSZB2qTPqYeoh3ZWKxDpOH2%2BFmtijlpYA1bBkFH4eiOWWzxoGdVZ2kHlHieOnYzUxG9Gc%2B7V2hZ4XspkC9uySQgYYZdTDx7o483CH2ImtjF6JHAVhoYqdfm%2BQztyoqnLaLTaVge95%2FGq2B0vlFpobEj8GvLTvudLwjx5oK3lOmQsM1WIgylXbuFCoZmIxGzZSL694xJ63JbkN0qGLk1QqP30Z4BvZgmI9CL%2FhjhuZ%2BDgJPbe00eVYU19xsHaR5lpSDaF0cZUcCEb2Jq5tkkJ38RV07z1zFrmcAJN95I998HkU3bL3PUDPfTlngdTKArLp8Uprwjf7toaDQvOiB8vnfApFGp9VVYAgnQTPP7GdHux0QjMF2QbbqJIvR6atV8%2Ffo4jySqhKXHEvSRrqzg1iMm2U91GwQ%2BaBZKm%2F%2BQFdg0LKPVuutwbccy7PR%2FoeS1AHc9fChMx2MJ%2Fim88GOqUBE1CJVT6TZYuYdxPzR%2BdphPoMgCe5WGBS74oT8kWkaVVZCmakxFFbxJVdU%2BVXDeLdc0Bnh70qRA8b45lEod4h9nvh%2BkCN0%2F1nSonT73zcglEs7tsHVRfrase5Z3LdYFzx02z3mgUhzFWQXK3CWMC%2F2Uzf5vgZ3ZU2sG1no%2Bu%2BByq8py3TZ6NsYXZ72WLzbQ0GkGrPxTIMfsQqlJmg06vgUvK2auqN&X-Amz-Signature=0531c5998781e2e9e6571a3e5e0616b67101c411bbe6c74ddb0b84b43a5a448f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSG4BI7N%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T043631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDk7zIemFrz9SRSCXPrFTPN%2BrLltar1vMDxiJR8Ko9yQwIgKZ2ms68UO9MoT%2Fb%2F3Ze6dm3f0Z802uzyvgTHu4uZM%2BUq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDG0YHYZc5dip9opYircA4ukU7O8%2B2DQQcoWIWlDIYHPuyg%2FN60ooh0EIPIFePlbfNE0ImNQvkWaEkUmLvKBccXygbsymQnMEFnwMH2OETshIrLf9xBFz4uaZEAYfDdx7g3FWEnRbY%2BDsk7guticvyfBVNeS2N%2BrAZJgdgoYcMIUIkhAoQ1ZDZAD1772MlGP37BsmbVKWTBGesZ5ALGNnCkgt7wMJg4FVU4ADUSMU1wfdcdpQIcl9%2FfWGLSktxmtNCqV9rx0MDN4Wq2hvTG1n%2BB50DnCdjfXqaPSPvaWZdaxlGdEn6e7kYxBa8Dz%2BSoZJV6S4LIEoEu4IDw2v%2BI1rKqwZjUMSXh6N96sjl0PUIe2BWE8PZpaLOmdUw5mC2R9p8t7PFV21l2OtdDjztt4xqAMBaly2bBrY4fIxmQVppjjacXdd6Yfjq%2BAN%2B0ZSnmDBS3%2Bzp4zfKRCcmS9btK5BD5gqtmu5%2BW8e4LuSPitNVnT9OmktLxbjxndDKrKLWU0c2OWC4dW4uMcsrbNKcziLqfxcsrEI0d0lndYJSy1oLUOPMslVelZueQ%2FQhXabvHPuVT0XVoBB8RXBbQZx05JfUcySzxS0NlRy0d1ATXQQXAdili1Smm%2FhK8slQnDVCDV39jBgtWuNPjTYep%2BMKbkm88GOqUBV67YJTYo021H2q%2FhV8%2B1t%2F5ySuRaOYkcBdxZnLLC3G8MtAG7pyXD8kn3yHPXysfElwZH%2FMWWQdzkWHZfPZ53hGywD9OQOa6%2BoCfziXmapWVrQ4pi5luqroY%2Fz5sGVEfpOabW87jcgHtY4sZCUTZycoCv0bV3i9CUNf85DMzAI4QvgQsFQKwl81TGSHg28CrfB7F7J%2FB5PT%2Fw62auQgO%2F2VBuXHgU&X-Amz-Signature=95adcbfaf7393d17ba5de28049d73999da4780ebdae2fa38ce0b8da8834dc6a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

