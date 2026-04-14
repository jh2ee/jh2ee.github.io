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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDVVHPYA%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICU7imeAyBRObS6xAa2WqMW%2B92R4ajXhP8spHahrD2sCAiBR0cTYXyd%2BgafJfDhuQ2bPnX1W4KCH0fYLDsMCclXadCqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNB1EBWE4iKmIbnY%2FKtwDH8s8WVc6Y7GrUgXnNGXXKh6al4bJDLAgIwVeZ5Z2iVeVVFjoZtIga9JYKwqauoQIBdy0TrR0vhFbQqbp3zkkeb2IntClpGJxvsoP217kcf0AcfpqP4Bm%2B%2B1sELt6fn2emg9FRJfZOKZ3zTYuWMLkwzzJBZ9YU4%2B1XeFVMmfEMgh1VFil9sfsjMjsJj5MoZCYGjJHLzr85r9IPxPFgJa4ksNpugdtBYqCMauPyzVxCxlCp3Hp5PQODCU%2BGKtahzLOVqnbZjGn4CZkmJutf49hk1mo7YnYeywfGuAWvTvts35cLTgOw0ddQjIdQ7ysIl4PWQ%2F4gUe8npjND2H2LHBk2fiHdgaenezDVmKdA1V7H%2F4GQ8E1kSObZ%2B3D70McT7xbhR%2BpF449s3T42Dt8R3PTBi5cyiisPxh6NGxD6V5FWgv7Ic3XIq3LlAitexm239gpQ9IF7L8ygCUBPhd5zlHoqP2V2IQMHUGKiAa26mNnzZEImm%2FXsvriUDo0bXhbFY2C%2B2606eX7t0011m5oLJPbqg8yK0YJg6QH%2Bw53HEgFWn5T0qyM41lo9fd1z7WrLs8Uyqui2Kv1%2BJpzTK%2Bz5jw0FBRqa3znZ68F9v23bFwLjMDfYinfcj5vaj7r%2Bh0wzs%2F4zgY6pgGETJue1Z9hCIChkVlv0qhZiYwA3R%2FV11SHNc0fnckXbicicH5xxuD6yU4r%2FB98XwReLVw4xPYqwgsmtf%2FmWjaCzCbyc25kHRpzO%2B8rx0DVgZYyeCbWmnput5aabI5seN%2BCgcuqJvyWBeNmb8cwJvHqXFxWjDvZ8EPn8h5ZQLf8JyUR%2FfRAhxpwfMHLJeyqhL9b%2BLqJ762OLuqN1RRTLzu93PpieAZp&X-Amz-Signature=310486e90f240b75f2113b9aaca7afccadd0bae63932ed42e0a2686886b3168c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDVVHPYA%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICU7imeAyBRObS6xAa2WqMW%2B92R4ajXhP8spHahrD2sCAiBR0cTYXyd%2BgafJfDhuQ2bPnX1W4KCH0fYLDsMCclXadCqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNB1EBWE4iKmIbnY%2FKtwDH8s8WVc6Y7GrUgXnNGXXKh6al4bJDLAgIwVeZ5Z2iVeVVFjoZtIga9JYKwqauoQIBdy0TrR0vhFbQqbp3zkkeb2IntClpGJxvsoP217kcf0AcfpqP4Bm%2B%2B1sELt6fn2emg9FRJfZOKZ3zTYuWMLkwzzJBZ9YU4%2B1XeFVMmfEMgh1VFil9sfsjMjsJj5MoZCYGjJHLzr85r9IPxPFgJa4ksNpugdtBYqCMauPyzVxCxlCp3Hp5PQODCU%2BGKtahzLOVqnbZjGn4CZkmJutf49hk1mo7YnYeywfGuAWvTvts35cLTgOw0ddQjIdQ7ysIl4PWQ%2F4gUe8npjND2H2LHBk2fiHdgaenezDVmKdA1V7H%2F4GQ8E1kSObZ%2B3D70McT7xbhR%2BpF449s3T42Dt8R3PTBi5cyiisPxh6NGxD6V5FWgv7Ic3XIq3LlAitexm239gpQ9IF7L8ygCUBPhd5zlHoqP2V2IQMHUGKiAa26mNnzZEImm%2FXsvriUDo0bXhbFY2C%2B2606eX7t0011m5oLJPbqg8yK0YJg6QH%2Bw53HEgFWn5T0qyM41lo9fd1z7WrLs8Uyqui2Kv1%2BJpzTK%2Bz5jw0FBRqa3znZ68F9v23bFwLjMDfYinfcj5vaj7r%2Bh0wzs%2F4zgY6pgGETJue1Z9hCIChkVlv0qhZiYwA3R%2FV11SHNc0fnckXbicicH5xxuD6yU4r%2FB98XwReLVw4xPYqwgsmtf%2FmWjaCzCbyc25kHRpzO%2B8rx0DVgZYyeCbWmnput5aabI5seN%2BCgcuqJvyWBeNmb8cwJvHqXFxWjDvZ8EPn8h5ZQLf8JyUR%2FfRAhxpwfMHLJeyqhL9b%2BLqJ762OLuqN1RRTLzu93PpieAZp&X-Amz-Signature=310486e90f240b75f2113b9aaca7afccadd0bae63932ed42e0a2686886b3168c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TNAJI7O%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCM8bEJrZs%2FoON07x3GHQcQJTvwz0dPY7lJqzlASrYZswIgAq2zYSVZWF9n4DnIdWYsbHpUSMi%2FmdIoump5UzfN8R0qiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKAIbKh1Vj5V7wjyuSrcA8xCc4%2B1TmVtqBGBRYwY3if25hE88XrYET8HnyxHXAjj3sioDJa8u7%2F3GstWdf%2F1fV5jtcKhCkLKTfchzsveWqH3ggPXv3VV43X%2Fm8%2BLgI2mgppPgmHBtxr0A0dtwBXBhsexLCupxWdoeGKrD0InSEVka9zlw8OezpTidGE6mNSNZd6hgnDZ0BO%2Boi0yqHUURDIxUYNxljAWeWiTAxQbDq%2BJfmMZ5tuCIsjpUst6vETdhNoL1wkp%2FOPPWXNtydBQeTcSD%2FHlA2LajIiKkAmUUClsM3701IxyTMAoieE%2FtGubd1M7KnLo1dP1QywRBCLWWBDTPBXg1cbHWWDkQBJUFXKfCfFmxmi6U1Yvj6Vpyao2OYOVJG%2Fl68FMxNhuLGX23%2Bq8lmNPfgau2mcJkJVdTZxxogfQb7aZrHOcxXQ%2B8uoADnxkfJ7EbaJyXmmxn3ntS309e492GvF1tzEIWcEz4Vb%2FqNgvC7weWotSs1XsOgDv8MkJrltclnVW4CJGABC7N0rvRdSqj1gt0M8Ir60wVOt8e%2BLbBZxVS%2FrboWgtxqGnEfaBQJuPaEGPLqF3C%2BLfMBYKB7u7BoA0isjMi5zUVpLbkzcY1WjYJC%2FAgGOMcQrHaPVJhaMJ%2BK5DR3ZwMJnQ%2BM4GOqUBd5GwLRV3v1YTbxPJR9sUjIY9%2BQtqVwl287zCKIGHBU2mR%2B1HP4NWwZCwJIJ9uKgH6nzLsRXbRj6UnVOHh5H33%2Fy1rnQJMBla1HMBNEF%2FxIvPJhMu6R2zjqTCDixdLBS2YUBkF73egIIV0MXHKwiAKrSCgoRjRhaJM1Rd5%2BZRVQiYopPLO5ZIYoUyAJ%2F10oRKy81vhNCM2grN6N3hThoRRie%2BHcBI&X-Amz-Signature=f2f9ab39af99f08624c6b264fdeeef0bfb5a9897b62f30d155c92c1f17fc5fd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E22GGUF%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICV4uW2rljByLKuLnFcZ3SY99Gj%2BnPzXzMOI5UfvHBWFAiEA%2FKJwnB9SvKaqVlAE%2B6k6nljz3Maz5qlqvob%2FpWAq1coqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcR%2BfNNtViWEk7l4CrcAx1GJoDex4alpd3WFx%2B2En4nq7%2FFm%2FlCeAfJF%2Fq11pNrP5I6BiX09vgfW1%2BVUHKI8hufzaS4KFagRu1CzqcoFkHJq%2BcsT2XYjADtl3tW0Mwx2Kd2Zc7Ho4SOI2eKD%2BBcfJQj3CV4NB5xWq8iSx43kwlJOyfxitziThNoKMu%2BqM5oDS%2FQCUYkwtg8zVbj6HvVE4ZWxTfc4FN6gs86kvnlDvAc1SDwoxW%2Fb8RSZHwPZpL5wqeDNQShbM%2FZCYh2w3mt%2BEqIszSoHduK4TgorhEVNP7Z0QoWZKj3evqMw4decbVhs3GDKM3PBEokdjSt4bf6Z2KB4cwnH1%2BsLZUmU1ITPbJ1z%2B0t3AcTJm6W6DQSiCw6eqk9FmlUeOtrm%2BS%2BRtu8H3nIOJxKO%2BUdmKTWiQRCL7hHKiYp0Z%2FKdIBq3HAV3WG1xMMKIieA%2F%2BuF4OMazw2APM3C8LapETshfaSEbe9hMFAuVSJl%2FqWPAs5ZfgRiprDq7Z6od5gfDVgTqcITTNA0DnBjvafJo2Wv4H%2FA6BSJT2CuX5tkEAtoM8qDb0j1rSODv4DQnKYeqYDGYmzYCshNORz2TBcoG0VsfhvNPjP9P8WwJQnNZ5dTtXq2ATpeVnusGPryDgXgkdz576m3MOXP%2BM4GOqUBf%2BH7FQrOlFw9YsUQuWYLyFZvj2qqTK4mOIJj4B1bjGEOYB%2FumDwLKJO88t1sJFXR7V%2FN46JPvXIegW7bN6y%2FfHU0jfzJ8HfWVc5K7fK99%2FLzNwI1ctrE1dk1ZCWWdEmiVU4TvKYRGPqnlSMLoIx%2BSyNzz%2BL6szOk9ZGaP%2FdSQ4G%2FUKDAxNqVTn5vu2nFtjqgBGPFSAKAohaZynaCCHh2gvcTh1RZ&X-Amz-Signature=ee125e2baa964e03fd0c956fdc5d199e2efcb4e32b5bc126b7fd6e38f1afbd4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E22GGUF%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICV4uW2rljByLKuLnFcZ3SY99Gj%2BnPzXzMOI5UfvHBWFAiEA%2FKJwnB9SvKaqVlAE%2B6k6nljz3Maz5qlqvob%2FpWAq1coqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcR%2BfNNtViWEk7l4CrcAx1GJoDex4alpd3WFx%2B2En4nq7%2FFm%2FlCeAfJF%2Fq11pNrP5I6BiX09vgfW1%2BVUHKI8hufzaS4KFagRu1CzqcoFkHJq%2BcsT2XYjADtl3tW0Mwx2Kd2Zc7Ho4SOI2eKD%2BBcfJQj3CV4NB5xWq8iSx43kwlJOyfxitziThNoKMu%2BqM5oDS%2FQCUYkwtg8zVbj6HvVE4ZWxTfc4FN6gs86kvnlDvAc1SDwoxW%2Fb8RSZHwPZpL5wqeDNQShbM%2FZCYh2w3mt%2BEqIszSoHduK4TgorhEVNP7Z0QoWZKj3evqMw4decbVhs3GDKM3PBEokdjSt4bf6Z2KB4cwnH1%2BsLZUmU1ITPbJ1z%2B0t3AcTJm6W6DQSiCw6eqk9FmlUeOtrm%2BS%2BRtu8H3nIOJxKO%2BUdmKTWiQRCL7hHKiYp0Z%2FKdIBq3HAV3WG1xMMKIieA%2F%2BuF4OMazw2APM3C8LapETshfaSEbe9hMFAuVSJl%2FqWPAs5ZfgRiprDq7Z6od5gfDVgTqcITTNA0DnBjvafJo2Wv4H%2FA6BSJT2CuX5tkEAtoM8qDb0j1rSODv4DQnKYeqYDGYmzYCshNORz2TBcoG0VsfhvNPjP9P8WwJQnNZ5dTtXq2ATpeVnusGPryDgXgkdz576m3MOXP%2BM4GOqUBf%2BH7FQrOlFw9YsUQuWYLyFZvj2qqTK4mOIJj4B1bjGEOYB%2FumDwLKJO88t1sJFXR7V%2FN46JPvXIegW7bN6y%2FfHU0jfzJ8HfWVc5K7fK99%2FLzNwI1ctrE1dk1ZCWWdEmiVU4TvKYRGPqnlSMLoIx%2BSyNzz%2BL6szOk9ZGaP%2FdSQ4G%2FUKDAxNqVTn5vu2nFtjqgBGPFSAKAohaZynaCCHh2gvcTh1RZ&X-Amz-Signature=b9f66d6ab3fc8a65790a50a1a07b6d964bf3ad1fdebbb819e35609bc1339e533&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666D5TM4BT%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG%2FmOEBjjAl8GFtpWr5zc4KfT46OAU1cBBOFOj10o8aZAiAMeJjBKpNmqBfiTP8YMvnxmUFx1zggpZI9LVXUE1bqbCqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FV229zq7CwQj12ecKtwDwB0S42kYSWUp9Ao9IYr3%2BNIcze9boEPjGJgL%2BsYsKXQqgOVBEkrHw8APOXJMk7yLKj31xGDeyUJtOLgsVUTTcSGygR4WKnAQSMErcTzDHaPTokd%2BonL%2BcoYvmK3E6UVvvN5xj6VUHTzAYDv6rkoLBW6xncjoLk6%2FcbrCANy7mwiLgJBJ7c1YLGWBHGkicx053kuRCGEBeu2rj75ERIZmuqScMW4SxAyE5y8tsXkjQIWFzoDJY1cA8mrDnbCuc%2BIbKNLNOYa%2FL2Nis4ARaN24c8jmz8yDnzXmuICXtzDWm3LElajZ%2F6ZbXavXCXX6suf3xdpKP9yBEUMJklnC9oaWqb3D%2FWYeje2KVS1cs6gKUcFWkeWU8Y50oyTw041RyrzqrFuqR1GmcJOGvWltS6IfDayGt%2BvAZZU8Bt8eCrGkPXYhD01yPATZegDOBF0ni7DygXuf%2Fu7ghQR2He2JwyoRUNlRsh3Q%2B31%2B%2Fha9rfcvZUm3GNhU1fhV4xCg2qO%2Fef6y3W7L9JLJPVReLZPdJHrfyxyvPenmYzd3lGB5F3YEgWB4IdukLBVt21RMZEmYPIbgnaHV0rUjOQQJd%2F%2BdwBmeKOd9BqdNkX3%2BV9m9EbwPpINmblYJ3Xap662qiWsww834zgY6pgE4ZjToTV6GlKuBngp5dVf6oQiV%2BwFsLtYWuaOkCkmElWl1zpj5l28ZBE8xVsiwjr6d20eZyiaUOephRJn2Acjkx5MPor91ngVzU8Infa%2Fq1mtizPHG8agOdiidcHF83zCfPdKnSgurb%2Be48VjC9OoQ0GsnZpmSkJtpm2sY1Q3MkGou3YkKY5rI5QyRDe%2FjTEKZ5w2At%2Bo8NVdknSYbAvOmue6VX4p9&X-Amz-Signature=dae6cef8fd5ae3fd32a5c8459641eb8a51e06f8d0b9e79a877fd5dcd1a99a7ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRVXW72I%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoOMmUlUAFeTnxD5DagGzPYxKqL5MMi0EO67eUwgJjJAIgINJyhNkmT2sl1jnzMSe%2F5Zcn%2FDeMh%2F3phtTzRU1I93EqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN6S8X%2B87qf0Y7hbpCrcA4Hr2BvEyWzNny%2F0U8c%2F6MireeyWComVghJAzWnPRDMBoLfd39n6ZAWkWaLqqadCY8AHpAx5RKLBocCOCfFLGOvJDjZUYEla8UbMiSiDERSQwx4lt0L6sSK5LjSipmkcBJT1P%2Fb3pcXkWZN0aR87N5y%2BqVMt0x0PSemEYAG9nVDWaIafzFwTt1auzD2xQ5Wi1tLxm2pgpXvXGcbFSs%2FxqJbyLySQ%2BE%2BD6VCQUXvigJ1KPSxlWAbAVi0sEqHB%2Fnu9bxf1JpWgwDjfv%2FZt0vZ7pg70KI9IpdaXzOAM9YpsLGMUxOlzLQWIN2qSoffdQCwc7a%2FkLh0miETcD4jipSTW0zMBshrr3%2FI6uheYGiNpYFqFDVl79CPuc1B7%2FjrBMgVpuxr7%2FvXrgDxEqf6Ocy0nXWmD1zPe%2FA%2FZI57V1HqwFmnUUfFesaKSJnuQaWsmwlkTXo%2F42pxZBoAL7uOKNvpCGKj0lWTkrNALflN7z%2BpGRbJou%2F8YTihFlFkB9eSBkNew%2BDJnGV1n6K3FryddIuqp8cqqr696nJdxwPF6cg9bbom2Ndj3IrkvZb2pmt%2F8ueKIPq3FK4rx20Gs6b4SjalS7lbOnuoITbNihJBic%2BsyMcAzIOsL7mFPlFjQAFp8MLPO%2BM4GOqUBO0RuM2cskzPfFj4D3nxAwFhEP4VUXnejkC2JC7xahvbGAzOGgr4nSelHdmK0k0vv3Q%2Bf2UAx1zmi90fdlre7h5De0DO6OgFCPUIFdPYhD2yiryBFkL772HzJUEaDE66s6mSPTvmc2YTX4Qxx0ubvVh6RsLZPC%2Bbh1J%2BzpX9yfbhMZ16tKIS1b%2BkNa90LGy9mUkufLBg2v%2BL30pINeGRg7qQ%2Bed6w&X-Amz-Signature=2c6d95635d5f3f85c867d864d1eb38efa9b2da40af1043f211cae1e04e450204&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPDFTTDX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBlqfHDlUrDGI4kOo3%2FAc8V0QPNHr0DA3D1prnVmO1ozAiEAgbSeKuPh5vsxtBsweK5jszB3nZKeYOJHAp5PYqwra44qiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEAJnGhrOHRQ07ppLSrcA1vnsS8bQ8F7eJhQ5RfQZKPm29vCGCelooljKZ1CppzhW%2BZAceJGFt3Vx2r6XSPq7eucCNZcPl%2B0BDNgSnWVVNEWHnQ2kLNKU8dWEEPH5b3lnffmHZ5Ly3VRgJ0ykl7ZtEkV%2BMy4qdAd7KYYEyGhycaAsuREG3evcSHg07R8uvGIKw88Y%2FibBXTLHS8UF4dCyBqgbVj6szV%2BcV4A81C%2BIB9HA%2BYlskQVgL%2BQKjcKCxXTQgzZ0c2P9kCdkpUTLAPzX6GpYLobfMcyoE%2B3sMy21hakqzUsG1K1LnfS7awphOh0qg8MkLInQicweEV7YeNSBDSxQUIBkfv9rtdZsU9r1B02tGS6nyTP2aw%2FpWJDtZ%2FuIKwBQePOYfm7f6qRiw1HVQYqKrrEsF2MXDOeoBK2owhTnRKA81KsJVulJwT0AFRfiOdsknVu%2FWEqCQ1wN5YMuxgCD71E%2Fagx5Flh%2BGbD7kEEcXnRBd2G%2Bo4PPS3lLJwylkuN1jHkjWFOrnyK%2B5UmXqLG67dM1TC17AaiHj4WxCwaoOT8Fw0OJV1mChwqi7LWxKd3Bk23NAA22RSoS59dJgzVb75ZNRXl8C5vm8eJjlUzTLoNDzZXK6mbraamyasQucRo1BQQaOJWyzV7MJbQ%2BM4GOqUBHU5y8rbsCxvyvwo9L27LsOMipkbvcri%2BCAU9StnNCjfRlj5wJjgkg3Q5XKLxdA90oL20ZLK%2FsdyMdLD4kXA%2FBaPs%2BeG98CBJCymgZcMEOJRGCl7%2BMCWfwN8qsBb2q%2BalNSENX9O7J%2BZjzRRQo6S5CsoFFdTJGEkER6YWQKy0nwb8Ycoy3Px1sqh57Fko83MyxlRQQ%2BNC7A2h7U%2FEKb7qA6Z%2F4fXN&X-Amz-Signature=f16d9b82f86c1ddac727f35e66a264516bffa26d5c3c33c482a23daa3239ce6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMGDNS2J%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFNv9RX%2FM1k1cz%2FUNQPm5um02srHR2%2BYiCf38PpcanTJAiAQlZRgMKwZ6H8SCd39fJCxcCugvwpmH5ZWF4m9Tc1IFiqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTtHkxTgbQoQ3V6fiKtwDsMI1kxSN%2FUlrEI8uDxzxHmTEKISv3CVC67QhGJy32Fly7S%2B6C8jMHjsdpOHiRXtlBuo7BSJ61fcUHLL12dOmfw53IBtlfVCUfoHvT19k1P7CuRfdxvQ00hZxVrIWDFPTw0RPUX%2FMyagg9NK38FXqBwJJL%2B7lxChUhlsAnRDTOxuHCPr4X2Zp1ws925xcDSt9W8iZV3Nn66kjqieMFBj4XsClu3BfKIB5Awcf%2Fq2%2BgT4yjqfHoC%2F9LOBgTsDXZZwvzb3PbCY5%2Bei6vD4VpwLK7ya96CYUwZcNxHGHh8tpH9v%2FDy4xoj2%2B9L97pPtTeaqiifLUZEWT36e%2Fiy%2BLUlb%2F85%2BBScw4wmWiu6SaQuWfZT32W1OR9IPc0FZUQnhQike9eCysnug3A%2FaCwRC6MFeqOjQOEoXBNCmrUD7Y6Y%2BVDIfqg4FW%2FRhv7pkx%2FBRKnHt8AQK8qdx2dxWbFpVe2cS4uY4nmDkUH8rDSYCMtilltkZ0SFUev35WbGlQVBRWedRPbIje8rKvLrtLcqxkkZ6gQL73owIwXxCoB8mHKP%2BU329K%2BeA8IIq84GiJKysQACxllUVWrO8wlTa4bIs2lVTSCY2vhNhvUWgtfzcUBlvenXDHm84mdFXFqV7zDZEw2c34zgY6pgHL1xlcdaVmRkaa2Ls8ZkxLepOdDSgsCTvNwppZlQOGG%2B7uYYiafxQe%2BTyu22xHJckTPlglJZ7D%2FPsU8FiB7xSL24jql1ddQdDMigJLDiiM3WkthIseqJe5Q9yDy6BJM%2BMu4O%2B3NQWuhMLeVfuDZkuPkentb2nhBo6l4gBGh74nhWIXydAQmB0yGWG2LHwMptiNucjg5u15Se%2Bmx6FFW5evltmkeq%2Bm&X-Amz-Signature=1b7205f2c7a9b188916a64fda067efdec785e26a8d0351b3717160271b8c1e63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMGDNS2J%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFNv9RX%2FM1k1cz%2FUNQPm5um02srHR2%2BYiCf38PpcanTJAiAQlZRgMKwZ6H8SCd39fJCxcCugvwpmH5ZWF4m9Tc1IFiqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTtHkxTgbQoQ3V6fiKtwDsMI1kxSN%2FUlrEI8uDxzxHmTEKISv3CVC67QhGJy32Fly7S%2B6C8jMHjsdpOHiRXtlBuo7BSJ61fcUHLL12dOmfw53IBtlfVCUfoHvT19k1P7CuRfdxvQ00hZxVrIWDFPTw0RPUX%2FMyagg9NK38FXqBwJJL%2B7lxChUhlsAnRDTOxuHCPr4X2Zp1ws925xcDSt9W8iZV3Nn66kjqieMFBj4XsClu3BfKIB5Awcf%2Fq2%2BgT4yjqfHoC%2F9LOBgTsDXZZwvzb3PbCY5%2Bei6vD4VpwLK7ya96CYUwZcNxHGHh8tpH9v%2FDy4xoj2%2B9L97pPtTeaqiifLUZEWT36e%2Fiy%2BLUlb%2F85%2BBScw4wmWiu6SaQuWfZT32W1OR9IPc0FZUQnhQike9eCysnug3A%2FaCwRC6MFeqOjQOEoXBNCmrUD7Y6Y%2BVDIfqg4FW%2FRhv7pkx%2FBRKnHt8AQK8qdx2dxWbFpVe2cS4uY4nmDkUH8rDSYCMtilltkZ0SFUev35WbGlQVBRWedRPbIje8rKvLrtLcqxkkZ6gQL73owIwXxCoB8mHKP%2BU329K%2BeA8IIq84GiJKysQACxllUVWrO8wlTa4bIs2lVTSCY2vhNhvUWgtfzcUBlvenXDHm84mdFXFqV7zDZEw2c34zgY6pgHL1xlcdaVmRkaa2Ls8ZkxLepOdDSgsCTvNwppZlQOGG%2B7uYYiafxQe%2BTyu22xHJckTPlglJZ7D%2FPsU8FiB7xSL24jql1ddQdDMigJLDiiM3WkthIseqJe5Q9yDy6BJM%2BMu4O%2B3NQWuhMLeVfuDZkuPkentb2nhBo6l4gBGh74nhWIXydAQmB0yGWG2LHwMptiNucjg5u15Se%2Bmx6FFW5evltmkeq%2Bm&X-Amz-Signature=417181f29601af269ceabfba3c8253d8217bbe4ac54b40e16bec39a3f5d46b34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666OJ7MVK%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID%2FuXiZEfdSTABu3GESKtmvyE9BIsAb3UpXR%2F%2BY8pZCTAiEAmJ8lvgHclHDggS%2BvYsWNFNE1hhSPxHOk3n%2F24J%2BJbq8qiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKnzp0g87LRc5rb6iSrcAzHUPjcXJ5%2BDq2v50zqgBQBhqYqHiDXGRh5i6cbJqtkVNdy6JusxrxxYj%2FIU7wChauy3tGuCUEirpNC1YBQe%2FfIbcDMNDpDL0hYTAQQhmXljvb4zo19ketgTS1s1pQ6nXV3%2BOfpe1sZOPEWvhZbFjU%2BV3CIw%2Bpaf%2BWXltsAus26n%2BGTmWIUOtDi71CBo9Af9dygBLabEi0p44p%2FTw%2B3r6YygQobOAmY6L5zZX%2FoT8HoKevtbtsZd4Ecc7R8ItSKGydpgPgxwZ%2BSrsG6MhCE9nrafy14MLJAJWEJ8dy2JxuAXwzKOlZaLBa1QINkktxEadbO2Qln2tjMTHcPBFFwWpgIFcSu4Y18Kyr20sp9PppDZynQEPD7QzikjoMm2ulVw7fMMJlJJ7C9PI%2FZU%2BdekL4QnjNdEISnfIBfTLMDa0Pc3QN2LGF%2Fudwfs9a2P0vtGZlsxvq4b5BQ%2Bz9uWQUzDbVZsJwIFPyr51rLAMHCOPxSj1JqMLUcP2eE0vo%2BNIgpJkWqwzXqxudVt8Jx3ac1ZxB3ltxRiPjRlT5oLLFSUC9l5hoWugx5mT4Hvxy9DHuHHHRC%2Fvl2btICLUZDOoAuwMUp0ccLvMC9dDkc7cENIlengAJMwrc6Pe%2FLCNaZOMKfP%2BM4GOqUBfMFp024Ym7n1Ki2ckGI8yoXdt56eJU83Y0d%2FO9Y8JBFysV9nTuFZwsezVvbuzTKcXpFojUCKan9fk39VuClOQm%2Be7%2FXskjNiakXwWjuXeHhiupr1fpmuy2C%2BvwFw71XFo%2ByBiJpjG1SzvsUwdaQmc5jzUH11eNntXx9bzUvxd26bgngvhBMugo9S39tOg2wIElBq15wjvIysg6bqZE0fMSfJoUlm&X-Amz-Signature=89db12638888d38f68b089bcca6cfa9dbc775bbecd1c2e63f00f137491d2f25c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NXDCJOI%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD2xT7M%2BgsQOqXFGo8tK9tkvz%2BwSl4bIrcuxQ%2BYDgj2KAIgNeZGrlGXkZSVbfNSx4k3igbI%2FexZaigFzBJTQuDMstMqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOGWpepVCXU8Wt3%2FaSrcA%2Fmo475uTbDhEf3ls1QMs8TRZEw0eqX0l0%2FL0sXm7tJVlL90MoPm%2FjSJ9VK4KJt%2BSwEPnHyDD5bmPKtPRayWiiy79aeRjhFpkFIvLjv3qglGJ6bqajIll36lY92e3n4fzaKdmyu%2F%2F9NesI5%2BTiK%2BEiFKBnQGMtqcoN6RVWtfbdUsY%2F%2BRrZTvZgdtVBAWocwcDXHXeexypDvcpep866HwX31ODr7mrpNhg98R%2BX6b7ZuGp1JQTfyI0Gl%2FAmnwFAZT7w%2BAp3y0ZUPuNrn2GaTZM63Dvq3WVOatfzjAFDNZlqzv7VHQkolaztSc%2B5RS0PGyNiuAI1eO4XZ2gTdwwCopaLIISPPTT62AZn3ny4lZT%2BR0N%2BwPmIJLL9UVDNtgfyIJLbkNNhg8yzEibm5NmedEPYSss0O5ob9%2B4TqyPVXsELddH%2FiMUjwO52jEC7KjiJawjYn2hoNenunAzpv7Jq%2BjDDB3szguTi7WrGWwziVwESzdllOImmVk8olRLSDYneFm6JGi5x5Xttry18Yrm4iKgK%2BiEavLXDrXQpdJe3l%2BL5YnhQsJw13CZtV74mYHB0e7iEGwe1IvlNDg9twi%2Fg9maUIH4VFolbpLynYS4qoRjCeNNaTtzSRnW4VifHQKMOXO%2BM4GOqUBvSOxK9VAxnorg%2BcNM20388ByE0cLIpDeLqxxtUg57g37AqSsvWWaZTLUAprEEMRHe4SM%2F6zxW1Bc2CM7ng2bBNJ4hxCl04gBHPHcQSic7tqF8dky0yPjV4l0JkbvPKoaqBWC4cCEbWyjVX4zANuAE%2Bp75dvnZudrZQODp8Na4A59O16Lob2GK8Vvh0xwrCwZ2ZrlECD0xuGSESgEMN1l%2FPnyI44c&X-Amz-Signature=a73edbd12cf5f6846223de420172e688ef1d5de779b123fcea7ba934378ec881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NXDCJOI%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD2xT7M%2BgsQOqXFGo8tK9tkvz%2BwSl4bIrcuxQ%2BYDgj2KAIgNeZGrlGXkZSVbfNSx4k3igbI%2FexZaigFzBJTQuDMstMqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOGWpepVCXU8Wt3%2FaSrcA%2Fmo475uTbDhEf3ls1QMs8TRZEw0eqX0l0%2FL0sXm7tJVlL90MoPm%2FjSJ9VK4KJt%2BSwEPnHyDD5bmPKtPRayWiiy79aeRjhFpkFIvLjv3qglGJ6bqajIll36lY92e3n4fzaKdmyu%2F%2F9NesI5%2BTiK%2BEiFKBnQGMtqcoN6RVWtfbdUsY%2F%2BRrZTvZgdtVBAWocwcDXHXeexypDvcpep866HwX31ODr7mrpNhg98R%2BX6b7ZuGp1JQTfyI0Gl%2FAmnwFAZT7w%2BAp3y0ZUPuNrn2GaTZM63Dvq3WVOatfzjAFDNZlqzv7VHQkolaztSc%2B5RS0PGyNiuAI1eO4XZ2gTdwwCopaLIISPPTT62AZn3ny4lZT%2BR0N%2BwPmIJLL9UVDNtgfyIJLbkNNhg8yzEibm5NmedEPYSss0O5ob9%2B4TqyPVXsELddH%2FiMUjwO52jEC7KjiJawjYn2hoNenunAzpv7Jq%2BjDDB3szguTi7WrGWwziVwESzdllOImmVk8olRLSDYneFm6JGi5x5Xttry18Yrm4iKgK%2BiEavLXDrXQpdJe3l%2BL5YnhQsJw13CZtV74mYHB0e7iEGwe1IvlNDg9twi%2Fg9maUIH4VFolbpLynYS4qoRjCeNNaTtzSRnW4VifHQKMOXO%2BM4GOqUBvSOxK9VAxnorg%2BcNM20388ByE0cLIpDeLqxxtUg57g37AqSsvWWaZTLUAprEEMRHe4SM%2F6zxW1Bc2CM7ng2bBNJ4hxCl04gBHPHcQSic7tqF8dky0yPjV4l0JkbvPKoaqBWC4cCEbWyjVX4zANuAE%2Bp75dvnZudrZQODp8Na4A59O16Lob2GK8Vvh0xwrCwZ2ZrlECD0xuGSESgEMN1l%2FPnyI44c&X-Amz-Signature=a73edbd12cf5f6846223de420172e688ef1d5de779b123fcea7ba934378ec881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WWQHG4E%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T114544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDCiR7lWeJzfir73%2B%2FBBpUX9HKjfnCCQFGfXT89BoLz0AIhAKO10pwxt0OGHFUwqudK7EIE82R8vNs%2F67uLy6d4HBiEKogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxcQbNSjJO5iVTLrUgq3AMTrGvqfrIlXRKIDnG3QqgQzppVUZHruv00dh6d5R9Z3sasRyziyWtO9JM1%2F2jCjmoM5YyD7nhLBAYbXweKUNEG9RYU7p9EFG2UF6X1yYq%2ByzFf1nHRasofGe%2BURBVnIU8arNqdzfW5mss5PgfBVwfz8vba5ZwaWU3%2B0VE6CcQqlZaPalViS2mjDgnyhzbmiKqej7KB2YVTV3PxJqOYfHXSsZkQUzuM6InGWLNZ0LIXy9lWcq3Lduz3wPwge8mFpnFLZn4ZK4FNV0f%2FNqgxnN8Ks4RGBBIl2Mz2yazo0Qqsa9%2F8U%2Fc6CMj8AD56GiyNhYj2waf5%2BGJjpznm4%2FICLeJlPPpT4XQOIfQ8aVQZYfOkEhjqnczxN4YAKFCw7z4AcMsKWfEb%2B9r3d9pMqVv18I750ikh7fX1k5IGTK89vAuiEG1gNnKgC8o8AWknlNKo8aqJzu83Zzm%2FDXKSc%2B2v%2Bgay8tPKzizWNM1MrPbxR2x9tkS3biex38YfScYUyN8E6k19WxijseFvPGC5w0pxg5yyplJhKq0nT%2F%2FadXYusaQhtHt2KlPW6jXeXUwb7lR7jbL6lfAmjMMzEzi7BhqiclWxC5VvCxafpKBbH6%2FTAfbiT8ryWa3P%2BvQAbSkR5jDgzvjOBjqkAS%2Fo2Caiqdl6v4qJ4JQTZXqYNI%2FA002fQPgUE38DQoXpXPFfRJaLgRJga0xtQKZmmOpyPckGh0isDlXxyob7o%2B6y%2BRyEvo8eAMAZQoMxb8WOzs5PdQnEIbPi8gkzioqsv0m%2F9MIFe3CniJwmv6q0dk8yc7O6wHYMLvR9W0uhtCEXy9nVUplWkWAtEVsOhC9NT%2BjhqcJlLL9HW%2FHWCcEr3q82p%2FOV&X-Amz-Signature=41ceb7b4722aa65f282dec96939b77e8170ceee2440131c18c68f2fc17dd0922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

