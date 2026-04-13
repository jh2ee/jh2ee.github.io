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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QURXHKIC%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmyWYOl4z0mP4uKUqzkTUfmKAGbsHyxis03qri2EgJjQIgY7v5wvhvnBk0CpFg6gz9H8hBqXbbclhfd4bFiYdiOgcq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCfnTX3fY6Lhcu6AMCrcA7LbbCWBLmpM3qcq708wlGhQXsNMCqCvcyOWrK8%2Bkj%2BoimAWswq6smRq1kzPEOCok%2FHjF4NziLhHboKRUVPgDfTNpveqKZzO%2FSdTNnr1x8EDnwN1Nxd4bY1Fmi6PXFcJ%2FXZifWCARYUFDXLZ%2BTX9QLWoY7Y85WoIGE%2FxOlSOuVZJjfSt7IZFaw9pYQb%2FRPPfHgPv7ZshHEfuLsr4J9s9RzTJuUZ3Clr%2BEeezkkfCMHJ4h0W4c3cefycNok9v1CkRU7TP2GcMYNWcb6PAniYUVY9iQ5cpzVYgvKecpHHjgZUoyMA%2Bl9tqyHmlBHpK0o%2B2yXZLunz%2FT%2BicwX3xJKKruzaZbVb8hzq%2B9rR3rD%2BNjcU6kAUTmZ4ANlqigcYJXO9CAraQr%2BhSHBJ5GOXp1ytq98rfBt8tnuUoB8qMoJxT56AZKPCAWvofG%2B1ChOVIdUr18UjcwdWmBv1Q%2FNej8a%2FqPUcKQ3a7IjX3sG6j7UZdfKhX7L0sXAsBbs%2FYtvm3YcFh6m%2F0CZle2IPy7%2FtuTcdtj7Qew3PyALo3brWjwFhH8q2VTZNRQjuqv1QXkSR4xU0hJ51mev%2BiYrBRkrWfQXh1zhgLd%2FNoS0VAgdbRXcYkR2p1GymWLCVadnDLlHnBMN%2By9c4GOqUB3NbdURXLUOFFPtOiRLsDTo%2BLHdJZmThZ6vB%2FJze24SW8CFLNaVVubIqmTIwKuXVkqCsvvn9JoOsEk%2BR2PEbfVOYvvpQUGWQP9FRlc%2Febin6VYlyHbU7pr6U1qJ3byCwjuAiVXgNXfLU5oF0tK80bLo36%2BTcNbrc8rFk6J45zCnRo%2BsNWDfhFSyIv%2FEZ%2BoIDN10TpQw6KmoOSrFYuMXFOSkovP3sv&X-Amz-Signature=b2dce65706e26ae6085e0e2064b01e038468dae094724268a71d66bef3cfb92d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QURXHKIC%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmyWYOl4z0mP4uKUqzkTUfmKAGbsHyxis03qri2EgJjQIgY7v5wvhvnBk0CpFg6gz9H8hBqXbbclhfd4bFiYdiOgcq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCfnTX3fY6Lhcu6AMCrcA7LbbCWBLmpM3qcq708wlGhQXsNMCqCvcyOWrK8%2Bkj%2BoimAWswq6smRq1kzPEOCok%2FHjF4NziLhHboKRUVPgDfTNpveqKZzO%2FSdTNnr1x8EDnwN1Nxd4bY1Fmi6PXFcJ%2FXZifWCARYUFDXLZ%2BTX9QLWoY7Y85WoIGE%2FxOlSOuVZJjfSt7IZFaw9pYQb%2FRPPfHgPv7ZshHEfuLsr4J9s9RzTJuUZ3Clr%2BEeezkkfCMHJ4h0W4c3cefycNok9v1CkRU7TP2GcMYNWcb6PAniYUVY9iQ5cpzVYgvKecpHHjgZUoyMA%2Bl9tqyHmlBHpK0o%2B2yXZLunz%2FT%2BicwX3xJKKruzaZbVb8hzq%2B9rR3rD%2BNjcU6kAUTmZ4ANlqigcYJXO9CAraQr%2BhSHBJ5GOXp1ytq98rfBt8tnuUoB8qMoJxT56AZKPCAWvofG%2B1ChOVIdUr18UjcwdWmBv1Q%2FNej8a%2FqPUcKQ3a7IjX3sG6j7UZdfKhX7L0sXAsBbs%2FYtvm3YcFh6m%2F0CZle2IPy7%2FtuTcdtj7Qew3PyALo3brWjwFhH8q2VTZNRQjuqv1QXkSR4xU0hJ51mev%2BiYrBRkrWfQXh1zhgLd%2FNoS0VAgdbRXcYkR2p1GymWLCVadnDLlHnBMN%2By9c4GOqUB3NbdURXLUOFFPtOiRLsDTo%2BLHdJZmThZ6vB%2FJze24SW8CFLNaVVubIqmTIwKuXVkqCsvvn9JoOsEk%2BR2PEbfVOYvvpQUGWQP9FRlc%2Febin6VYlyHbU7pr6U1qJ3byCwjuAiVXgNXfLU5oF0tK80bLo36%2BTcNbrc8rFk6J45zCnRo%2BsNWDfhFSyIv%2FEZ%2BoIDN10TpQw6KmoOSrFYuMXFOSkovP3sv&X-Amz-Signature=b2dce65706e26ae6085e0e2064b01e038468dae094724268a71d66bef3cfb92d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MXOKIFN%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDCyyrzPZDpGeZVfTZH4q7texhCdrL5MyRwUYnfN3E7kAiEAi2dRh3NYAdi1VQBPLDIu8dfjcFfrsFTjVC5wAXDKCVcq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDKTKa5j6O1GW6Odd1CrcA9POOTMA9zQEmHijBuCmCS%2FGt6ldJI7RYH81YRc4MQZjFxQXOVDS60w6DIHKf81jH4eyMWpogilyBO%2FlysgHrbyld3Yjy1SiybZb50AH5ZW6rwKQLD%2BSeArqFr5rx4w0EJIkpBK8RdMOawdRejRf9ueRqPM63cFvIChtjCi9LpAbb1pUcxE2Fel7Tqh83jNxt98vpOML6NeVvK9rdKbVadJhrsDqvySHme1hA%2Fd9uNW04q1%2Fu05FUAMT3evP0MPkk2facTl11CcZr2Q0AOar3XMgY1AGODdQK3Q9srYZm%2FPz%2FjOY8PvGBkSuY4yXg%2BHh8jGOhEAjANWIwvF7b4KWxICzZ5sEME0%2Bjp6aE2idXiywoLsmNzU%2BV56FUO4MW7USjKZKSN0cua8ZBRnaqwt8UpPpUFM0UvGUgtBbBGVDpY3ZuIMUCCknL4QplBrLEN0tWqDDOTrZ%2Fs7gu66hbJp%2FNkr1RE%2FlKlEBSlVqn1vCMjLSsqURNzVT6cCzbG2ywvmM32ulz%2FYjGIAd5I6wP7KYx1W7Lr47ggoLhSGzEZGePtXvAeeJsq1ykomqRnBBWJDI8eczoxpZgosVASXX6sEl4n2Euvh8YUiLgp%2Br8ldYiJcquwQJN%2BPX852W%2FyCsMNW09c4GOqUBG0uuj8zXO%2FdXHgdzIpCfkngRqkG057NpmRyIWhCe43CRPmZwlINgk2W5WhqghSfY%2F8zIBZuIy6JtFYMskOCFt%2BMHNOlWICs6si9UiFab98CWgXHkRDaUBUw8aJCjXKhEmDRhYJ58J21FYxH5h72%2Blg3n%2BMtFH%2FseCsVH0Lr9E6xZO%2BNRodlJon898FWJsrklARu9wrMMoHtQBjb1hvei4JnGDprO&X-Amz-Signature=5523de64639a7862f4c58afd66fe08fd1fd7d93002a55416fdd7ee06f4ed1592&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNRLPJVP%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCuUbNvMXIUgMFnBVJvc%2FvLCV%2BO7kttg%2FJcq1HTX%2BpHSgIgaasLyY0L9FlApxHIW50bbibqTVxpmjkzZHt8oE5dXY0q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDJ05c%2FYe%2FpgQ9%2FnV0SrcA7GRa1RbynwbmWgQ2CJMALouSb6Q6fSIWmVvVz0JH5K7cP2O3eVZODzaY6UE2k3R7aJB%2Bjhh%2F3f6BK5oI4dfEIWHwnnJQFFurv4Fe7ZqSe6JElUpA5hV5ao9AWdbqj%2FsS8vkXhQv5naqTXlE5zLCOzOFLLpiFbl6A0ALsomLQA%2Ftyub8gySrAcccE3aaahVIyuNhxuUWHvDb09Unq6AsHy589c8n2p4TmhRRrog0jvwzQ7ZycV8SkA8rXGBa1H2hfVQDQPzduQ7APnwQ7Et0tNKPqbOnxl%2BG66uArpdexZozuALq6Rm1t02bavcYCDYBHc37D69LoLPhEWGWP1P4MR4EUqS9shzRPqmX6QJBejBiz3AMmrTvKjFOhkKZmepgYSkoV1e4lyPEkaoJZKXEDRIXd%2Fiw5FPn%2BKS2UoHS9F089bq%2FUAz1%2FYfmQEAJutwhenivGVlyFwyPwS5TrkczInPQAwrzm7fntvRH9nDs92Sfr2DOWlZaiCAhDb143nt42JJan%2FmH0VrvS19g%2Fi2IsYBXsCSPXjY%2Ff356QX0zblw6HVdttb3REibXeX9%2B%2FNpSJBDMDB7ecbW2uXXgDrCiKN11IBPZddx87hgN5J8L4Kpl3Qo28%2FDBHrmyOxPSMIWz9c4GOqUBRHkzFF7oCa2pbn90rZM2MeFrQSlOfIBJRpO%2BKEqcgRxNCtNyb0KC0BgIsKu9iek1U2NhJtwpeGXWE1gQ7qJvhvZgO6WQ4uzliNOc0KTf0urOCcuLNetO%2BQorYU8saoFxE82KubiLxw6VZPIdeEckTf%2BDpCXqdcsn15x2O7%2BO%2FqrXRcal938cwYIAcrOkrd2FUBTXN%2BpdyWjiqx6I49LfsLp5%2BDjy&X-Amz-Signature=e3d470ab6baf25b9bc0f090dbed4169cb74935f2e176c3da590b540680260698&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNRLPJVP%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCuUbNvMXIUgMFnBVJvc%2FvLCV%2BO7kttg%2FJcq1HTX%2BpHSgIgaasLyY0L9FlApxHIW50bbibqTVxpmjkzZHt8oE5dXY0q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDJ05c%2FYe%2FpgQ9%2FnV0SrcA7GRa1RbynwbmWgQ2CJMALouSb6Q6fSIWmVvVz0JH5K7cP2O3eVZODzaY6UE2k3R7aJB%2Bjhh%2F3f6BK5oI4dfEIWHwnnJQFFurv4Fe7ZqSe6JElUpA5hV5ao9AWdbqj%2FsS8vkXhQv5naqTXlE5zLCOzOFLLpiFbl6A0ALsomLQA%2Ftyub8gySrAcccE3aaahVIyuNhxuUWHvDb09Unq6AsHy589c8n2p4TmhRRrog0jvwzQ7ZycV8SkA8rXGBa1H2hfVQDQPzduQ7APnwQ7Et0tNKPqbOnxl%2BG66uArpdexZozuALq6Rm1t02bavcYCDYBHc37D69LoLPhEWGWP1P4MR4EUqS9shzRPqmX6QJBejBiz3AMmrTvKjFOhkKZmepgYSkoV1e4lyPEkaoJZKXEDRIXd%2Fiw5FPn%2BKS2UoHS9F089bq%2FUAz1%2FYfmQEAJutwhenivGVlyFwyPwS5TrkczInPQAwrzm7fntvRH9nDs92Sfr2DOWlZaiCAhDb143nt42JJan%2FmH0VrvS19g%2Fi2IsYBXsCSPXjY%2Ff356QX0zblw6HVdttb3REibXeX9%2B%2FNpSJBDMDB7ecbW2uXXgDrCiKN11IBPZddx87hgN5J8L4Kpl3Qo28%2FDBHrmyOxPSMIWz9c4GOqUBRHkzFF7oCa2pbn90rZM2MeFrQSlOfIBJRpO%2BKEqcgRxNCtNyb0KC0BgIsKu9iek1U2NhJtwpeGXWE1gQ7qJvhvZgO6WQ4uzliNOc0KTf0urOCcuLNetO%2BQorYU8saoFxE82KubiLxw6VZPIdeEckTf%2BDpCXqdcsn15x2O7%2BO%2FqrXRcal938cwYIAcrOkrd2FUBTXN%2BpdyWjiqx6I49LfsLp5%2BDjy&X-Amz-Signature=87756fc325b69e0a566c06391f76de86fa5080c44c56b476e7c17d2d16e69481&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ISCZGI3%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5UnwgEDhTzUVDtbUs%2FADKu%2FdzAXtt7SKVGCbjxwZfKgIhAOuhVH8u6gopooIBvUX30av1BsISV8dUsIQNzAOsdOOJKv8DCH4QABoMNjM3NDIzMTgzODA1IgwfX%2BHiuu9zxOCAev4q3APZn%2F2jcArS6cjxgG7DjC3TXbvQsLR%2Fuuuj2YDHk3JCXQIUzZTOcd%2B2H4wUc0eyXQZAb8aJapWkkQ1v%2FZaE2yCNIEEvq9t30wsfxzLop9U5mhsWBu8NH7Rc0fAVmaCAGlRYpD0SXDd%2FUyK8KjxrNguHVPx%2BfcSo9dKkptRTuV6U6Dw%2FlLdfV4KAV1cTQPIWMPQrDVeO9kz8ns81MGx7IjpJHrWUNT1zLutP7CSP1xuYMFGhJe%2FG%2F1MtkrqbfIDXXxcAgLkPcPP6rEd537wxygmkCccWznUDKYVN9tD48F7%2BI%2BOZgI35%2FPDLFUVeiLCabAZD3FiS%2FoqSaOiNSoPcZ1gRmdHOrvgHmZb7UD%2FS0equRhDkKd7Rtw2mIxJTF1NPxAswsHn62hG9k5g9RfjrgXvqh1c%2FqqOX%2FzT%2BrAiTK0XI5OiDg9cq8HsYtyd0Wukm%2FnTH0G%2BCddXwpgewmORGUX4eY2hTfNtUpgW0V3ehC5CqC%2BHh9zkEXyWC0ZoJfYv0H1YXwNudyGZAI%2B8yKd7sbGooxW0WmE5ctQUEXUCgkW3SBmNvEOq6l9D2qaVb9uKozaAgnBSDx9uZyZOH6Vo7dbkStWm68qvcGX15M2kKbRDefpxMfEg6VBy0YB5IrDDstPXOBjqkAeAFUfZ6ByJoxar5cHnEQS65VSf7zThMGFcRJLo2wN3v95cRRRhJgllrHZdZFI0i0ooralQLIgJ%2F7%2FhF7DSKnreZoDPZ9GtJ%2BcJNqoVuZ4ayUqvDjuGkcJlwG%2FEjonRbl4Q6U4xgXxv32WBanW0b4nf1BnP5f0LV3bZ19nwsrg5uvYd0FwprJ9k5Ry5h9aavwTEKfbK4gqNbXNOO2OwCGGxLPEVZ&X-Amz-Signature=9a4a48b40fb13e2a23c4757b96619c282175faeffc3d5dba3e83fc3cebaa67f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7WKUCW%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID%2FXTpYq9DjdLh65aVscp3x8bsoxKAWfh8UUBjSLq1Z2AiAFG115OfSsV3wPOqnQpkhDVzuWe%2B0YD7h9Y0CGZptt4yr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMP7Wc2kppIBTh5nq5KtwDG1voZVbu7Ws%2FQHvZ3T1LdUgM6ivdrv1Y5sN53AttguEm8YIcyvBGM%2BtFDExT72%2F%2F40X8v%2B8e%2BV1c11d2meXeV5mRMi3jtVOoXOfKxb9tgXknUjr4n62O%2BPl7SV056LXnF77Fo2ZznJhOLlCpQ9F4A92ogeMBHYkWosMpTBSqnirsqm3Ao0LHNCOLuR4Ub8bjKho4F4EtIHKTaaobeMT8AM%2B8EVVlLYXy10CqOe31455RLt59OgQC2TGRzvv6e7QxyP7lreChAAmtU0kvcgrEXbH7N6%2FMOE1oN1U%2BSoLw6bOYBpLeUKRGptDEgwQfpY3vCr5o1L0mFwHLAxvlOAMRXC7lHAE0Q3dOrULQAIpi5eI3um8R1Z%2F01m4BAlfhUqtf2jhojCf5hyDoQ6M%2B1337dhJVeQJjQnhVrwZeQo6Qb3mBCgHNgynAidfXjO75e0WJTZaWgAOSECdoION3nUuQQpygUntIonNd148NJ0K76seY24aUPNbpB4DZlKDkBh0wJEqymnUFdFbMzotQ3CRFZYrdJMjKc98N6iYm%2FGdJdhKvMuRwPAeEGLbDjeEukJNUkKLUQihzyWIP1lpdFFoxRKJHTn6kkcyrT2bmClGrvsGneXhVzSP9Y3dwUuswwrT1zgY6pgGveJvs27VzwHnKu8tapCRS1CJlwX%2F0ilDbC5IpOLUPx3ypDFlPbBrLKW3N364%2FRRFGIOMH2cfItuL6uYZbNMAOLAP0rUPCKNK7xtS98Cqavog5Y%2BXKyzp8J7CHP%2BJSI%2FzvnpaDR1PNy3q%2FBvmQ%2FUtC8aOEiFSF8wJtDbbxmABNVim9P9MZjXPDGK%2Fss2r2ojh8I6S1%2BTin01m2HA7KUcOLHWQ3Umtv&X-Amz-Signature=ef11dba86f925b2064cb8d4aec4e4f8ba6a2c7cc65b9cdcb5486b16d7974b399&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6OBAJT4%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFQ1UxUQyV84o8CgTQfEO6OLxxgQhaLnWqlziWfLS%2BnQIhAMIHHu1HnwsuDZmUimK0COHgrC9k1tdqdCSf8Q%2FOEri%2FKv8DCH4QABoMNjM3NDIzMTgzODA1IgzHjh9dpPrSpa482%2BAq3ANfWcURsP%2ByE6ndZ%2BAf8iLWcQqhPbb7hpeuipXyxxdQHgsHYc%2FCgSZrnr%2BQupfTCT6LjS2LK%2FJ95JPGiKLcsE%2F9OvC%2BAn8fbLqcEl2zG%2FoWO39t0Qvc3x061DmH6%2F1RA9xXyn4KEiU3BpxXKBx32Rai17Rl97GviZfCfkONNdfjAx51CQ34OwybQP%2BFDzQmR1YgsF0Lf5EezNWdxMMl2kYO%2FwgTQUpETXm4lQ%2FnBma78x8tw%2BTIJrragvrq6kHlgYPzQ7YMyTSFEB6BeZHYVclhEErT7ra%2FQSUXpFCT0c2eLRKhrOKKdMkZRM8ev%2FwZEzmf3H%2FWTI5B546UxLwsitC45hIt9Lk6khV1r65DbZCfC4D4fhI26q6Nfx6WsF%2FGr7j%2F5%2Bh2RWUuS6JWMNl9uJYORBUNCh2dfqYGoQ6sm7fi1h1U860zL5G3pwpskRAgQ3pacY12y4dUY%2FQpKB1oQFkyFvH6%2BNoDo348imeCghJ9SSRZZdA6w%2FN9AhKZrJg3qh1oQa3tXOznur89QO6PclQ9W8Y0w663Z5w9ThHTdKMlcBEM331ym1DNiDUdNDZYSd%2BGNndofHGru3HA1nhgnoB9CSa9tL6UK%2F1dfDfgwsmwVyZklmSpOA3rH3hmITDes%2FXOBjqkAZEQ5pdUTZ6rbERIcjYTbahuXgMbyN97Y2o8Y71Oc0sarqGfY7sNOOzq3iyOoj4hKCU%2Fd6yHmt0UhOM5b9YGnExNx0vOgI4yiijJEi6HeVhdc9qEe1SO601rOsswnOYeP1PoCwpxNEWDFLsfTlNX%2FZycafU%2Byv6uYDXKZdqXGVN1ATEJoryuCLgToOxBN9cARUoxrniYiZowAgKTE2fVJOKK1ujP&X-Amz-Signature=e1d58a8682c383a0f1d36bffea5bcfadef42783b6948a5d59f42ad5c91cb60b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HC4N5KK%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDz9eR4Fen2oPi%2FMdRvzqPfUsPzWDOyry27NRHA7BTxAwIgfYg32QOhuHLDtC3mRd7M2%2B%2BPXrPQvnfzk5xL%2BoppktQq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDBKcP2lI1vFbZpK5FyrcAxNizi72GVZO8lNvDht%2BRPgVuwiv6SutpQstbePYZehVEOq6QflfH2LojY%2BgENeS%2B0UsrhXMKJwsu2x0wmVZg0YPBKZTfAxIHEWUvMJYSH8dLEKHvVF6YegQmjNJbFtoTWjJ%2BeSv%2FXPIchClsYElATmkX0MwamZMJIin0aYJRnWhwaTVRtgtDO4QeYINZXHbJKtl8a3ZelgKI%2FVAdqRSFVPpW%2BfmNWq8FVyqnJ2hVSOdIAVA4DgmXcbhZXOEpZTKWpNgWsQChsCVD40Y5Q%2F3G6wrM0PBqf%2Fq62jQmUHlVkKQXF0xRnMj7X0IOgX86SsqnAQ6ywjmiE7bLfPUmvxzWdwAGuYvhxj0gsNjjYVCsb%2BkSmuTrtdT%2FaWuyOzVyrNaGe7gLz3UbIYdHRK0V4%2BeMBO8tJWZ9QptnnmAudygvhuwDELHPZdsUQi11GyRhy1lI8u8xZ863cguuiuuypodmOEoTuiVgH0igFGHsZvgMLH8Nun1THNr9Mp1GnLpnFxtZ5dRwLCUrG9kubUoAKwIVPpfxqayLMteD%2BXg8LnKW0391Z3n7TdtqaCUPJMHOty2Ou2r4mLJJPD%2Fa49B63TCLPWmUtzbmAbbTKnvYcAElxyrc2GUYyUpv8uVDgsjMLey9c4GOqUBSEcocvP%2F0GovJrXfvCWyE%2FSti%2BMIzrZUdg3SxHffS8Ya24xqRRIB%2F%2BiqhNlwj9zB9qZAQ9ZiJa%2FDxsYnkrBx%2FHxdpWaVBX%2B9NUNfQb%2BGNboiOs%2Bu82rj1HGj9vwUfNpjn8%2FSsdoFuiyrrn6w82kAYIIGM8CR%2FCQyhHsuLCoIFU1XktvcAViLF5rZhcKGFGKycINMrcAhra472sLFboxM0dmWF27O&X-Amz-Signature=533294da16ce32dddb8dc2ebdefb59f146bc25aac1669393a3fad82fbcc3c12f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HC4N5KK%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDz9eR4Fen2oPi%2FMdRvzqPfUsPzWDOyry27NRHA7BTxAwIgfYg32QOhuHLDtC3mRd7M2%2B%2BPXrPQvnfzk5xL%2BoppktQq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDBKcP2lI1vFbZpK5FyrcAxNizi72GVZO8lNvDht%2BRPgVuwiv6SutpQstbePYZehVEOq6QflfH2LojY%2BgENeS%2B0UsrhXMKJwsu2x0wmVZg0YPBKZTfAxIHEWUvMJYSH8dLEKHvVF6YegQmjNJbFtoTWjJ%2BeSv%2FXPIchClsYElATmkX0MwamZMJIin0aYJRnWhwaTVRtgtDO4QeYINZXHbJKtl8a3ZelgKI%2FVAdqRSFVPpW%2BfmNWq8FVyqnJ2hVSOdIAVA4DgmXcbhZXOEpZTKWpNgWsQChsCVD40Y5Q%2F3G6wrM0PBqf%2Fq62jQmUHlVkKQXF0xRnMj7X0IOgX86SsqnAQ6ywjmiE7bLfPUmvxzWdwAGuYvhxj0gsNjjYVCsb%2BkSmuTrtdT%2FaWuyOzVyrNaGe7gLz3UbIYdHRK0V4%2BeMBO8tJWZ9QptnnmAudygvhuwDELHPZdsUQi11GyRhy1lI8u8xZ863cguuiuuypodmOEoTuiVgH0igFGHsZvgMLH8Nun1THNr9Mp1GnLpnFxtZ5dRwLCUrG9kubUoAKwIVPpfxqayLMteD%2BXg8LnKW0391Z3n7TdtqaCUPJMHOty2Ou2r4mLJJPD%2Fa49B63TCLPWmUtzbmAbbTKnvYcAElxyrc2GUYyUpv8uVDgsjMLey9c4GOqUBSEcocvP%2F0GovJrXfvCWyE%2FSti%2BMIzrZUdg3SxHffS8Ya24xqRRIB%2F%2BiqhNlwj9zB9qZAQ9ZiJa%2FDxsYnkrBx%2FHxdpWaVBX%2B9NUNfQb%2BGNboiOs%2Bu82rj1HGj9vwUfNpjn8%2FSsdoFuiyrrn6w82kAYIIGM8CR%2FCQyhHsuLCoIFU1XktvcAViLF5rZhcKGFGKycINMrcAhra472sLFboxM0dmWF27O&X-Amz-Signature=74fbdee4da8b71268e666bb1a12ee667a7489f600100f5b02b3b5cc0caac00c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EVIGIA5%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID2HrYPoMip5lKh9rd8gA%2BjCnyM%2FWg2MVfP13JeNGbtGAiEA0AOeaVUMO0nAlK1vzOVQRrM3HZFIZSYyRC8gF3fyczwq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDEQ2sMwxf6rw4YAUDyrcA0ZoJcdVXG70sW1m%2BH7Cf%2FA0erejEzPt2MHvvfqrxJrJiBzkXf7PPn7hcfKnjVZzXEpz0LcbHQT2ngDua%2BWHbWv8L2zUaYFki%2Bm7ecBu5k32djLFZu1VzixPBOrDZlpnd8w3GHhWxrF8nboYFlyLdN568xvdVPsH6vZ7v%2BhHi2WYWQsPtUD1L8e32v%2B1yUDdDgOZ8sPqCC14g7wMN4xI1tMtWUadnkxGgBCJoH0tl5YcKVq4fzw8FX97e838UG05BZnj%2BTT7GRyFgtSxsvflZdcOLRmjS%2F%2BJoUk99t7iMsZiQuIE2OHBFU0hIXWJhl6NJCfKsqsX9f15%2FHjSyKbVqkQ7schwhAiEc61hRWhDqlRdxTE6r2bjcxomVguiZfvwvJUZRp8bg5CnzzHR62CwQyHMvQtKoH1aRCjm33jcmIKc1WukPyHZoqFYvFuLc9hLRbjnANmXxcz%2FuJ6SUOd%2F4ZRr8WqsrDHORiMBh5QXIBLi2RD9S7LLzP7MAgkr5G1o7eTvOw%2FJi3MdsYQU5JWA4phZUhBDFtTAZjQrBHAVjo4hN5e7shdAkdAra4a6BCTRnfMs6a9mv9yIYgL9M6YNd5ZV4REzccjxnvkF08KPpUVWdINvIUmcbk04b0LKMMS09c4GOqUBoRjXz%2BsZV7LpvIMhfOGja5E%2F%2BBFK9n037u8gsRXcLCg5rWQH8tn2gwTpVTwsMKCMTF0z8%2FZ%2FnQ1TI9iOXyI1n84a7Jh0GGbhqzOp62rDLqrfTC39mA%2Fm%2FXmIj%2Bzgn8NV70UvTOqYkdzUxk6wqmsowP7wKPGVQ7Xukq8G1G62O6%2F3ZnJxNScUNkC%2BQEONha1Ast6k9AfQ%2FAlZxsf0Zd1qyhTlACgI&X-Amz-Signature=e00db8054a7b5ba8ac59e324bc6a2f25249a7f9866cba7a9c4e428f01cf46356&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WY5UZDC2%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvqtJHBYNEgE9syRwoXV17Kjx8KmkwZCsUUkB%2BZODjUAIgOcSU%2ByuTQF7UrGuSubjJC7H1gKqIbHvbpj2HB7nPBuQq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCMzJ8XfoEXiNY8FSCrcA1dervjXuylZT7I8UTV5k%2Fw%2B6%2FzWafxmi7nuH5qKaLTJA9Z1sMwTA%2FUCh8oZBV57KBwk79ynKM%2FcIMsqnz7SXmZKcm7evNRmQWoNwsFcbQpg5j44GYGZoa2S8pJ9Brv%2BwvzVPjm%2Fy%2FcuA9xUob%2FrZ2JsvYR6mVfpt%2Bb7ssqSfhi0fsKt0mPOEyfI91HGl%2B0WgKIlmcN1mF2HTriUP6w6Zw189WAUsaHT9mPIFaWFG5Jd7mjOCATuy0Cy0jqNTDRjMcPiD3rcGgZJH3TGBTKTjJYQPoO09cieJ6gd%2BoSFN9H06Kzv6bJ2VBiM5QZkTU%2Fk8rdoQCI7wpfNEw%2FYj7rvr4iuFbQWgqVCDqXHXp4d8LBMRjBSteYjRXJ43kkpjEtlX7lFtaHlTee78hWrY2fqUiTG8WttRscaqN3OxtoYd3QGrtAmAnGaPUYvSC6mGQV%2Fb2p32MKP3ZKcdHPTVbxqmiSA30Zn4zY3maw9TIutVx5BjIbx32uY6%2FT1q20Mkvgw1DGfG9pGQNNrEKrXRiPL8f2n1cHs75Y7ZDAmvy77tklRatt5puRl4jf5WGg3FcucOQoxuybIoGoJ6bE4DYiIOTg%2BFwYVirFTCm3j0SprPKK%2BfxYfUfy8JBl6PoK%2BMO%2B09c4GOqUBcHVEskLX7LhPjUkHLjCxcZNSs5uQerktPomTBJLhjDD7hzIxogH2f5AToFwiZ8yKuPpWJdINQ8ySJPkgvRZONV%2FlEtw4TgIifNKPZlDuNHrNE6BAQlKki97q5fhqxHV%2FSDyS8QeSbe1lqSi2Nq1hPq2IkxHKSaH8Q%2BlR8jCe5Ge20QS%2BPWaITuUL4WbrOUWaswnj2cabchDxvEmjnIIjzW0DTu4A&X-Amz-Signature=6fb13735162ee867e7e2459079efc3353d03bd332b334d30dfd163d8d096b55b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WY5UZDC2%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvqtJHBYNEgE9syRwoXV17Kjx8KmkwZCsUUkB%2BZODjUAIgOcSU%2ByuTQF7UrGuSubjJC7H1gKqIbHvbpj2HB7nPBuQq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCMzJ8XfoEXiNY8FSCrcA1dervjXuylZT7I8UTV5k%2Fw%2B6%2FzWafxmi7nuH5qKaLTJA9Z1sMwTA%2FUCh8oZBV57KBwk79ynKM%2FcIMsqnz7SXmZKcm7evNRmQWoNwsFcbQpg5j44GYGZoa2S8pJ9Brv%2BwvzVPjm%2Fy%2FcuA9xUob%2FrZ2JsvYR6mVfpt%2Bb7ssqSfhi0fsKt0mPOEyfI91HGl%2B0WgKIlmcN1mF2HTriUP6w6Zw189WAUsaHT9mPIFaWFG5Jd7mjOCATuy0Cy0jqNTDRjMcPiD3rcGgZJH3TGBTKTjJYQPoO09cieJ6gd%2BoSFN9H06Kzv6bJ2VBiM5QZkTU%2Fk8rdoQCI7wpfNEw%2FYj7rvr4iuFbQWgqVCDqXHXp4d8LBMRjBSteYjRXJ43kkpjEtlX7lFtaHlTee78hWrY2fqUiTG8WttRscaqN3OxtoYd3QGrtAmAnGaPUYvSC6mGQV%2Fb2p32MKP3ZKcdHPTVbxqmiSA30Zn4zY3maw9TIutVx5BjIbx32uY6%2FT1q20Mkvgw1DGfG9pGQNNrEKrXRiPL8f2n1cHs75Y7ZDAmvy77tklRatt5puRl4jf5WGg3FcucOQoxuybIoGoJ6bE4DYiIOTg%2BFwYVirFTCm3j0SprPKK%2BfxYfUfy8JBl6PoK%2BMO%2B09c4GOqUBcHVEskLX7LhPjUkHLjCxcZNSs5uQerktPomTBJLhjDD7hzIxogH2f5AToFwiZ8yKuPpWJdINQ8ySJPkgvRZONV%2FlEtw4TgIifNKPZlDuNHrNE6BAQlKki97q5fhqxHV%2FSDyS8QeSbe1lqSi2Nq1hPq2IkxHKSaH8Q%2BlR8jCe5Ge20QS%2BPWaITuUL4WbrOUWaswnj2cabchDxvEmjnIIjzW0DTu4A&X-Amz-Signature=6fb13735162ee867e7e2459079efc3353d03bd332b334d30dfd163d8d096b55b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WHDKI3P%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T213607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICpFr3jtbbcEBJ5U7dLFrfLr9jdrELMSDruHUNqSFVcDAiB2JXw8RORbYLVhlusHL%2Fqh7V1h7ju%2B%2FZvuZdLqvU54Byr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMF2IpUaNubAWPvQgYKtwD1IkCipDmAIQUOC1Z%2FciCNNqcReYtv6HILc7%2F8LbATamTJ0xP2IRsDehQ7fNhH%2FqARpC8ANoZ%2BRjVaYWewUDImiEz6vEkIH4fRXkEg7CJbGmCzMMfqdCfaO7LTZVioESBAl2bFxvJlK7%2FkAERXsMb%2FoPEa%2BJLalH6hEfPK9uiuM4JJyMTgC07791oNNPTFoZIa1YYlYrIQDeWZhTs%2B7NCJ1BhBgmxgpaLdQ%2Fi9TEDqwhmarJnZHd2AmZQ5BSNW%2FnRdE7NHfn6BZN4BqvjSOqn2U%2FaoWTAT%2B1Rc323KxLy8FJN%2FkME9xOf4QWwbgGiNKGWPZLfMhjS4EWskCypvlkMxih8ZzoxyDA0lrLabnnGNJgBIKTwLRwU2UjPQyZFQzlS3JUq3h0ytDA%2F48vkTU3lFCOvtMMHljSm4uY5IE0Dmgjm3wo%2BgmDu60EGdbKnNUlhmIJTlW8vLKpSfTUVVWn2%2FRiQ7ohsJQi7vkTjNPnqo7gsMt06PmlOL0fYIGJG5PHD1YKMd7kq%2FE3rbm%2B6QuuQlGCKwS4WtY6xYS%2BUspUIQj2V%2F8RZKNtnPAh2LC2RN5pV3W0UhB23F3Lzz7doauZpsls48PmtF1xSgaj36dYkC5TKkGy0tB%2B3IPaWud4wr7X1zgY6pgEhG9K0k8hEfmvtNzIUjO%2FzQ%2FUg95GDnzbulRkPQYqMLb1L9GbG6arxmb6mKEOU3hFqA%2BJjFIv%2BYboNROodYhQaAcS10iwAF0Y2u%2Bf65LEJQ3XPDzd5h44fAauw2%2FDnXdQH%2Fm79zWbwHvezI7dVOLvOOxXxH8J8BKPCCZm27sglUbfpwcYz3twE3RvlJopaAq73j7fTeUn%2F1t2PqsGH1rSJUGtPwrWm&X-Amz-Signature=9a1dc4fda1515d361a1231c7a6854e181d8139626be9fc91ea163f35a11a6d7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

