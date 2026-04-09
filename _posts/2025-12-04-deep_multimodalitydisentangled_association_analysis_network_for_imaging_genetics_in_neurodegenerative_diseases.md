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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NTEU7W2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQD5vcms52tX3aiVOP7AP5BNTjZteR%2B7Odk0LVELvA9j9QIgGtOFlz%2FREQJ31LXVdxIsvEEpBVvwNDy57i92YqDSJzUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDAyS5GJ%2FY9gL8vnlQSrcA9pOCIvZcq%2FJcoQfFBuSXWPxW4yM46iOq34JHUQwJfn%2BeTCWazJAvo0UJoBa6NWvEMFuqCxB8dI3HW%2FCXPmL29OgBWhS6qMdbElHdBp8LWGC2nVAR5GpvH7X5cGLHHXkBqfG%2FZDFcAeR0zSaidQUI8X2NMXS9E44q4%2BO13CSmFSLQh1qzZgqjgb9xegGY%2Bgw8mLJyFelloPNWcaq2hnW5RQ%2B7nzPToIyLW6zGr31q4kk6BDfHvIbpwUxLvy1zHtA3u18O2ZcgzuGnyNsFs4OVJeEXXVcvdknbjssQC4kEvJf7Nb35Nu%2BgT7q%2BBkAcD4U7XPJ%2B6Y0AepwvjoRnbxT3Evr0ip01lX1T8ZYHmyGP2%2BvTXp1FV2SFUivaQlA5sJ3XgN0oH%2Fc2m7Oaq8E1Rgn6RjKmnbHf%2FGbxXSY7BWwv%2FpePSermytxj%2BT0Mflkm%2BvVjg8R%2FvG0QvbHnVBrReatR7wB9%2Fg%2Bkz3i5F2xlvUWU536VNf1rnjfoZUBiOU1eLHhFDuJMhJ4faVqliAeFx5%2BXLY0HCRVJFwb4CHkXAN%2FaD8rwJLPuizDoUmaNa0Lxbtp9amw0n9gAdDT5fMQ0XIm%2FCEcgqBAjsA%2BA9vRtJa7%2BNeZA%2B5AUC72wwPohsqnMLC6384GOqUBZ%2F1kxWt8EQWEVysSoi8tSB%2FPxMtVcWYgN2oOvgU%2ByjRWhCKorDWpr583ve1dhaVwYOL2xqOT0fdPyQqjfb1umNO2Htqp9W2HI%2BUa%2BX%2B8GrqUxr3Tn%2FxVU7RaT2W95itIfzcsaF9avmw%2BkTyIkZ3WmdbJYVHOaqrVMPfXecuD2%2Fk35GOW05M4TUhAutZ1TNBODC46M5TdnRsbDOhY5St0BFYQvDaU&X-Amz-Signature=b86fdc9221dcdffed3ba7cde12b4dc0134024fb44b59c1b53ad27cd49a5b4f18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NTEU7W2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQD5vcms52tX3aiVOP7AP5BNTjZteR%2B7Odk0LVELvA9j9QIgGtOFlz%2FREQJ31LXVdxIsvEEpBVvwNDy57i92YqDSJzUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDAyS5GJ%2FY9gL8vnlQSrcA9pOCIvZcq%2FJcoQfFBuSXWPxW4yM46iOq34JHUQwJfn%2BeTCWazJAvo0UJoBa6NWvEMFuqCxB8dI3HW%2FCXPmL29OgBWhS6qMdbElHdBp8LWGC2nVAR5GpvH7X5cGLHHXkBqfG%2FZDFcAeR0zSaidQUI8X2NMXS9E44q4%2BO13CSmFSLQh1qzZgqjgb9xegGY%2Bgw8mLJyFelloPNWcaq2hnW5RQ%2B7nzPToIyLW6zGr31q4kk6BDfHvIbpwUxLvy1zHtA3u18O2ZcgzuGnyNsFs4OVJeEXXVcvdknbjssQC4kEvJf7Nb35Nu%2BgT7q%2BBkAcD4U7XPJ%2B6Y0AepwvjoRnbxT3Evr0ip01lX1T8ZYHmyGP2%2BvTXp1FV2SFUivaQlA5sJ3XgN0oH%2Fc2m7Oaq8E1Rgn6RjKmnbHf%2FGbxXSY7BWwv%2FpePSermytxj%2BT0Mflkm%2BvVjg8R%2FvG0QvbHnVBrReatR7wB9%2Fg%2Bkz3i5F2xlvUWU536VNf1rnjfoZUBiOU1eLHhFDuJMhJ4faVqliAeFx5%2BXLY0HCRVJFwb4CHkXAN%2FaD8rwJLPuizDoUmaNa0Lxbtp9amw0n9gAdDT5fMQ0XIm%2FCEcgqBAjsA%2BA9vRtJa7%2BNeZA%2B5AUC72wwPohsqnMLC6384GOqUBZ%2F1kxWt8EQWEVysSoi8tSB%2FPxMtVcWYgN2oOvgU%2ByjRWhCKorDWpr583ve1dhaVwYOL2xqOT0fdPyQqjfb1umNO2Htqp9W2HI%2BUa%2BX%2B8GrqUxr3Tn%2FxVU7RaT2W95itIfzcsaF9avmw%2BkTyIkZ3WmdbJYVHOaqrVMPfXecuD2%2Fk35GOW05M4TUhAutZ1TNBODC46M5TdnRsbDOhY5St0BFYQvDaU&X-Amz-Signature=b86fdc9221dcdffed3ba7cde12b4dc0134024fb44b59c1b53ad27cd49a5b4f18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMZ5UW7K%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIEZKhmoVVwHVH75mBQcL5Pxc0d%2B%2BZNvgAQttLX2jPrbzAiEA0cj57nulsqQ9D2PuJ8wSoNd%2B5M6VT7ALVey1FnzRed0q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDN0BX2b8dl21MgKSuircA%2By5Y6%2BlTrgR7JTnHEZ2YK8Okh4FD%2FehHX9IT1mCjQ1HrSg3pmBaccOHo5PFFz7FVztwchE43AgXYws9N%2Bv4BPXllgtf06nct%2B1594T7ORtzHi64EKPWzEGrPAMjaZOrSQg3g3qULPctRNwKsJVmFDiKPf9mMYEduieDBDy5AOrkk1H9QJlqNwUoVNlsUlYYfHC5nAlNNld0jx9blTsITmgjiIhOzmwYIJHv0lKNuvuaN6FOiCH0bnuxqf9B4BdpwtYiQK9MeYLKNd%2Bf%2FEzMh2g9xhUlvQGvbR%2B6TFA%2FN8iFmZr2420UxEAPqLg9%2FNMy2XKj4idpcI%2FyJcsnuK8bMZaEV%2FWPbdKyxhcnTOSUG7DQvUFVRhTcZWIK2hdLIVslhELLzBcFM9Mmy7mOuQlevO6LWfUI6jXRfTOKjx%2FOErCYHMXHhP%2B%2FXmlSAB36mSti%2Ff3t3M0%2BDztiQdxE3L7zOPpjw%2Fq%2BoNya0OqeHp3%2BcwDihsn5N07DFbizChL7busWjqgkAPOPZAR%2FSzwOHU0ehgiRdKxks3Cvoo69pz3o68Yv1k9KwgjQ43LvR3xCoczbM7YydfcjW30SXIxQlrVVEWnjydW7bTjQG2eR4soepOPctWCfUh%2B3c26XodOrMP%2B5384GOqUBrqiUXyI89OHBf8kd8yTV5MRwhabcTAA22AF6sJtDoYLNlWqk6DpfJQYkL%2FiXMQ9StxVK%2F%2FtgE9IN6PzxYi7FW5MrXQ95Sphv33zNatMM3s%2BbLCOJAoAY80BhYUdeLk2KDPFg%2F8bY2KpMJxsaCUhkY%2BztqoPh0CbxC8MsbW2R35%2FFjhv9Nz08eWfHyTXhsZEVIs86O%2FK9isvgc155OiymuXC25YYM&X-Amz-Signature=27984ab075ec744b5e71c22ff73fca7c7741ad38f9c3a8e28cbd0bbac5969485&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCPI7WQV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAPQveWF%2BZrOJO4bPHIMOnfQQRV7SZB5ANB3v9EocSKPAiBSnrOwirKDmwVfw%2BsvF%2FpHXLHyDOYJ0ON0YJXJfMqjdSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMZ2t9l4CHynUmZHclKtwDAkcS0pQRwx0XzH6P8RK44gywNRfkLawFyhYTZwtIH9oJD%2FhjFI%2BQ0OprO5vMULCXmrBn03LUidyLb1KbXV9mAr4UGg55iD%2BRcFt5gmgMtOU1ZtfBiDVNZpmlnftNskhzL5o4CRoPF0%2FHRwp54GXb2Te5vWCURHJrO0B2kO965BkdcqQldte10pdPu4ejBs8CKhuREjIIKVgPlMPWmsGk2TSC1QiJypnH4ZqjSZ8uecETwTdXtMrjsDr9PB2ILN2Mtp%2FaHaFZFxZKGU9505EifLvKT3D3eQPbnr8sbXFYMAmb1BgYFlm3OkhKVGRvr7va3eumZWZzjeoA8ArB%2Fhj7TLqps%2FnqES7AvezJv4losHvPxIMd0C2S6Htg2kNnBEGg1xUVxF83IT27GlE%2FfD3xtCBg4CT3ISFap1HsQ4R9iFgo%2BvH%2Bw98LHANfIezCTWi4dQaad1cVlpHPDAM%2BkWaw2pA1ojnKm673YhWd4Rlgtiu9WiJ71SZ2bHKmyBh8iGV%2FdawKguSh30cG6zu5LbbFNaCvWLBdfT1%2FLdPvy3N2uaopBj8LembebVnJYORk5Yed1e%2BOuFzg%2B43UFjPjGQWV3aHM30NPZ5ciWUUWri0nTpt52LkXdLXdrEgTQGow3brfzgY6pgF5SDa%2BAMKOVgY5PHBFPuGn8lCcFvOErbwD3xZ08u77GEs3OnFNJHCellot69zRD0mBl5DhTyPa1cR%2BqZEzgyeLQQ5U2PCRlWr8izYM6%2FrJZNhQ9PxX1%2BlFE8dNUZPX%2BEKUjo8pR7oeRf6tUdGu4rxo3uBrMSq5%2FqtfpuntFS6ng2S164UZbuk5NTokXXO2rfhOt1JHzdjuTcxniDKjAn%2BUVwmtRLm%2F&X-Amz-Signature=a1a8abef655cd0dac24607555996c8167f23518f596bc5a30aaccca530850b5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCPI7WQV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAPQveWF%2BZrOJO4bPHIMOnfQQRV7SZB5ANB3v9EocSKPAiBSnrOwirKDmwVfw%2BsvF%2FpHXLHyDOYJ0ON0YJXJfMqjdSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMZ2t9l4CHynUmZHclKtwDAkcS0pQRwx0XzH6P8RK44gywNRfkLawFyhYTZwtIH9oJD%2FhjFI%2BQ0OprO5vMULCXmrBn03LUidyLb1KbXV9mAr4UGg55iD%2BRcFt5gmgMtOU1ZtfBiDVNZpmlnftNskhzL5o4CRoPF0%2FHRwp54GXb2Te5vWCURHJrO0B2kO965BkdcqQldte10pdPu4ejBs8CKhuREjIIKVgPlMPWmsGk2TSC1QiJypnH4ZqjSZ8uecETwTdXtMrjsDr9PB2ILN2Mtp%2FaHaFZFxZKGU9505EifLvKT3D3eQPbnr8sbXFYMAmb1BgYFlm3OkhKVGRvr7va3eumZWZzjeoA8ArB%2Fhj7TLqps%2FnqES7AvezJv4losHvPxIMd0C2S6Htg2kNnBEGg1xUVxF83IT27GlE%2FfD3xtCBg4CT3ISFap1HsQ4R9iFgo%2BvH%2Bw98LHANfIezCTWi4dQaad1cVlpHPDAM%2BkWaw2pA1ojnKm673YhWd4Rlgtiu9WiJ71SZ2bHKmyBh8iGV%2FdawKguSh30cG6zu5LbbFNaCvWLBdfT1%2FLdPvy3N2uaopBj8LembebVnJYORk5Yed1e%2BOuFzg%2B43UFjPjGQWV3aHM30NPZ5ciWUUWri0nTpt52LkXdLXdrEgTQGow3brfzgY6pgF5SDa%2BAMKOVgY5PHBFPuGn8lCcFvOErbwD3xZ08u77GEs3OnFNJHCellot69zRD0mBl5DhTyPa1cR%2BqZEzgyeLQQ5U2PCRlWr8izYM6%2FrJZNhQ9PxX1%2BlFE8dNUZPX%2BEKUjo8pR7oeRf6tUdGu4rxo3uBrMSq5%2FqtfpuntFS6ng2S164UZbuk5NTokXXO2rfhOt1JHzdjuTcxniDKjAn%2BUVwmtRLm%2F&X-Amz-Signature=129ab1afc11972391d09fbbbebe33343e099d1bd5ad0dbd6fbe8acbbb1549a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CXPTYDF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAo0lrbB8PkOmMhSQW4ms86ZtwW1LvPInEtlb3JoWUrtAiBp0WeoxQfrlgdHtjR%2Fb2OmoRMR%2Bx3nQUwMbRqntP1qTCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMh%2Fv9kTe75w2NH5ygKtwD1FWeLRJYwOl21zAqMVR4CeEvtC7jWUvx1veADMCaU1RLHB2W6p3LlCJfSj7mJTIz%2BJ9fnWVouu%2B3JHxB%2BNKWf%2FxykV5IHBLvJNAWIgtsAxT4bPsbUHKwpG%2Fz0YOlMDk56UEHawD3esFmUzs9l842A0otzujwaITR0ryeTEUv1y56nSBFRKuZqiKowAn4btbXnJg5wOorWGqbZm6Siub%2BhVerJCaLTPobR9fxKJ0VQTagqfgKepz9GmWBzyxiuKdrjyEReQ4qiJ6TTFFDX0v88Zuw33nnUmkULZEPJhGve2qKVg6QN1eGNfVKGWgVF6xcCHYXW4oPxIwYAqemUNZb8OgQCytuCiNbVLOKkyOjWhwqj%2FS8CwkRRheZXezluit367LBI6wmeHOa29vIt0GpGFZk2IKu76X%2Bpt7cZw2SlZBXf5C1ijvNdJZbBOJTv7dXgLG3gv1%2Bx84erux0D1%2F5N2M5ecx8c7IYE11dmvMikTMlKG0uCMn2GoVtD8iXBQv%2BEJmylv7docpu2gDBTJscF9aH1LltscHCg74o%2FbY8%2B1OBjrieTSvCusQ%2Bm7kd4P5GDpVN0ywXfCFcMvFxpYwuTD2wQNCsMyTvlSCyjj5qIktg%2Fg4BnO9EvX5h5L4wurvfzgY6pgEB7bKv8zTe1%2FnTD54pIAjBGT1zHXNqlm%2F3lF9y0JwtttgRKm4mMl1XnQzcwlqbHyWhQYf4wuLrYNYSrSc5GAJlfcilP11HMBAG9e1eSImGtirthwYnwalOtVoaKOH3vmHoPmSiyO85NdNacKuVvq%2BJEwEugUeaPA8G0D6Q3pXYv3FLV%2FuPPi5nxt63DWjXkF5EGKBHVOLkFtjMfEFPwHJvCJGywgfy&X-Amz-Signature=50cd40f2a7189bda377d3c283ef355197269233b1b753b47c2b6eed86feefa77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSABA54E%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDcsV%2BfX3bQXzlKlBWq0dEKmGZ3vLrwwCklZv8vucDNjgIhAPUpBopIlF4ytdjykB69TFhwtANTnTC00%2BD9tTQk5O3OKv8DCBoQABoMNjM3NDIzMTgzODA1Igxamdynijvha%2BYi4pMq3APuW8cMyEOJ0wqX2kraP5eutm9i47anBtQqgpiAgrTFLECOpWL%2Ftk%2FmuIwf%2BzUwzUoJU1MkHNj2dI5tUCmkn4Iu0fGEvLFtGxBgFSFsUL3a%2Fr4BTpcssaifa1Rf9163sduLRcloiRaYYlMymi%2F4lwmi5hMraTcD4j4HQPrpOiNa4sjtA6GwTwjYyd2YZ7F%2Brz2JSE3Nx5qrsvQcep0YdlqrwlXDvfEQEMqGRNiwTYiBRaZMDU5YdICM52S4fM4pZ1%2Fn0Y2Smlk8%2F36PyszJudQZIAdgC5bPFzhO56YK9RhqiKNTAAwiLyEEocySkegj8x7YYviAadxTNk99XQ%2B7CvI67ZxkyHcGx8FWpAccXH%2B0VHpAP3llwnq7AoL1trSixsfAi7QSX5oX9JoicsXtMx2frPKjY3KEV%2Ffa831LZgVlHQLYTGxGO4%2F16q9MHlJWcnNfSWYrhXUM5gCKtcFZFBWC42pwPU2TLRcIRj5nT0TAuIAtvZCN%2FvPducn6nHA7sBzNm2H3QjxUMdaHQ8H7DnPjHqgXbwC6uukX76M2zs7ONM%2Fr2RFAf2eElaHykLwMdud%2FrJHZ8yl6gJI3nG9qqfykANNtk%2FvGc08X98H1egVApnWsDmoM0idsuR8m9jCvut%2FOBjqkAfikoTuCTXTM0XxwRqm9Pq4wx5NdAE2g%2BNg8krW95iRJLl7agPoOPlPmZAXvGMNcTMCUumIfKnr0%2F0dhQx1bJOxoKcDzwD1DTlpVFb861eRGnVGMW8ooPmvcM4f3cxsB7imgJ3wkN35RNVm7T2f0ZiRxznFfDil5%2FQyRfDSgMc2IAGN7C1gPh09Zx6rQ%2FJ1ABpFAFHbi4GMJbR39CIxw2WPZfb5R&X-Amz-Signature=9a92ce64d98809d2bc491ffe98dbc18ec379d6b4ebf20e702e5b9350485b1477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XKAWNLS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCLbHWtJmWBHm4ajmkiHQKpgMCQWMjSbCxdLTNPKf3G2QIhAL8%2BIVxfSrj08zSVjoPnRRlF%2BMC%2BMd2FxWSL2Olv7POkKv8DCBoQABoMNjM3NDIzMTgzODA1IgzU0bH6s%2FWHxsb9Etkq3AP6c58VtpcgFG1hUBqTVuVdaJlJKB5182w%2FXhgkqvTOZGIFRqpV4dv1bXn3KDUz%2B3G9cnuQSII5wRAgtOWL7nqSG9YiV3kMfEH3Wa5hykr8b2Uj0eNvxOV7D%2F6PMIJ1ciCKNYUoY0LWehFyckXT3rMfKxtdYg99NEKVLueP7e0CDEDPTvjPwiZaR%2FlcUP6p%2FCQJnqdxauFlvqfCB3vdyImnyOX7xZRNEJS590JvjlSaYbRWZxJ29jPlVSxUXavKgKHNdoegzhR3AM9MR9ogq5qAC15BERA3Xz%2B%2FOvIhBfKlVk7JOj4qv9m%2FLF%2BOqSHohJ8MqZrhCrQ0V2aWxvzHGpaLvpYAvcBcvsHAcLsSib9XDeLqtLvVJ81RYrblrKoaH%2BfWBulnEeqjseifkhN2Ca1j%2FAqc990OJAJkqUardOzLdb8vipg2ZEqLtk%2FotJTFqyFencOxbCKd5KxhbhwR9VB8BsngzlBI8RU%2FnX7mqQ5AJ8YzXe4g5R12VrYGraetsg4JdCShdexOZUWTrI6Rh4U8EnWX4Hd3mF3oi1sBz%2Bg4cOLLXTwXXOY7lvm55DkQkSkUhYJ7Jn33uCBvLVFn0qJZrzSL%2B%2FHWmbm%2BZXDHgBGHLZTRR7B8kQ9xMV3KiDCyut%2FOBjqkAWwXfQidp%2B5wADZTn5sYjQyYDrULdMNyB4mLbjiyhfMe5b%2BdFM85nqEacxwAq5wwt%2B2CHT07oYToxVTM8vnTtyxV%2F5lhQrAwfXAf62Gsa3Jhcx%2Fr5lO%2BPv2ZCE0zForQpjzC9MMzdfPHQbjbplO4GRymHZ4jFyc9HW88ZRQ0tyofQvDK2fslPfER4%2BWzxtdtO3Oj%2BURe6MKpUNOydPq5c91wbhzj&X-Amz-Signature=55286de309b231e715d2f5de2547f35505f9db1766705593ca65f74e213093a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5BVZPBG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDy8LVOtKwxxoNwwzhQrLQKMvaUExybx6LytmazDzu2cQIhAMWWJzsxgZ7CaDLOCGEvoXSgengv74GiCdavS1g%2BXiwgKv8DCBoQABoMNjM3NDIzMTgzODA1IgwpmV04GrZPBhKAvu8q3ANuT6T9CEwkuQhA8D%2FZ8orNJw18oU8pZ5P9m1DyUBRwu6FgMQA6EGaHIvYzDDAtPPPz%2FdkJOL0yFCD%2FvWL8Tn1wnk9LmVSm3OwubHzgh7%2Bzatr24Xp4%2FmmpKVHGSfcISAJg01VO620xY%2B8HTKKAADsY1cm4Y6fU10cXQHFRvROTFFBnBRtxnYj5tuI5n30Dl1U4gIZHHwQNurxMkaZdacUh0KU5eD2LxpbjJza%2F%2BGw3aCpNO7dN3RC0gLPY0ekpPhNzNaNv%2ByXUvtQN%2Bhjv92Z5du6IZl82ELNLghJIk9ScBFyiDjzksMdWfE2IhjQhHezWt%2BB82QNYNTVUmEjyZJBOl2CnUPqa%2BY4g9Bl1imAjDF%2F8dnsWLOALyksB8I5vBySUmHByqG1%2BolIJun54exAhJutXLvAiJmmBEN4X2gDix7NrGKFSDJS%2Fr1OH9JwerDMH2znaMXe2piUNLKjFTPI1FPiUyGtiqSrRnb9%2BOVCGxQDfy7t%2BBwOTxPkmOtjVUuBIUggdpAK9EnCnsJrrlhdyF5Gr66s9spu9IZuVw7UJIxmvR%2FkuAHEVeIhhVbPwWJPiN1SfURzU3jiwAro5wbEa0MnnFEdriZWD36mEq1arvIzXKMH531p9Amr8GTCGud%2FOBjqkAeyGZbEp60iUPyGdWBN6%2BGwtLOMhLuI5bGRmeRLs8Br4%2BN4Z3OYNAn1KNQGnRzIymK738n5Rqa55UdX0vVAhQcSrvUHaVqil5Ox2uEhg9QXFbDTjp6oppB5jpmDewbEu5R72kA6JNqQ840O3xTWKpQU2DrBx0BhoP%2BWGWRystu6pC%2FNbKGdSKGaE6rrLK57S985niWqW1%2B2f89ibXwYXBkhuvrP4&X-Amz-Signature=72eab3557bbf5961aa1157aacd3c6e3b8a0334929743d025c95831c7f10f12fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5BVZPBG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDy8LVOtKwxxoNwwzhQrLQKMvaUExybx6LytmazDzu2cQIhAMWWJzsxgZ7CaDLOCGEvoXSgengv74GiCdavS1g%2BXiwgKv8DCBoQABoMNjM3NDIzMTgzODA1IgwpmV04GrZPBhKAvu8q3ANuT6T9CEwkuQhA8D%2FZ8orNJw18oU8pZ5P9m1DyUBRwu6FgMQA6EGaHIvYzDDAtPPPz%2FdkJOL0yFCD%2FvWL8Tn1wnk9LmVSm3OwubHzgh7%2Bzatr24Xp4%2FmmpKVHGSfcISAJg01VO620xY%2B8HTKKAADsY1cm4Y6fU10cXQHFRvROTFFBnBRtxnYj5tuI5n30Dl1U4gIZHHwQNurxMkaZdacUh0KU5eD2LxpbjJza%2F%2BGw3aCpNO7dN3RC0gLPY0ekpPhNzNaNv%2ByXUvtQN%2Bhjv92Z5du6IZl82ELNLghJIk9ScBFyiDjzksMdWfE2IhjQhHezWt%2BB82QNYNTVUmEjyZJBOl2CnUPqa%2BY4g9Bl1imAjDF%2F8dnsWLOALyksB8I5vBySUmHByqG1%2BolIJun54exAhJutXLvAiJmmBEN4X2gDix7NrGKFSDJS%2Fr1OH9JwerDMH2znaMXe2piUNLKjFTPI1FPiUyGtiqSrRnb9%2BOVCGxQDfy7t%2BBwOTxPkmOtjVUuBIUggdpAK9EnCnsJrrlhdyF5Gr66s9spu9IZuVw7UJIxmvR%2FkuAHEVeIhhVbPwWJPiN1SfURzU3jiwAro5wbEa0MnnFEdriZWD36mEq1arvIzXKMH531p9Amr8GTCGud%2FOBjqkAeyGZbEp60iUPyGdWBN6%2BGwtLOMhLuI5bGRmeRLs8Br4%2BN4Z3OYNAn1KNQGnRzIymK738n5Rqa55UdX0vVAhQcSrvUHaVqil5Ox2uEhg9QXFbDTjp6oppB5jpmDewbEu5R72kA6JNqQ840O3xTWKpQU2DrBx0BhoP%2BWGWRystu6pC%2FNbKGdSKGaE6rrLK57S985niWqW1%2B2f89ibXwYXBkhuvrP4&X-Amz-Signature=60e83cf0d79b5bba8f0f3246641a3ea45a29c823219588ee98627ef9c46a9dd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPTL7IGG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCC6PJOuyV4LN1jSctInd%2Bh0H7oVZ0slwVOGQUM1CrgGAIhAJ4g2CvR3A3OVQbejbj1uqKnuR482P%2FuRm3LL8BhrmMLKv8DCBoQABoMNjM3NDIzMTgzODA1IgxTDcluwVtG1LgmnAIq3APF4BeSuDjX1McQxMRh3oQmuZeJX4YGWEZf9kRg5H%2BdWmvkXhYI5y5cVs%2FrmkJtkHOFH9H18DjX3h%2BFsyeKEWbCHKUNj7hA%2FRGAWPKOdEg%2BIlpCaC7c%2FtmIWjugWKZ8Y3U6%2FByE%2FKIHJ0W23SS6w03kklmL6MpCYYevW8R%2Bg%2BRO0EBjH9ATdUqtMmXAUBW36YAUUTTYYBc1EtsvQkGlYXbGiAR9Sq1BbNd87ZMt990H7KZdXS4X%2BuSnZS2tJQaQpzRifg4LarDg8xhV6EtcxS5NM%2BQA44B54gwc%2BhqvaXRvcgchqcGk3mYLE0t0a2WLEY1DIhLDfLs0S5D8bBtLfDsbHqj2qfDWl37xXri1ExANvG7YbXV8c7iGiYGfEjS1NFjkw9LwK8OhkUwDVkuxkVG9RbB0y1UVrA6Pi6moZK4B1tO6Cd%2FukZJ2mn8SkgSnuR7U8AO%2FBu1G09sDF%2B9F92NSmkxaMprn05QEF9dutyDif%2FxhweQ7A%2BijoymGZOJtNLXLtTsVT7JEx9tI%2FLTCa6ROk3Qu%2F694c5DM3oS3yTEl5NX%2B5jPceD263dkCYmxdC%2BiUaL3BWcXkHVXsD3uXVC0jLHNDk0Gu4EW1YkqWXlZC%2B%2BINDH81A%2FOIrWYJ%2FzCZut%2FOBjqkAZQKBBgUYpaO3q75YFRtMHsIwFJ%2Btbz5TwGQWB43rNei9bwHvuVtTUhGOVspdhJs9SeChBcVfQUoyy2sIgUISttv9CGNiEelhgB82Zq9%2BMUoAXc1W5XPoXxdBMRoKM32zTSbsqXqx3VQa1KQbcE6jWEzRQC1FAPP%2BSVoQWaEIyc7rRp7OG1N1O5%2BMSHA46gJ8WrRuPM1aMycVSeiM6dNK%2FsLhKUn&X-Amz-Signature=e7e62691331c56696c316c167067d793e1af57d35b5db32ece0ce2917e091e47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZP3OFOG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCEgYSqL1u57QFttr6BiN8DKw8iR5xTGARMqdhxBcSccwIgVH1ZydDmOzJwIJKJcxFsMJE2O2%2F4drcSi0HZ5N55QzUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDItx8AWDgr45I7J9SSrcA1P%2B7k5aGOB2w7QGYdd6%2BlD2Ws9vgK63EUqQXV8%2F8QH0yr8vjnPyzPZ0y1Q9PB%2BRXzpjHhqzMvZsPBtPHjd0%2FEpwAzps%2Bw1tQ3AVrPtgUgwvQRE4zAOl2%2FJtTOtfaUDhCbR0RFde%2FxVLda%2FU1L1wZhPL%2FAsi9dMfQnAsRuIjBqa%2F7OP60qMJYM1hnM18eW3aENoiaWGxbKyMkPi8qNzzIZQhvnoMGmffLZQrecj0r7DCa%2FJKBt%2BkRG57TPgw2L0e8CLG%2BqJio9HqKpu2UGPez3P%2BoTAMtiqfnqp%2FlMACUG%2BP%2BG4iG%2BN3hhCYl6B36lWoDu7Vvy3jPp6XSCLyzlOhlTNsYegrkBwhDeo6eAwW19kbjWtmnfi6foCsGlKzeD6B5liWoXIcHGOSD5s1gL6G9vz6RTFA6WW6MBy6oS3BwUJMxlDFnxy74JTI6UJG%2FJ8VI0oRIcXpDPCV5uCalhUQQjU4UP1mZEzGN0YEDF7TON%2B3KgMzMiCR3H5WPvR%2BBpSyFf5GWyM2bQ8HWwDQQDkfGJyIR84YV0OYlAMfcxqh34SC5dZoai%2FCDChEsN417zl1oDAOc%2Fv56979QZKt6IsdLPutoH1pbdDQX%2B21Q8NGiN6chSYILEkrjDuHkMucMKC7384GOqUBKH6WznVBbUnBn3v6UzpANRIrSTtkwCce1WICWn6vPMjBCS%2FVdDrwoT2wkR%2FMLY01h4J5BlI8E%2FBkRFtNDLZIxg3DfkrTyF5g6kwQsnRrj46HUoJwujzQS4WCGHsMZPteKDenT0GFSx2pwZD1%2BdH3IRUCgkr8MX7wGR17bdJFJObvh19u1GGImlGHShBe1VaUoKyRUN4bcGpObstOsYQGvhJlHG%2Bj&X-Amz-Signature=469ac32ad4abb75467323ce8bcc8ccdc5bc41ec4b9ee355198d8d3ebbc0fa2a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZP3OFOG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCEgYSqL1u57QFttr6BiN8DKw8iR5xTGARMqdhxBcSccwIgVH1ZydDmOzJwIJKJcxFsMJE2O2%2F4drcSi0HZ5N55QzUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDItx8AWDgr45I7J9SSrcA1P%2B7k5aGOB2w7QGYdd6%2BlD2Ws9vgK63EUqQXV8%2F8QH0yr8vjnPyzPZ0y1Q9PB%2BRXzpjHhqzMvZsPBtPHjd0%2FEpwAzps%2Bw1tQ3AVrPtgUgwvQRE4zAOl2%2FJtTOtfaUDhCbR0RFde%2FxVLda%2FU1L1wZhPL%2FAsi9dMfQnAsRuIjBqa%2F7OP60qMJYM1hnM18eW3aENoiaWGxbKyMkPi8qNzzIZQhvnoMGmffLZQrecj0r7DCa%2FJKBt%2BkRG57TPgw2L0e8CLG%2BqJio9HqKpu2UGPez3P%2BoTAMtiqfnqp%2FlMACUG%2BP%2BG4iG%2BN3hhCYl6B36lWoDu7Vvy3jPp6XSCLyzlOhlTNsYegrkBwhDeo6eAwW19kbjWtmnfi6foCsGlKzeD6B5liWoXIcHGOSD5s1gL6G9vz6RTFA6WW6MBy6oS3BwUJMxlDFnxy74JTI6UJG%2FJ8VI0oRIcXpDPCV5uCalhUQQjU4UP1mZEzGN0YEDF7TON%2B3KgMzMiCR3H5WPvR%2BBpSyFf5GWyM2bQ8HWwDQQDkfGJyIR84YV0OYlAMfcxqh34SC5dZoai%2FCDChEsN417zl1oDAOc%2Fv56979QZKt6IsdLPutoH1pbdDQX%2B21Q8NGiN6chSYILEkrjDuHkMucMKC7384GOqUBKH6WznVBbUnBn3v6UzpANRIrSTtkwCce1WICWn6vPMjBCS%2FVdDrwoT2wkR%2FMLY01h4J5BlI8E%2FBkRFtNDLZIxg3DfkrTyF5g6kwQsnRrj46HUoJwujzQS4WCGHsMZPteKDenT0GFSx2pwZD1%2BdH3IRUCgkr8MX7wGR17bdJFJObvh19u1GGImlGHShBe1VaUoKyRUN4bcGpObstOsYQGvhJlHG%2Bj&X-Amz-Signature=469ac32ad4abb75467323ce8bcc8ccdc5bc41ec4b9ee355198d8d3ebbc0fa2a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNUEU5JA%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T184146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCNhQVIz4k9kjDzPkWU19QeXMfWT5kz14nrTNklR2f8MwIhAOxTHjHGgRxGVtIs14axFBMQoNTCBeCup5Nx0XSffMGTKv8DCBoQABoMNjM3NDIzMTgzODA1Igzt8FTQMjqiqUuHljMq3AMd484XLoozv6c8P2GJbnOU13KOuGHpTffAK6MPtKza2qZYBvmW4nFOd3bMIuHJXlpM0oUfvAhCs7fraFHRy1ZU4AuJQSkPFX7njjcUXbtjEc0f3Xbpuseh%2BwVF%2F11t%2FcjYKYO78PapO3Gsi2ne%2Bpu1jNVJiL205xNV5eVsiCvCvEjNoItu0vYjTb09f2m5ZTykNPscbVl5nqvTUIioyMwMcr9T%2FSEhfw6g%2B4XqqI1QH5orRSFP7QK1kI%2BnACLEJPcc1Es4iU%2BlAdP58NTQg%2FejRBAd2%2Bbxg9iuMkmyTNfk%2BqYi8dtyP5qOKp9%2BwEMFAd7dZh7twtSOIgkdsrJThhbOTQAtSYnSFc2pIDl%2BycVZAEJXEs7%2BwLuHl6mXucvHFJGFZtxv9LZJos3DrOoyDIrFCWPF2nkmb01GHbt55njIl0s%2BupzzE5eE4pxoIF5bXnnRK%2B8I4RlZfxanyX1nzeP%2B8gMkHNnbbxh62DnMcTu9qL9jMNf7cmpN3nLTcsH8tOsv0iNplBMy6ovtoeUD51TelNTFaEVpsWV9tG4n31W4WhqNZlnpPFWezMrubX6q9qHs87QOwnCF6F3EkF3MylrvOGhtzE3J7LxJwDqq%2Bjfk9u%2Br6iInQOTPLwODZTDfut%2FOBjqkASkrhRq9IK%2FwNXRwLROxEsh%2BVsvYyBErpywdD4B8NQDRNlY5SZpBxc%2BV%2B7e89V75H0SOourOnCqOy%2F60b0srxRZm%2F5IA%2FlzgKmuEwAPfPrI2zBITghuhoLLv8jT5hPRtZR7Rh72qLRx%2B3nOcdVQ%2BdFI4JpHABvh2d8NsvueIGSeDeQjKS5FxS0X0dWDYf8omt8sy5DrBr%2BqvOLHn1GJjDUy4pPk9&X-Amz-Signature=5f4809c3c986c5904cabff8c9637a22ebb5bbdc45255957621370bf00f8cbe35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

