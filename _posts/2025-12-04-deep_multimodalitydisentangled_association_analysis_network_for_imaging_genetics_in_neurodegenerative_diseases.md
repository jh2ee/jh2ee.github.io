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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5ZAOJ6J%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCOBd%2Bugmqj7TWPfJ3n3LfGgfzFH%2BBSiVN2XIIZ9WJsbQIgJGhEM9j0oEk8OPzBXmYN3zErFz8yUB8v4gJrWaoPTW0qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMv2y2GBXDKc%2Bww6uyrcAx1oOekQ8HgMUlJbS%2FC%2BPZK3lCGUzHMZclxHtqDmQru9nnEBjpp8dsZ85FQdwFHMfIJQSACbey4Qe5eWiaVGo8Uu3Xr%2FJShWu%2BibSzKsLjJO7scW2FAPbhIaL4KN4gZpaabJyrn1FDhJf4P%2BbeM6gmWZGGbbaGt%2FovE%2BgBxEr1XXRRBI4P%2FY%2B0syViviPLx7NiR198BKSTja8tRt5KoBI22rAscRC7lZ%2FeLgMFFEGUD9uDPTtZByK%2FTcGadKPkgv2CU%2FSsVNiFTwhVPYL2rhRuZ0iCNClqK3AyyxokcVuV3dgyGouUJAyQq4zGsLgB5oCv0G09dn044mitgMFcsalVKpVxXZRFBbhM63fAcFsmse1Id1I%2F8oYA%2FKfK9MdJzsNFhAbvIEHeJA6soFBPAPFRkG6iarBGmA8wIkDp9xUglnxye%2FbzHjFYr%2BSKJxkU92tX5owjIs06RbLzfY1kzzKjt8pxYJ3w%2BM0U%2F5v3eykS4KD%2Fg3p7pCge%2B49DN8S6yi2rbPgHF4c%2FNDH8KlKSZx%2FVEfi6%2B8uBSZ1WCog79AXuh9jPJha9lDXkAjIzlmxmN4nydEDpoBDqoE88V8PC8Dd0%2FBGhTgWa3ucYpIe0zI3F%2F4N0URBTWe%2FLbhKVFTMMv%2BwM4GOqUBGsLLUZlePQPfXmAU3MAb0ai7FHJtXlgV35QtuavUBbK4jNSSyGaR1rgRaqejuK%2B%2Fm00PGzi30%2F%2B9aOSKphno%2BvQIrMfzCVOzCg90WfsgNlq8BHT9bsNSnA7yQh4x%2Ff4l%2F9P0zq91eCrAlsU7fyKGMXqaus1Go1YdN9mfEs5ZW5FdT1temtVVVf%2FaSJimW8UewPB3%2BqSL65Hc445MHeBC5INoW53q&X-Amz-Signature=7d5156481386c8b822bdb6d2869e7f4db87793340bd0255c172a775ec4f4bd64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5ZAOJ6J%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCOBd%2Bugmqj7TWPfJ3n3LfGgfzFH%2BBSiVN2XIIZ9WJsbQIgJGhEM9j0oEk8OPzBXmYN3zErFz8yUB8v4gJrWaoPTW0qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMv2y2GBXDKc%2Bww6uyrcAx1oOekQ8HgMUlJbS%2FC%2BPZK3lCGUzHMZclxHtqDmQru9nnEBjpp8dsZ85FQdwFHMfIJQSACbey4Qe5eWiaVGo8Uu3Xr%2FJShWu%2BibSzKsLjJO7scW2FAPbhIaL4KN4gZpaabJyrn1FDhJf4P%2BbeM6gmWZGGbbaGt%2FovE%2BgBxEr1XXRRBI4P%2FY%2B0syViviPLx7NiR198BKSTja8tRt5KoBI22rAscRC7lZ%2FeLgMFFEGUD9uDPTtZByK%2FTcGadKPkgv2CU%2FSsVNiFTwhVPYL2rhRuZ0iCNClqK3AyyxokcVuV3dgyGouUJAyQq4zGsLgB5oCv0G09dn044mitgMFcsalVKpVxXZRFBbhM63fAcFsmse1Id1I%2F8oYA%2FKfK9MdJzsNFhAbvIEHeJA6soFBPAPFRkG6iarBGmA8wIkDp9xUglnxye%2FbzHjFYr%2BSKJxkU92tX5owjIs06RbLzfY1kzzKjt8pxYJ3w%2BM0U%2F5v3eykS4KD%2Fg3p7pCge%2B49DN8S6yi2rbPgHF4c%2FNDH8KlKSZx%2FVEfi6%2B8uBSZ1WCog79AXuh9jPJha9lDXkAjIzlmxmN4nydEDpoBDqoE88V8PC8Dd0%2FBGhTgWa3ucYpIe0zI3F%2F4N0URBTWe%2FLbhKVFTMMv%2BwM4GOqUBGsLLUZlePQPfXmAU3MAb0ai7FHJtXlgV35QtuavUBbK4jNSSyGaR1rgRaqejuK%2B%2Fm00PGzi30%2F%2B9aOSKphno%2BvQIrMfzCVOzCg90WfsgNlq8BHT9bsNSnA7yQh4x%2Ff4l%2F9P0zq91eCrAlsU7fyKGMXqaus1Go1YdN9mfEs5ZW5FdT1temtVVVf%2FaSJimW8UewPB3%2BqSL65Hc445MHeBC5INoW53q&X-Amz-Signature=7d5156481386c8b822bdb6d2869e7f4db87793340bd0255c172a775ec4f4bd64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVMDJ3L6%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCV1oqGdgNdxHDXJzH%2Fj%2Fkl2Cx90DWG1qFnH%2FE7FlRC%2FwIgdj0gNNQy%2B89qTHc0WIVepK1fCWe%2Bb3zHa51Xu4bEkjYqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHPwRWsSFn85gMD0VyrcAwpnT3V4B9pwaQDRgHUvSTmVMUCDfCzkSo28kzhqk99itHJVDL2ntEabu5ONR8VoTcFP0%2B%2Bw8UCRfnSa4d0q6TGZtFt54wkPdpV3naKRdeVsvraVjAuHF5HRXcycx46n2kZEFjZeLTRj8wDkMOCb%2FjKj3AE5qKQkjxzpq8Wn4Egw7jGtf7qBAkP7EtiiNbJYwd38YvA86Omv1F3BtZUmf3ZtQsomdALHJRpsqtud%2FnYIwmlIDUcBV6aRXzPF%2Bal8s3QD1rCD9QkjqXyFZyYKes6n%2Bk0cyE23Kw6NtiVox%2BPkn0eSfgSQc%2FfLsRalfv3Iia2RO2hHuTH3DhIFi%2FqTRYvohyd2D1CRaZDCiwpJFUAxJ5f5fUh40nk7XcELVdLconYO5tvoxfyC%2F%2FzAqYyQnyUsDeskFAGgHxlJrFl49%2BnN9V4blJUPmATFbYPq0nzSZZjiuJaK44BYnOxUHH04RWk%2B4rsZSkaRDW6585FGZ%2FnG%2B0%2F0oHB9WVXUg38wn8ZI0vccX0QPlMjhTPhBb%2FUcFWW18CWm%2Fa1CWyywnh%2BZaH7%2FiLqOYaqALElD%2BGoCsl3AbWIM0rYTl7JjFZutU4zKBYEYzuN3H7RU94NOE30CzlMzSf%2FeMr2dScb2Et%2FLMNuMwc4GOqUBEx3I6qv%2FsR8kY2M7QwfWqSHed3g6ggU1gwevTDNSeeaf813eXT1lr3Jvlnga1js3gSTwIsbphkvTf430y%2B7PC%2FQsjdM54J3uK5bITfmWSJ9hBaVgb9PB2OWJ8UVKr3APIZ%2F3WLellCVxF%2Boe2OQ0RNylPPhtXogfMe5BfdF3%2B%2FvHSY17vBXL7cSbAfbEb2bjbytn7F0plYWUVrrm7aHgr2wqecxz&X-Amz-Signature=81742323dfbdc75035c9bc8265455164d0d25383aa50bf15ce0854a6a9044325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSCQWLML%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDl3YgrOX7eukGaolX8YM6kH2XZigZUX8zf60E6dK2zfwIgW26IbFMbD18ZhMTmtolBd0LwVW%2Flu5dseSpNy8ASda4qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCkxXXYQ5e%2FF4mn66CrcAzhPEXVrAap5jqbDJ2Gpf6d2z%2FbZE0R%2BLowBkdh%2B1dlgUVmJa44aS%2Fd2P6tF%2FxazqIjHFl1jR83SPiUR4QArwviBy%2BaquwZLvIzBsqScs4NLiBmPamRWlxLPegoSR9X31uC62dvqqiKHENqBO8yDxj0Oi2SoC3oi4y4YWvtWtuF%2F5evk5u98DYQueUxwabN9EhnERFTkRz30VYS%2FjjKND%2FM1Znsf2NoVIsUdDsAh4MkYkOZsgp5G%2BipJbKGpViHWE%2F7mNqoHpJOkD92w82Hp0M7K9EtjSBCvZOcOaxd4MJtN4LkAHMrKhejGFA9RUWjW%2BcfqUy35gpMephPaAkgGq05MCBHH9Yjpo43yEMgo3B1SSL3g464hgrzea%2Btku%2FnSXMkaQmKM59y0u%2FEa6Cglw9K3WgA5RvxuXSOE%2BVaVWA7zRUqPXwYDyR4Br4TrTGt44Pceyw1%2BCnJkMcVadGNR1mYtbcHehqahr8A8V7qDNxk1E7%2FiqXmzMcidIJxfTnbCt6%2FRVua67TxuEHkWUnCwYl9rc7nJ7bmU0uvb5j4SOLH9j%2FRVMG5jWbsd7AEpQTinoaZIl38%2BSr2NVuQ0kEKb9LJesksbEFhH7Ez8snPiIDwKtOfVlO1Com1cbwcYMP2Awc4GOqUBRabyDZbvquGmH2bLlpwmjzb5is1LmKRZVU8lfGQN09XUa45BEwjohhUaubLm756wE1u%2FvIl7SS8NTzI45Vi2tYwlHUToeLV%2F85seR6G2W%2BmqXRYyngKqj8At5lAmWmDP2r04MhgS27Nmw7aPKgsX8a4cEyuuyYy5CeNEtRhG7Zz4w8YwXd2CLZgJASzJDL5f3syTHSkA%2FRGQX%2FqDzHlGJyd1eeq4&X-Amz-Signature=179095921b75bf25146abd2cba26e685db4278d6408f6a2f17eb70cbdc96fa4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSCQWLML%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDl3YgrOX7eukGaolX8YM6kH2XZigZUX8zf60E6dK2zfwIgW26IbFMbD18ZhMTmtolBd0LwVW%2Flu5dseSpNy8ASda4qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCkxXXYQ5e%2FF4mn66CrcAzhPEXVrAap5jqbDJ2Gpf6d2z%2FbZE0R%2BLowBkdh%2B1dlgUVmJa44aS%2Fd2P6tF%2FxazqIjHFl1jR83SPiUR4QArwviBy%2BaquwZLvIzBsqScs4NLiBmPamRWlxLPegoSR9X31uC62dvqqiKHENqBO8yDxj0Oi2SoC3oi4y4YWvtWtuF%2F5evk5u98DYQueUxwabN9EhnERFTkRz30VYS%2FjjKND%2FM1Znsf2NoVIsUdDsAh4MkYkOZsgp5G%2BipJbKGpViHWE%2F7mNqoHpJOkD92w82Hp0M7K9EtjSBCvZOcOaxd4MJtN4LkAHMrKhejGFA9RUWjW%2BcfqUy35gpMephPaAkgGq05MCBHH9Yjpo43yEMgo3B1SSL3g464hgrzea%2Btku%2FnSXMkaQmKM59y0u%2FEa6Cglw9K3WgA5RvxuXSOE%2BVaVWA7zRUqPXwYDyR4Br4TrTGt44Pceyw1%2BCnJkMcVadGNR1mYtbcHehqahr8A8V7qDNxk1E7%2FiqXmzMcidIJxfTnbCt6%2FRVua67TxuEHkWUnCwYl9rc7nJ7bmU0uvb5j4SOLH9j%2FRVMG5jWbsd7AEpQTinoaZIl38%2BSr2NVuQ0kEKb9LJesksbEFhH7Ez8snPiIDwKtOfVlO1Com1cbwcYMP2Awc4GOqUBRabyDZbvquGmH2bLlpwmjzb5is1LmKRZVU8lfGQN09XUa45BEwjohhUaubLm756wE1u%2FvIl7SS8NTzI45Vi2tYwlHUToeLV%2F85seR6G2W%2BmqXRYyngKqj8At5lAmWmDP2r04MhgS27Nmw7aPKgsX8a4cEyuuyYy5CeNEtRhG7Zz4w8YwXd2CLZgJASzJDL5f3syTHSkA%2FRGQX%2FqDzHlGJyd1eeq4&X-Amz-Signature=a91d5dd1a33dd704c3ede5bdd3752f90cc4e1ae1a79fedea9d857c92f5d10b9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHMRBGAU%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC89MSMnle24CiQ%2BtXYMnQ2SPWb3z8clqNw2DS5DAGqWAiEAzEe5UiP%2FuiGghdYu57UflhojA%2BjXC5OhNNvjaz%2BPw3wqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOAUiqSY3Bbew%2F0miyrcA88TCDie7v%2BgA9Mq%2BZa1TB64ioWKhElVKxMfbDNJvh%2FBGzPozDxebHQzjfMWbnl47bAmVUHsjOgwo7YN20Y4mOjGFgkbIkCFC5u7o4w7T82uohvrQLWNwHQ3WX2K%2FreMGifhGBo1F1GguhwEu6s0ifx6UopgQBqCbrTHp6WRYMSvdaTPRF8hEZ91pRzlICwX8aJCQTGbd23SgcmBNL%2F1ScKp5XTZ5QXLZKr66KAjyf1ZBenOVN6Z5dpHf9BOlBMXGFzrMD8CYZX1g1Cfd%2Bppo%2FxtjMx%2FFm%2BC836gYmCpkMIBojcl6M4vGR3S%2FNxX%2BLEejUxJNpQbNi6Fy%2FH9ZKF%2FaNurZJddi4GHagVrad0iAcuruSZs4pwVxPHvbC%2FVivRFjAcsfUbbAC8wW3tOj2f8CTWvn9FRkHKWrBtuHDVWiS38zbw4z7sHJly4xiIp32ipXtM73jwp7jNZO4oj8YibpOBSDUhuZbdSTEMLsgTmsumzozHDJ5XDnsmCNVkp7carjJQjXTS4ZNJgGvbZ3GIaHaXMbk7jHXmglWRpWwqG9wYCP3ZE7fDqqsdM11Au1TbzF8g7aCBHSnYQWmKoKQ%2B2VesDxvvjFMYGNP5vnnQ%2Bc2H4OMzYRTMY9kBHrNxBMJGBwc4GOqUBjlYik3I55PkpYOW4RzIIUsFbqs5Szoeig1QhZc4Qqhsy85MWP%2BmPfrxum%2Bb4VnqXB1bqkf9hMMdeIOAMf7VGo2jeRnSZT6sW0uhfV7VivuQ5kh9%2FAnflL7TG2LAG4i5KlZSYhFdnHwh0TVMqwMThho7wEek%2FTDAszydGVajcT0aIK%2B6kKMGH8b3MfGjL%2Bop6sWUVQOaa3XwauSV2rxdnQG5xXSGT&X-Amz-Signature=326cf0f180b2f10c1a8b343149d5d2b26dbd42433b636f763c0ea44c741503dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YNUULDT%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID74sg8FuttULou%2BhJBPzJyrrWLqvKI5%2BtGa0A0efGuzAiEA%2BaJ3iuJQgBNChm%2F%2FwEu%2FF6BZFnazU973uKrz31li%2B98qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJJdH3sOFNX%2Fj9QM%2ByrcAxJS3KHqDZJSkLbkDEF7UCW%2FXgDZ0t9ULsUkImFQipHjl8mWMsgHM1nBl1lz6i8CsMil4BhMhi5DkoPrR8mFXASZxphqdapcTjoVC36c7anJ3o1ycttw28271dY1y3yARE7k5DdQUQB2LrF78GNeoLRYABZo7SeIDIYqcaw%2BaP6MXaMu52kmMiCCHR0QqO%2F6XSup8xwGVWFlQ%2FGAqu%2Bvw94qm8TeIyXLEzx4FC3tfCeiOonNftKrE7ZhAaU%2FoAC24Y%2FVmT1QzYmg98Wf2PsY23GUe3Asqueo0a3%2BlsGcCrZEa9mPe78pbLkiA7TgZDG028XcMQ7Sr46Ksg1yexj%2FQwlouJ5dOl%2BIznxAgCOVHeLF1K%2FbZmRt7qKgFUESFuNlAbI%2F9UjlQo4yX5yvPmCCCmlgM%2B%2BeFZfK8nrZpQWT7iG5W2o%2F9cg9n3rid8sqF8%2FoZvMJ8ps%2FRCmgO7VX73mt3jHIpt6%2Fzte4IfrH0aobZMwPVrtcixZ8M9JyL%2BFTPqW1rQna7rI%2B11dAumMOTKQTxQmhW6ELZdTYGjQ8LoNzefr1aQEfWJfVUHuY1xyNJqG%2FA2w5%2B3JXbocxSkX%2FWxN0zTo54Mnb1Xyl4FBlzGBeuc%2BzovxWIsGKcNGK%2FcirMIeAwc4GOqUBOMnxVVHTMIbbS122yI%2FvcNQ8u2r6PYIQ5Gyzm%2FDe5yTzlyUWSXNaf6iIR76g7yHLmh%2Bqru0aOeyMQlZhobXmubrlFUvD9ju4JwX2S6LKVDNpMlzNAU3m8iMQW2e8HIrlYpZnDiAVm4fQpTtX81FjFwavMbY6QKZS1NMI8qjqQUGgs1GjiY4gq7l0j4SFZwWRjqRq55TVSGz%2B6l8Uk0EnR6NC9ZE2&X-Amz-Signature=cb631e2c40980fc0754fb352e5041fda2f464f345d28ccb0c499cddc3aef9d41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK7ZCVDP%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG0kE4e%2FeXxF6aVXByMcYXI%2BRB86K6YTKHNJHHxISbsbAiBQ1kvTrkw4zrfIvUzL%2BrGpNLEnolCVp9yKwyCIObF%2BpyqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7PlsbbqEWUTMHxiAKtwDfr3D4k1xGZC9QaWUYehxMo%2BUWPUoovi2ZU5%2F08UM5EvZ9lMgQ%2BlWDqv6mQ%2FQ3p%2FwzzyYv4%2F%2F%2FhkkmuH%2BHpiRSTXChLijDl9DeMR9jLjr%2FZv%2BYGVb%2BBD6zdX%2FWFDUYqIZsJUazvdDguErR4H%2Fsz8VgdpyycQpWWW9uvXdf4h41arUUVtFkjkxL%2B8qebdtO9imsYL3n78Cy26hBcuG3zyvStzWPWTV9fn8o5l1IH3HMh07kEEajCVan%2Ba8UgERbxibCIuGPL%2Bh1UH%2B89Xp2c3MZVcmdno4Sv4l9hEVKJ%2FSRdBFxRUPiFPTTcaPwydlMAmXb6Apuz5wXU5%2BaDMx5xSofVVveFqXNi2arRYV3qcUs8qcNRXidIonZs80UWgsLPZUeBGnuYsUPtH6%2FuDUGMZ%2BKlZ1dwKn%2FgQbnKAFwvT7ANxeD0nzUmEYjHMrW7a1Jz%2BPygy4uDvgWtu21SfgOL06aH%2Bf%2BFFFgCYgkpTpUmz0t02zMOJVgqkTftP4Bum6bsO5wa%2Fwh0Csy%2FB0GjSPISRCosVpLIKCZuJYgKmK3qeVkPHk4tsI3hXZ7vBTtMfwmCA7IK87wQtvPfeHgDDWcYBp5r3HlmLWnA947%2Bk2l%2FpuA6YnR6SYbpgLuvYWvGswqf7AzgY6pgEYmZqoYsVsuHo8rzjcQR8HGYWcS0%2BMW2fJi75qSbENuhIGaW94AdGNuD07Ykvm6do%2F6yuH%2FAOfmWnnbr4ySh3ASpF6CV%2B%2BDzbLEDrU23Z54ZI0zTMbIJUYB5LyY%2FGiym9gfI4jwX556Ixconms5DyvcXMZIs33N6s%2B%2FoudBr%2FRseOKErnZLo2dt%2F89x8ktW974bpRzxS%2Bakq%2Fmbv201TVQlPN46LVn&X-Amz-Signature=749a0eee3e0751b3f000d28fd132ac93f2bfb7013089034717ff5d1e14836297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WESB6L47%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF8Z86CYhxi9vH1wyOwvXJ%2B6EmLLhaD%2B%2FHRCxaIqg5p7AiBE1tzvzjllSzvlHKjmTfwwQ1gITPZbX5SmLTrElLIx8iqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM97RC%2BdHf0by5W4mCKtwD6JC5%2BOaQ82HZ3oWyKHhCm8odk7q0CQan3wMDjy37vmc4wWedCg3s8EF7UYWsc4RpkzvSXB45cU4cVCuJwNZZAxAoW6r8W%2BM%2BQf95DRknsbkm96JwaGlfcRQByoHNoHSrqeMaxNoTdDY0wwe8%2FYId3f1D5jY9KirO9ow1hQuaykjIEhLEy%2FduNJdj1Tcfowi3EuuRChWidCiWkZQzE27bUtNRY30V%2FJrG7Yj2LhRWjasgAwtRMrYp64FMzBd7G%2BZuOyMWF1oauiEGwQJhZDiEgW%2BwwJ3l1G0cxwca45jKvp0ya%2B1JOUmHS7RCMZ3jhcVX6jqMYjnXpubWsSJCoTqbtZB1zsXpnSL0nd3qiHqrCL5j9DRU%2BK4qsQK2fwf%2FSRjiEgOlrNoJrNvSioOIh2jezZFuneCm5CY0oSuNduFh2kDS1K6NMiS784EWQQw5jbu9085mbHZNu8JGdPdaP%2FGJA40ct6a%2B45aLOfca%2B7%2FZ77A5KtQe%2B1YTSn8RLyn53HQaE4W%2B85BybjILbFBFgc8X9rydf5%2BO7NoqbZai%2BUjBJ8KTBu3JO%2Ffhc8jrD6uyOL1x%2BiFE%2F26r46pwse2OrbqJhl1MUPInXKL1xJfEiXzMFLs226Nc6tbl8Jav1tcwr4zBzgY6pgEq0G5Yg8noWzMnoOCtfGYrJahM5DPx2ZL2lwkFofB0cUjtyAQw1rBIkk78jRBlSZ8mva1OEvLWu%2BvOjJa4%2BpylYtfNOZLDlWtEUuQKGtVCaFNhqEp0x5AeAPvSxS76jHNMHouVLPpiYRi5gvGOKbfakyEklgknksNwtA0JVrUiLSkCn7kAXPAdWuWSEzA7g9BYGi9rymEk8wsG3oKLOhaOmXnyBHxx&X-Amz-Signature=dfd11eb9d742e360e15b4b5af11d95d83dac801f04a0c37d6ac04d19c42c3881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WESB6L47%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF8Z86CYhxi9vH1wyOwvXJ%2B6EmLLhaD%2B%2FHRCxaIqg5p7AiBE1tzvzjllSzvlHKjmTfwwQ1gITPZbX5SmLTrElLIx8iqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM97RC%2BdHf0by5W4mCKtwD6JC5%2BOaQ82HZ3oWyKHhCm8odk7q0CQan3wMDjy37vmc4wWedCg3s8EF7UYWsc4RpkzvSXB45cU4cVCuJwNZZAxAoW6r8W%2BM%2BQf95DRknsbkm96JwaGlfcRQByoHNoHSrqeMaxNoTdDY0wwe8%2FYId3f1D5jY9KirO9ow1hQuaykjIEhLEy%2FduNJdj1Tcfowi3EuuRChWidCiWkZQzE27bUtNRY30V%2FJrG7Yj2LhRWjasgAwtRMrYp64FMzBd7G%2BZuOyMWF1oauiEGwQJhZDiEgW%2BwwJ3l1G0cxwca45jKvp0ya%2B1JOUmHS7RCMZ3jhcVX6jqMYjnXpubWsSJCoTqbtZB1zsXpnSL0nd3qiHqrCL5j9DRU%2BK4qsQK2fwf%2FSRjiEgOlrNoJrNvSioOIh2jezZFuneCm5CY0oSuNduFh2kDS1K6NMiS784EWQQw5jbu9085mbHZNu8JGdPdaP%2FGJA40ct6a%2B45aLOfca%2B7%2FZ77A5KtQe%2B1YTSn8RLyn53HQaE4W%2B85BybjILbFBFgc8X9rydf5%2BO7NoqbZai%2BUjBJ8KTBu3JO%2Ffhc8jrD6uyOL1x%2BiFE%2F26r46pwse2OrbqJhl1MUPInXKL1xJfEiXzMFLs226Nc6tbl8Jav1tcwr4zBzgY6pgEq0G5Yg8noWzMnoOCtfGYrJahM5DPx2ZL2lwkFofB0cUjtyAQw1rBIkk78jRBlSZ8mva1OEvLWu%2BvOjJa4%2BpylYtfNOZLDlWtEUuQKGtVCaFNhqEp0x5AeAPvSxS76jHNMHouVLPpiYRi5gvGOKbfakyEklgknksNwtA0JVrUiLSkCn7kAXPAdWuWSEzA7g9BYGi9rymEk8wsG3oKLOhaOmXnyBHxx&X-Amz-Signature=568f4a4072c9dc75c3f6e80bd03e8b69936b849a38419c79d4e729227410b10b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TPLN7NS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCyqTe4whwIebumqPlLryOkJr60cLkrHQbJXHfnWtg03gIhAJxwf19%2FKQWTH0w8K%2Fh10VLHEfip7bR3SIUDm5nYCeEJKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRPhjT7vaG%2BJSOQSMq3AMd6htO%2Ftn0fWN4fHTRmsWPF9dt1tpG9aNvHtPk36Fx%2FnUOJKfSwb5xGEmXQRPXlLzOHCsdhhD9HA0XcZHiuAl27NpFu3ScoPUF1Go66IaZ5U2p7eh%2BJ5w9j0krBC1CK9UaJZSCnw8UYrjz%2BHxZxw1tp%2BALYMYlFYjsm1AAoyT3HmxiRe%2Ble8jDij67NNYr5%2FSuScaQxKy1vytlUrv8HTx%2FQywmbGNhMNriQCvDZ6UecyhPsFHpxe1ZVM1PiGDGBGz2L7T1LMYKHaUgPmlLyRg7%2BdsVIiYxL6N9AIF93ICbxOjztBNlF9PHrhT3ff0ukg06IhrZOsMP9M1DFrqjd0xs%2BXgqo4oSGczH3%2F5qFZmgMq24jvKmdm%2Fj46D%2F%2FXVbe8tS2NR0RBlPZ09x4bPLmMqB%2FX5bJYzva4xZIkujEJmu0aeK%2B%2BSzxaZjAK6taUHF0TSIDVCEDuEsOo5GL%2Fk3yWBNdQkUphFXLMz4tWZLxpzY4m7KnFvt8oD1GMekIBa5HmgO79Yz1URG1oFTJ%2FL9EimDv2kPN1sHACt8vrW8r42GndmCz1wQvluV5L0P%2B47Mq4RCT6NyI2gPL8%2BN8x1an2Ia1hBd0U5OwkPEF35035FTJeS%2Fw0XmZJW5G9abZjD7gMHOBjqkAco00L8sLJsNaOF2UfHG5d%2Bu0iUGZ9e5%2BHn2VF%2FZ0vD2yQ%2F9uCs5tmX%2FQarJe%2FE8uQMcQhLNcjOFZWrmyFYrxlCH0gZYOl1TMyhetnvyumY5osngogSV%2FqDzexWdmIQFHVsBZAcVBw6B2A01069tTcCKc1jBRSaZJoBc3%2FM6fcRLvfQVZ4GxsDfan9iOLr7iZu2LHdUk1E5t3lBp5mM%2FECq4jk68&X-Amz-Signature=f812e1e69f38a33e3bf344d7132292747ad83d7272a1bcd5864168ff64b97f76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXJY3WYJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA5fRwwr7zDPKPfgms8NQ6Xkn8IQpBvHv9ELc6glgX6EAiEA6hSglECTMj9QAUDx%2BORRyQX58wteBzmSYBQ5r7LdVS8qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOq9Tzw1pH2sJJZqOSrcA%2BfaB5dsn9qjH5TXqL3vjzFj8zKPiWhBjcBL7Ku613wpbFtmv4Rta0%2B3mkvt2zESDccp9Mrfd%2BD0Q3c2fiRvHNHvnhMKqJ53r1HsshDs%2BZbh7BBA4aZQUWYPkCBtflXpVqQmi4M%2BpfLzwdsm6skvp3Wwy9BNjUOON6arVTxJmuoBqWwCj52cKBkiAsVAznriD8K918lC1WAPKQRTwoEvLkrRN8AnJN5sGGMvnfk6SqIlUtiVfABJ0XFNY3%2BzUrX4hAjv1g5NTh5XyIbYaR3yOj%2BqVm5gQTLhaCrVYx%2Fq0WuPEfVZkEKiTe1Az1RRszngNUeg3ky7izNYXKPJ4vltwadnW6c79NazYfrA7t8sY4CyNTeOAPvEmK%2Bh75sfgOMZ1UlxmKcYelkfnlHd9pHgC35gAd%2FE6Q60NI0hoimQj9D7QHWu8NNxovr8gsP2F%2BkgEpxl7yzrLea%2FFV46FUuOv%2B9TGa%2BWhbhzoTQ%2FuMfo6UhDak2K6%2BLUfzlbi9RIHRk9RJKi14qZltgULFxHamJzVYwLwLpM1bD2JKWs3PctfyXmT6ru%2B7JzH7MK4%2FmKiUR3CAVIzka1stAbx%2BteZxK5uTjWv9qzA6LIqWgdixb5M9tpiUJUMvO%2Ff3648GRbMPH%2BwM4GOqUB2Iez57e7q0sdTOIcar7ZqOfzYpLoGeOIJOfWAMrieYs8k6LUJ7ul2rUDVlRvPmQHNJXr%2FkM530kqbHeIztsTRJeU1wAkJE8oKBaBAU1FYoMMuHb%2FMdRFL9kvS%2FauKQ80y0JJ1ggATCoVSZ2bcvyKT7uISCWRFjGENqBtaktIzty9YQ3skgfRosle6FhnCWlq7Yn7006tvwloFWBBm4QitfkY8voI&X-Amz-Signature=2006b3465b2c3a158dedf3c4b8fec9a6386d1a282fc42bf81b3cad7281501310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXJY3WYJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA5fRwwr7zDPKPfgms8NQ6Xkn8IQpBvHv9ELc6glgX6EAiEA6hSglECTMj9QAUDx%2BORRyQX58wteBzmSYBQ5r7LdVS8qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOq9Tzw1pH2sJJZqOSrcA%2BfaB5dsn9qjH5TXqL3vjzFj8zKPiWhBjcBL7Ku613wpbFtmv4Rta0%2B3mkvt2zESDccp9Mrfd%2BD0Q3c2fiRvHNHvnhMKqJ53r1HsshDs%2BZbh7BBA4aZQUWYPkCBtflXpVqQmi4M%2BpfLzwdsm6skvp3Wwy9BNjUOON6arVTxJmuoBqWwCj52cKBkiAsVAznriD8K918lC1WAPKQRTwoEvLkrRN8AnJN5sGGMvnfk6SqIlUtiVfABJ0XFNY3%2BzUrX4hAjv1g5NTh5XyIbYaR3yOj%2BqVm5gQTLhaCrVYx%2Fq0WuPEfVZkEKiTe1Az1RRszngNUeg3ky7izNYXKPJ4vltwadnW6c79NazYfrA7t8sY4CyNTeOAPvEmK%2Bh75sfgOMZ1UlxmKcYelkfnlHd9pHgC35gAd%2FE6Q60NI0hoimQj9D7QHWu8NNxovr8gsP2F%2BkgEpxl7yzrLea%2FFV46FUuOv%2B9TGa%2BWhbhzoTQ%2FuMfo6UhDak2K6%2BLUfzlbi9RIHRk9RJKi14qZltgULFxHamJzVYwLwLpM1bD2JKWs3PctfyXmT6ru%2B7JzH7MK4%2FmKiUR3CAVIzka1stAbx%2BteZxK5uTjWv9qzA6LIqWgdixb5M9tpiUJUMvO%2Ff3648GRbMPH%2BwM4GOqUB2Iez57e7q0sdTOIcar7ZqOfzYpLoGeOIJOfWAMrieYs8k6LUJ7ul2rUDVlRvPmQHNJXr%2FkM530kqbHeIztsTRJeU1wAkJE8oKBaBAU1FYoMMuHb%2FMdRFL9kvS%2FauKQ80y0JJ1ggATCoVSZ2bcvyKT7uISCWRFjGENqBtaktIzty9YQ3skgfRosle6FhnCWlq7Yn7006tvwloFWBBm4QitfkY8voI&X-Amz-Signature=2006b3465b2c3a158dedf3c4b8fec9a6386d1a282fc42bf81b3cad7281501310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDLIRHE3%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T232144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHdtwC%2BnMGpBf2MRU54IAV1HjkEPhTQMfkBh02psXdDwAiEArVya5A%2ByvaB5BCEKMBL60OPlKUVS1ofg1yG8fBf%2Bji0qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBpM%2B2IILEGw88HU8ircA%2B0jrKq9CWSYfz42JUPzH6pFRDLb28Be5zovzdFeV55et%2FSocWg7cgpfyuUb8EJIXAIQM5TWfn4a1XUT1M2KYrQtA%2BFcZOvOjzqf6Sv4qOPQzftOivz6hS5wJ1k5%2FONIZwTG1I7g4ir0qj8SKF3DNoM5VSW3GQv%2F2pg1CvOEvF0PiY9YOl0lmhFq4dMPWz%2F723CiGE5G0rMfsRuQAZ6zHI%2Bdgswxt1AHKX3HIvmfCQzYQLofo9PChj1WjCJ2Trs9wGh3nUSz1xlN3DZ0oQah%2FIGki%2FFDn5EUM9Fp5GzwQTHhYL0HnXouN%2Ft7Mk2nD3AVyzatQImW%2BI%2FHSN6x9BdzN1UErwXa2yDtnrZhpAkyVUW4ULQxQzze7OK41ylakVOBgMORJdPz7WhX7xks5GxLG4iJBMn8a1KlgkUJJ676CwVZiDfwUnQ9BmEHWeAaOWb9cuqBwsMHmYHm2jTZrKfhWP8tZS7uf23ckR72G7I6AKTfcydonenUiFB7gaDdNTngk%2FcEkuCkiS3CVOFUhKGWE7l2LMmBmr%2B1f9QI0DB6i%2FT635EyB5O4tVquyqNFCGhYEocCnOph8bgtu1zanVYzASwY%2BuKXlmlL7WvjbwP8yOouNkj1oLS%2BQIr2E%2FrZMPeAwc4GOqUBmhJbMqKt3an9Z5P%2FCML%2FZLMsK%2BQ%2BPWm8o%2FekZRZjpAA5OfsnjthBxROHuQ9hdgZPp2pWqsg35oBOaMRIAheznEzen7bd1WRfmGlsWxkeSlPttifZA0HSVi8LSH8h1Aqkd8Cu%2BTl9hijl8%2FVtXXwYO90gZtxadaDj2ScVYM0bY2BnUTfHTtaeAr%2Fg2WdMA7jNN5eK2v0Zdn%2FgAecJddLMhVeoAjIF&X-Amz-Signature=ad7f5406a3ed1bbbbffd64d096978b1822bd83dcefa9f6d42ca96ab01fec5bde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

