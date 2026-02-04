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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY4YBU7Q%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCkt0D5g8RHSEDcYM40LXMcFHZ7UVpkJFuH1pybQ2RMUgIhALL4c5oBKakCBoM5yTcx%2Fzc%2B%2BKg74TDtS%2BNHimY5RUK6Kv8DCBMQABoMNjM3NDIzMTgzODA1Igx0OFhJYOvPRoy%2FGfQq3ANJOpnarCBpiWQo4%2B0B%2F4m%2BF6d3QE%2BjiT20ufZ0Dp6T8ep73BHsiaUHZFPLNgTNSfm6VIaRvAF4%2BoTPkcK0RhrFhSlTSq32pYSCSNXUqi%2BlvXx7YCHoAKcN8FLiuSIHnL6a3h98J24XdNv4FqwnQroowIIsrPVIwoa2dcGgNe%2BwPOImA7bwrYPEvgMQTSvKa5DuvuxgO5CSQVZLIQNeyt9XJnf73JmlJwReYKm35u8dZ1q1x%2BhiYAf9bn4Lrb0GW1e3%2FWd3ZhlDj5fEgmDkavX3tWS9Qk4703TxnjdKGDe%2FtCJd5PIIRjESLSNiS30e0NHXJLL3UvChwZ%2FGp1zhj5AHBM0BCoMintW8C%2F4MGK%2BMFTNde9FjX0ODdM3UG3nwa17loMPIv0OVzlFq5BIPIKJC%2BQwJaROI9kBxtWQwWdfwlsMJr62u1pnFw0vuwUtc89vGKT2rLV4HIxp8SGDree138N0zNE9DpVeGgUnk8FjlG2XmI4qViJQdWyQ3sBImXhC56SiYye7Shfp3CxWny%2FS74HZpKIh3tWht98ww9Tg4p%2FJLpr6mEyxS2da9Bfii%2BkiYBgeqggtUycFtBgQNpcXNghWcxn3ZPsJ9t61g7OYvl6M1tliWoba%2FnGuDOTCduYzMBjqkAZvHxp2Un26u%2Fi7MebyBswfzoxTe0lerblpaRWXU8eKbQm2rOcrvp0JYovUmEK62mcrIlOeMwdIlTcNwhewMkFbibnmE%2BW3%2FJaid7HId4PLcfXJZPLzNq%2FYZZMP6MBbJm4wt2t1tzPUb9q8%2BvwK7purpVITO%2F1zqk7q9zLKQ4ZCyoicFAmNU%2F3pL0SieldzGiSeQ%2BPE99PjYorZM3%2F%2By95gu5S%2Bn&X-Amz-Signature=daacd1bbd452f9d055ee78e219167e458648ca46ba00b9cdc726b6a2158e94ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY4YBU7Q%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCkt0D5g8RHSEDcYM40LXMcFHZ7UVpkJFuH1pybQ2RMUgIhALL4c5oBKakCBoM5yTcx%2Fzc%2B%2BKg74TDtS%2BNHimY5RUK6Kv8DCBMQABoMNjM3NDIzMTgzODA1Igx0OFhJYOvPRoy%2FGfQq3ANJOpnarCBpiWQo4%2B0B%2F4m%2BF6d3QE%2BjiT20ufZ0Dp6T8ep73BHsiaUHZFPLNgTNSfm6VIaRvAF4%2BoTPkcK0RhrFhSlTSq32pYSCSNXUqi%2BlvXx7YCHoAKcN8FLiuSIHnL6a3h98J24XdNv4FqwnQroowIIsrPVIwoa2dcGgNe%2BwPOImA7bwrYPEvgMQTSvKa5DuvuxgO5CSQVZLIQNeyt9XJnf73JmlJwReYKm35u8dZ1q1x%2BhiYAf9bn4Lrb0GW1e3%2FWd3ZhlDj5fEgmDkavX3tWS9Qk4703TxnjdKGDe%2FtCJd5PIIRjESLSNiS30e0NHXJLL3UvChwZ%2FGp1zhj5AHBM0BCoMintW8C%2F4MGK%2BMFTNde9FjX0ODdM3UG3nwa17loMPIv0OVzlFq5BIPIKJC%2BQwJaROI9kBxtWQwWdfwlsMJr62u1pnFw0vuwUtc89vGKT2rLV4HIxp8SGDree138N0zNE9DpVeGgUnk8FjlG2XmI4qViJQdWyQ3sBImXhC56SiYye7Shfp3CxWny%2FS74HZpKIh3tWht98ww9Tg4p%2FJLpr6mEyxS2da9Bfii%2BkiYBgeqggtUycFtBgQNpcXNghWcxn3ZPsJ9t61g7OYvl6M1tliWoba%2FnGuDOTCduYzMBjqkAZvHxp2Un26u%2Fi7MebyBswfzoxTe0lerblpaRWXU8eKbQm2rOcrvp0JYovUmEK62mcrIlOeMwdIlTcNwhewMkFbibnmE%2BW3%2FJaid7HId4PLcfXJZPLzNq%2FYZZMP6MBbJm4wt2t1tzPUb9q8%2BvwK7purpVITO%2F1zqk7q9zLKQ4ZCyoicFAmNU%2F3pL0SieldzGiSeQ%2BPE99PjYorZM3%2F%2By95gu5S%2Bn&X-Amz-Signature=daacd1bbd452f9d055ee78e219167e458648ca46ba00b9cdc726b6a2158e94ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFSXCCMR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD5BY8N4I0HRe%2FZK1licrUfaKbuvqnt1bIiw0%2B1CBfHEwIhAP67yTQBjX0TPZdyvGi%2F82GpoA5f5tl6KER96fn4iyO7Kv8DCBMQABoMNjM3NDIzMTgzODA1IgxAqEmNnwcfnmtcW90q3AMousJAEB1oiuUp65hGQjMzmJOBQFdxjYH%2FSYUW5A91MWMcfViA5JtB02v%2FLsw91VHMq9U%2FYYGGEVUUqHhbxkS84K0zPw%2BB1%2FvIOfXdD2FQUZAS23ksJkuDPfzveZxYSKtO2RE9VZHJza6f94h%2Fmc2aoAFRV36nqwxtWUBUlB7QADb6AS86kvs8Il0YT6z%2FZuw543IuoKWU6jE61KVW4f6Yfcxym17GZlX1obPCaA31d%2FJwTZJwtGCsDQCTu8dGyr49h4Gv8Epnd8qPlRNJvV8ZDfRW4pmxXPCDw6nwJ9kVYcYW3avusjGE%2BKW4oG1S2D%2BobpKs10jeHBCX%2FjUK3fhPQcWMER3xDSWGM4iR5f%2Fr2%2F3Zj8RySrp7pSCCvPdOYTy07bLwQPfiUF1cxLKQr%2BZdjlrsrhcbDj%2FXMV5uapv%2Bw%2BYY032qUxZPJ6H6fA0fVNvSj%2B1BgqCYxBQe6kMBHbJ6XjAHG1ze%2Bt0EFPzqaRi6aMuVEQh4VutCx60MPR8N5Ck1f6TESaUbgFMTuwnyPiupoGOhkTPm2W0y3rskxlqbHI6rKiijhZmhhuf5se7NZNtFipivHB4Cc%2FPa%2BrNkNhX6XpKGpWYqwd%2FasV%2Fa%2FA12dYj3XsQ2N9SU0M5UXzC7uIzMBjqkAefk13FVIJGtcqs6OiHGnVelcqDVUPfFCt4ExaRhNZo2jxZIdOCwUaDlwz73Gg%2FLi4gSAbmOsFAxlujfj%2BMG7suEap%2FyKmZsVdfjs0ATzbq6PcPp6eFSg3ONRy8x%2Fj68bJAuvXJKpzayyngZEwW5EGnh5djHBMd8I8GqsJe8xlH%2FL7%2FsGxyQU6eryJgr%2BshwMET2%2Bg8p9GE6xJsDqkMqzwW%2FLoq4&X-Amz-Signature=743d1666f308b6f0341dac0a363f018599e63d3f238e3bb94d44003da47d96cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NZV3QYR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDthlTTI7ApXvrrMoVEkJ7xkiGuYoKnYZ%2F%2FkXS6IZ9HRQIgBQFaEbII873%2BYeNhtpQdQhlPg1vrW5vR%2BrpZrNjIG9Eq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAyFfhprrTnNZRRIkCrcA2qEJcMn8%2BUYtyKm%2BUmD%2B3G0TAqFdaYC6FGJx12mdrUXkkuZmJu3CYurd741EHbcKsaV3qwpcwOUQs0H%2BS4PGKyoUS5%2BFG0C4geYBQVy37ti1Z1X9TqJGd3sqS9NwpVk6ERAx3beMgxgEhsjgX%2BeZW5gNSv9YKL5NehQApFopT2ow83wJiVv%2FYKitSSUFZCz15UNY4lVdiTRPwrvZm4u4uA7ki8SM0Xal0Xlsd81Rhq1Qw2oH08a01KYGeaMOiaZwZ9T5QZxw4aJ21ZZ3VCYfcRqPaHqG2Jb25pwFMuQiYdfSTUbjPyVFR5%2FnCU0pyJWi3CLBvRBPtV%2FJoN%2BCxLLGny9yLcmG72xy49Hmg60gpgXi%2FKtsyeyZ0qaryyC0izeX5z%2BxH1oxiBNG%2BrnLgjWdyI%2Bq3zgFL9dSU9QA7bpCA5okDDIw0RTPIajQygnnnbQ3fZpdW2eIh6%2BVUuJwwsfXehgIJ0RQUp36aLH%2F9jXSaEaL3dbUGN2SnwchspguXbs7udP8xowLT4bLKrXZjjuE4y91w3lBmAfWNut6UAu6aoBLC4yn63HtGWpxf2nfl83VjGb5hr8ny7H%2BKVGyKg3Hh3E9qzlJrw4pkq6z5uexPY7ZgCoJwWS%2B7hR9a%2FOMPu4jMwGOqUBL1iihnEdUN7ZN90UP1EcfesApkmGML0EySVIWVIHmJymifiK%2FwxYeG0QO4CH%2FFLjXGObwh2nWNQ8wFkW24mVrWGqQcPaWf2uNFUciUzBnUyZm0u4kxrAST7eRx99qFTZsEnj7b9k20%2FDQqPzSGnnv1Ad9oe22i5syeaLje5XZQl%2BOLztwpJoUFMMwcB%2BTbWoC7YRVa%2F7LH6MBuJe91vgCoCG0LLE&X-Amz-Signature=85a0a56f512fae30d927bfc971f245b698cca43d88009254298ef42188c80b43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NZV3QYR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDthlTTI7ApXvrrMoVEkJ7xkiGuYoKnYZ%2F%2FkXS6IZ9HRQIgBQFaEbII873%2BYeNhtpQdQhlPg1vrW5vR%2BrpZrNjIG9Eq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAyFfhprrTnNZRRIkCrcA2qEJcMn8%2BUYtyKm%2BUmD%2B3G0TAqFdaYC6FGJx12mdrUXkkuZmJu3CYurd741EHbcKsaV3qwpcwOUQs0H%2BS4PGKyoUS5%2BFG0C4geYBQVy37ti1Z1X9TqJGd3sqS9NwpVk6ERAx3beMgxgEhsjgX%2BeZW5gNSv9YKL5NehQApFopT2ow83wJiVv%2FYKitSSUFZCz15UNY4lVdiTRPwrvZm4u4uA7ki8SM0Xal0Xlsd81Rhq1Qw2oH08a01KYGeaMOiaZwZ9T5QZxw4aJ21ZZ3VCYfcRqPaHqG2Jb25pwFMuQiYdfSTUbjPyVFR5%2FnCU0pyJWi3CLBvRBPtV%2FJoN%2BCxLLGny9yLcmG72xy49Hmg60gpgXi%2FKtsyeyZ0qaryyC0izeX5z%2BxH1oxiBNG%2BrnLgjWdyI%2Bq3zgFL9dSU9QA7bpCA5okDDIw0RTPIajQygnnnbQ3fZpdW2eIh6%2BVUuJwwsfXehgIJ0RQUp36aLH%2F9jXSaEaL3dbUGN2SnwchspguXbs7udP8xowLT4bLKrXZjjuE4y91w3lBmAfWNut6UAu6aoBLC4yn63HtGWpxf2nfl83VjGb5hr8ny7H%2BKVGyKg3Hh3E9qzlJrw4pkq6z5uexPY7ZgCoJwWS%2B7hR9a%2FOMPu4jMwGOqUBL1iihnEdUN7ZN90UP1EcfesApkmGML0EySVIWVIHmJymifiK%2FwxYeG0QO4CH%2FFLjXGObwh2nWNQ8wFkW24mVrWGqQcPaWf2uNFUciUzBnUyZm0u4kxrAST7eRx99qFTZsEnj7b9k20%2FDQqPzSGnnv1Ad9oe22i5syeaLje5XZQl%2BOLztwpJoUFMMwcB%2BTbWoC7YRVa%2F7LH6MBuJe91vgCoCG0LLE&X-Amz-Signature=6e6afe2c3e796f8eea1faa6d5f18e0316fc19726312a119a959e4163c9e63613&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644VSFY63%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCeeJQSyq3YV2oGRE79zjmnQHc%2Fxfwv1KX5sFEwhvfzbgIgEg0p95rqz6pI8EkbrxL0BgVbzMWNMsE%2FCt0FLOdc%2FJ8q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDNEr0uuqnRvrz4EbfyrcA04e6LzD%2FgnH0PswJB7ev38PpojDaReVD8VnMqlDWTZdA7PlacgGgl9HO9ZWDdpv3hmqKgZ9ux%2FbLtMZ38IiDx2Lav64vn%2BuHF2zIRgjh4f1%2BUMqTRTz3zws2SpPnXkJNAisQVo0W1rAmls7cagjn3yY8CBC3eoQeRDZai9093ny9xLUDX1M6VO7QZgLcwoM58DjUFx4HXvGor%2Bva%2BGOkEDE0V5Safv2g0TaVn4MzKvLfi6jai6v8dTa7GHoZvkwe1m9eLkfhseQKY1JRfk7IwGA%2B8cMP7Ec6P8rIb0wMIkCrH6EBF8MzaCPHqIQvo45NAAW3GfIutbpeWpLBu%2BwTGa8rBJ39qHS5Ouv0lDA2xBJ9aAbpSFp1stTy8pV3uSA%2FEh4A17xxMoccYJC3S2p1lFXGaAN28EOZXjdkjN5ky229YEAWzcRaEk%2FY4GJ70f48NFj4w1cyeJ%2BUUJk%2BgHJ%2BoTbwVT3zMKCwkQ3DVvRvtdSMaWnQh%2FLQXNj6tKTKfFXrx%2FBE0zzAm2B11RsnTUAUPo6binjMiMrMSKoR0LCH49Ln5lihMBE8k1VgaY%2BJTQKcmiP4cy33vgFLPEQTMCo6WKqUE1Cz3%2FaQkTjuTfxeOVelAwF3oU1ZDW5T709MJS4jMwGOqUBOJEvxaIr8mqyucwDff5zTLzrNjKEsemHZTeIt4Dh%2FFIJoKY9JODRp6lVJy1NJ8xMgwW%2BS3IhLNnPgMRZPYtr%2BTOgT52qxKb3z3MV3eyXFqlcTq8UWdG5XMrq4FU68606vnvWjp0OzAHm1lkhv6ymOTsjWujGuVug6U09wG69I2kFAtSYb0j8fwt8hRJS1UYqq0BTrWkCTe8keHTxcjZygSykvcyo&X-Amz-Signature=afaa5283e5aba5f48f6d7641b572ffad25a9219aece46fbbd4dfa8a46eb04d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3WGIPOL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCqdny%2B7fWJ4ni4dWVxNb%2Bpb0gHaB6c41aK%2B9gShjz5iQIgIDJEf%2B9qfQ%2FBf4dSRAdvTNX3jmATm%2FPASGnD2r4%2B%2F%2FYq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDKbSNaubNA58AmlcbircA7gsSxJaJtTfMpBlXD1BOg8QijYmtLK9A3cDZbC0fAA1cX2qROFPlhaRrEOqhuuEipe%2BD5REiN148paqvQcwrJPNy2jvjPyM74daP6%2Fai4waYz3fQIShB8LLmP%2FnVrTLfBl%2B6BQTPfl1sprFFVlZMr3MxzhSUrBimNppI7tK8kqTFVV2c7PMMGeQQlQDpZ5s2YIwIwi5wKKWcmo5pFJDh3V%2F2fyusyJEXSbO%2BfRSubO2%2FxetYBoNZx9Zm%2BQUAlmsNDIxU0JCd33CoOXT2WTH2%2BZ4KIOLf4LqKSfLV7HhhM2uCH1uVuu5TBWtiWkqJxpjd4puAnMe8dIJWv0KzMD7xOxEJR5tZips%2FoKIb9j4gKg8RBWCdl2TV%2FBHxx754fBuPAiG6FyON%2BSy4Fd30GszX%2FotNHiHCSuEhaLMnUytbX%2Fw587POlBAeDERN9y%2BrQJNp2zvylbAyf6EG8JD9feOwFs%2BH%2BrrVOEG9DcM70P3wZ1l%2BdetuEOqrGH99V8uOzZHlS4QTANSuxY%2BwCKgdT07oZgcqyOIUMQZLLe7kz3RqrYKoEHnh4MMQvLshvf%2BsolozmL7sirHo9Iq%2Fsi8bGrR7VQGa75pFyG7AhTWmWdM%2BG%2B3FSKlp%2FgLIGh88OvoMN24jMwGOqUB4TdVyrv5kouibCP0QcetMx%2FXFhAEaZb7ReV%2B0HDZTq1cE%2Fyg9z%2BprMzAJgSQWE5QFSemxMILFRsINB%2B0yV%2FDggTCj55f%2BDLmZ3kuuwuRRRZPgV3%2FG1oVGEt%2BxiRbOVSjsa8HLCxzjo1q%2FPjzNCQJCboZn2c3UCLzirwUew3EBIjjFU1xx95QcJI06q81nBBK3nl%2FwcBQdc44j7FwJxChqUYWIvO7&X-Amz-Signature=25acbe1c7a258a1d1a657ed582db1ae8f7b4a04c3d20923c65a5c6a33d1cc8bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQWVLCSP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIERZtaICcavKGtCJQ2pBoU84wMS2O4g4S%2BHwIwaoR6lgAiBx%2BdQO%2FdwzMTzvG8MQNifvlPlkFmuJc7pdnIbIJN5hCSr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIM8e1hkqcMV8I4zGTHKtwDnyNx1oVIq6uxsGdEOSCI6XEpJLvJ%2B%2BEFSZiKclvUub4%2F2oceQYzLB2hE2sR39EW6kcHIxP%2F2y5QcxZrlolXtx4%2FtSFaDbl753PYe0wM5jaNohagEWvyLA5%2BfP8XV8qzvlJEhz6eii4pvhtZr6M2WmXUKJjReaVYGnC4GDN624RdLwDiuPEetfB1KkmoYPTKLouTpcQ8AwUmkyHecfKJ7xhBzfShh8rOrQo%2FBQaEZLomt1opahaJkmvX%2FQULZmDRnmccVt52v1K9ojxFwW6wUDQL6NuzCnrScY7zr36Xr3WqGDhdaKLi6I%2BAs2BfgFpuyg8p8ZHNfaIgQl6oat0qX2ZtKp8C%2FdIB8TyzJkSVCdCYend05osIKQmKgTs3RD4jVRPtTtlHGvtdlywXybPM228Tg0OQdO4MxwD%2FQ261YzLOS%2FwVVDbBZcED6tVlJs4l2Uha0WnGfsdKvpMSo%2FkZvlV1Qrz29yJKQElumpZrFn%2BfBtd0yI9KG%2FR9Tn1Q1GTIj7ltnbZ77NHk0kjNlnYMwQEbnbx6JtSTZUuNpyGu%2FMewo62KSc9sR7jFfINJNaa6i7KTeX6vM1FI3iN4Co3PCGKxsUI4jgcK%2FWgfWs8WwfBpPZr9iWuc1QIFSmisw%2FriMzAY6pgEdatl1TyaSndi4gYWw%2Fp%2FdfjY88TDfMtm4Q3zJ%2FzNzj%2Bi3alKVhrDFArmfkXwn95BUVEHbKvbBpqgVKlde9I3PlrFEPJkw%2FV25XGIOnDAHLunz7J8VmHPM3leRFho6AfoBNZnj3LOa2F1cgnFW%2FAgBZ5jBwceVW7Lt2d1zwQ6NaokYf8kSqJEhaRbfEvQ26bMdxArsR5IO0vjthdeVNLYeR9m8%2Bj9g&X-Amz-Signature=9092052b51defe8fe575a83f43874e221854bce92ed245c16e97a359c7735e8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B2ENVPD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIBfM86UilXbPjJVMVLRQMKTWGjh%2Fxh%2Bb2VC3slbJD9w%2BAiEA4j7EIstsoK0jnPPBHQvj0CLmMxGiNuyDbXjYvwIMyDQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDCPo7puogV7vwdV0FircA2jkfZHXOiHW0bhnqnfSxubHcDCrPcjb5nu3UsF9baNqhZtzO8sIUtraOjl8ddiY1iQ0AyUQs%2BSJaajOltp6Se8%2BNsNPy%2Foty3r4GudWKup1mK%2Bd%2Bp0kWY04N9Ruv%2F0AGD0kHRwT1cE9NzV26luWgmDENJCWBbk0WmJSuhIEG5r9%2BerhDxbMB%2Fi0838wLGvKBbrYv8Q8Ul1Rxm0UURhDMLXS%2B7EoIrGY1mnJ3oHFkcLutwyYpHrOZixaoN9QS9x7SguFDPZ%2BjDo%2BDtR%2F%2Bq2iDyh%2Fqthcn39Qp%2BjYXs8nWzZdNKet7%2BcgJIojAP9NRFGqHVs%2BIeFgDZph9tQ%2BQPTydkVk9%2Fe0IvmeemZwyHVUIjcYiJ%2BojBP4StobDs48u62GcdRLTDTyn2AyM%2FgddRUeCEOzQo34OGduS94Hc%2Fr%2FfYEUk5JefyVwjzs2yPbdkIFCtiK%2BPkoIYMAGz14w44WE1AyvMnfm9lzDfWf4wlm3BQQG%2BXELoXRI%2FxEXnlwQr%2BAiavCe138ai5AQZk7VFB3y1ZC7jB4JXWxVY7UjToCUcZ2TeM%2FrwmbKF42laqfEtVlF8jEwELgNi4WIPQZ1pOqWha12g%2FOH5Csic8ukwK1sX1zms7LVsmotI%2BRBraEaMO24jMwGOqUBr8S%2BvRAr4QGBkHWrTKIxCEhel5W6vbUdGvtVfmOmHNvlc7jzl8L3nMNCx7nYpAlaQc6Ydd34NACYmZOkvh%2BBtTxrL05%2BHehAoFZmDCPxRS14hj0KiTWRnDWbGBbnwRhYNW8yNYJzp4W9F8hZ3aMp1aRcAd8p%2Bswv%2BP0NMIRiiWhBmkIrpxY3HfUkUGNLIBGYMReDAl5JDYW7DKs0e%2FFKcoR8Y27L&X-Amz-Signature=f1fc3e6e1be8b07bfab0f2ca3b60afdad5f66c01eaaaff2df52bb21f66292f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B2ENVPD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIBfM86UilXbPjJVMVLRQMKTWGjh%2Fxh%2Bb2VC3slbJD9w%2BAiEA4j7EIstsoK0jnPPBHQvj0CLmMxGiNuyDbXjYvwIMyDQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDCPo7puogV7vwdV0FircA2jkfZHXOiHW0bhnqnfSxubHcDCrPcjb5nu3UsF9baNqhZtzO8sIUtraOjl8ddiY1iQ0AyUQs%2BSJaajOltp6Se8%2BNsNPy%2Foty3r4GudWKup1mK%2Bd%2Bp0kWY04N9Ruv%2F0AGD0kHRwT1cE9NzV26luWgmDENJCWBbk0WmJSuhIEG5r9%2BerhDxbMB%2Fi0838wLGvKBbrYv8Q8Ul1Rxm0UURhDMLXS%2B7EoIrGY1mnJ3oHFkcLutwyYpHrOZixaoN9QS9x7SguFDPZ%2BjDo%2BDtR%2F%2Bq2iDyh%2Fqthcn39Qp%2BjYXs8nWzZdNKet7%2BcgJIojAP9NRFGqHVs%2BIeFgDZph9tQ%2BQPTydkVk9%2Fe0IvmeemZwyHVUIjcYiJ%2BojBP4StobDs48u62GcdRLTDTyn2AyM%2FgddRUeCEOzQo34OGduS94Hc%2Fr%2FfYEUk5JefyVwjzs2yPbdkIFCtiK%2BPkoIYMAGz14w44WE1AyvMnfm9lzDfWf4wlm3BQQG%2BXELoXRI%2FxEXnlwQr%2BAiavCe138ai5AQZk7VFB3y1ZC7jB4JXWxVY7UjToCUcZ2TeM%2FrwmbKF42laqfEtVlF8jEwELgNi4WIPQZ1pOqWha12g%2FOH5Csic8ukwK1sX1zms7LVsmotI%2BRBraEaMO24jMwGOqUBr8S%2BvRAr4QGBkHWrTKIxCEhel5W6vbUdGvtVfmOmHNvlc7jzl8L3nMNCx7nYpAlaQc6Ydd34NACYmZOkvh%2BBtTxrL05%2BHehAoFZmDCPxRS14hj0KiTWRnDWbGBbnwRhYNW8yNYJzp4W9F8hZ3aMp1aRcAd8p%2Bswv%2BP0NMIRiiWhBmkIrpxY3HfUkUGNLIBGYMReDAl5JDYW7DKs0e%2FFKcoR8Y27L&X-Amz-Signature=ccc3f1da7545cc94dae0c0d4a76e30a62d394d08a5552a6c10466b1119257225&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPGVL5YM%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAVi5S4cdcXpRwNcVJjYB31tNIZqh7rh6EARy2dw7XtpAiEAvFCJbOSPF1oLon3C7KcMlNetzk28bFMROq0oyMgQl48q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAUlahuHkXnWWKjuRSrcA%2FF5YIsLPIlvrF1q3I%2BsQq1mFIoQgBiAboJmDGQqLHWAFeE%2B6Sv52eMCGI%2F2%2BO9%2BmU3i6QrLexAAj0yv0GBio3rtaA6MLJWHW1X2Ons5YbglAJntuhHB98J6EAuyaZHjKmxsg8m%2FVvv%2FnNdm4betyXbwTvcz7TdcZzgMHsF11vCAYP5rerGN2%2B4V6t5VmW%2BMHTmbYBq66%2BqYGLiX0yEhrKi%2B%2BVkaENmB5nLLRt2qdOrzoVS3%2Fj%2Fm2HIzztUxBmUqRePFW%2Bwok%2FBHz%2B3EI8lXgP6endqAle1DXr9FbFEyY7J3sV6rAwUvkKMDp82Rm%2BEVlTQgGkJA1K9pol1ZHetcii%2FU1KOHOA2Ffg738skzL5wL%2FbC1pkO70pEkOzraq6h3arbCL3ui%2FPl7ifW0kLNnw7xkqY0gJTJcVWcvYzZiY18E7G19uo%2Bh2gEqftT7MyZ1xMiirZTqwK62XhDK3zw8GEP4c9QCqptIqvBjizGap5DV%2B35UjtGnf%2BGZOYTZfDCi2GScIGGNbJAlTQFzjjPfmImZycMs49YPq88xYkDwXW7XHl32%2BGKcfsQkJuPpaH9qvaXRcSTjgtzHWX2jdHhpwme27ZcSlzgzc86lwC9dwiCPN%2BggZ0gbpvnlyJ42MMS3jMwGOqUB4xxcKm%2FmWwPJWB8MjqJNJDKVUmhnDOY1k2%2F58WRdmPbgfdqpITtyy8SNnjNjsUhh42nvaac8CsBjXqg0a3acFPT7aJlueSf2ZmdZwmtNL8mn9BJ6NC0MxPhw%2F9LkHqClCk1OqtZJs5NAFtoAo8b%2BopFPMunEW44GAPO0cu7mcTNS6kpqC3xb%2FV%2BAzeHjdExwsvSvMbmhJ560TKGiXPN%2FSKvtvXvd&X-Amz-Signature=9493c4ee0e06d63952f9ed98a23f854cf78c7b78e64b1cecc60294c004765cc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWRFKDLH%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIB%2FQBe%2BOC0c7%2FiiVaQcBEIEGU9yt1TFNhUwr51a8DkmwAiA%2FGtyankwUvvMP%2FoXk0zuxLekDB8iIWQuHyEu6rEztAir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMKWnLr5MZoyJdfkG5KtwDr4z%2BzobTHPuEq%2FqiwvhDx12Wdu5hj55WakSsQ0oJT9u%2FzXSFVRSX%2B0tc9X%2B1cB9RuirBQdbNA5UubMlKwHNy8lO3bKD2OFQqSzhQQaQ2Mc55maU%2FT1lFUuCcC9Qyltm85BCfkp3wNQqYZvBOf7zKg2HOdB9oSSeRQkNVTpn9nUpjyo0pRIurstjcofiun%2Bo5O66gh1H1FC%2Fa29rcaums83wdSAfeMfFJydhoEbnMil18TUhafqWlQG1JEkielzhhdMrwhAGUd%2FbEfEBAoYh%2B%2BN%2FrAzNJIts3bq1Qv7X7V1dfv%2BizXMw7cwdl555OOgALnFFnFOUmr0xBriJkHos54Bmrpst9%2Fyw6B%2FWz4T64UI9E8x0ZIWMJS4ZAic1oataRc8l2tVb2CfyrR6OSQXDsmJaK83reEJncsAoGIuhWC7ofoDPRJS2eSzgl8nEbOxSXEhNsfuC66rJZLF76JMn5gMy%2FA0ptBzwLhspZTS1cQyaD6oRD%2B6OG24GwRm9mAcJzSE2kxE2Fw1BtpAX0%2F8EkSO2hdOvomONldEahjOIkf8sTuACl1oTP6FVD49a1OsLBN0%2B6vSd%2Fy1V6OMEdffj4Dmzu9W1p%2FwFZVkiQrm%2BEKTl3t2JwnccthU%2BCg8Iw7biMzAY6pgG5LwzWuQIB36c1bZQhy4S%2FtKN5%2FbRPx%2BJewVxaukaRao0Z5pm6pTEv%2FUyCSh8KTiCvS1%2FNJ5WvqWDEP0Oj%2BOou2jBcxGMx9ji1k6%2FpJDuGnc%2FKc1o9nFf5Z4VVF7ehEhBJ0F6nYoG9Kg5Wq53vWsrBfAVUSe1zEy%2BNiSa0r2UbCh2mdXpauXMGO8%2B8LZsbh6aXAKu9K2XiJsqsfYzQrCZZFSIBXwI8&X-Amz-Signature=2c02e4997b5f8e5d2c16207288a1e77653665793519929bd8b941f538bf95f81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWRFKDLH%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIB%2FQBe%2BOC0c7%2FiiVaQcBEIEGU9yt1TFNhUwr51a8DkmwAiA%2FGtyankwUvvMP%2FoXk0zuxLekDB8iIWQuHyEu6rEztAir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMKWnLr5MZoyJdfkG5KtwDr4z%2BzobTHPuEq%2FqiwvhDx12Wdu5hj55WakSsQ0oJT9u%2FzXSFVRSX%2B0tc9X%2B1cB9RuirBQdbNA5UubMlKwHNy8lO3bKD2OFQqSzhQQaQ2Mc55maU%2FT1lFUuCcC9Qyltm85BCfkp3wNQqYZvBOf7zKg2HOdB9oSSeRQkNVTpn9nUpjyo0pRIurstjcofiun%2Bo5O66gh1H1FC%2Fa29rcaums83wdSAfeMfFJydhoEbnMil18TUhafqWlQG1JEkielzhhdMrwhAGUd%2FbEfEBAoYh%2B%2BN%2FrAzNJIts3bq1Qv7X7V1dfv%2BizXMw7cwdl555OOgALnFFnFOUmr0xBriJkHos54Bmrpst9%2Fyw6B%2FWz4T64UI9E8x0ZIWMJS4ZAic1oataRc8l2tVb2CfyrR6OSQXDsmJaK83reEJncsAoGIuhWC7ofoDPRJS2eSzgl8nEbOxSXEhNsfuC66rJZLF76JMn5gMy%2FA0ptBzwLhspZTS1cQyaD6oRD%2B6OG24GwRm9mAcJzSE2kxE2Fw1BtpAX0%2F8EkSO2hdOvomONldEahjOIkf8sTuACl1oTP6FVD49a1OsLBN0%2B6vSd%2Fy1V6OMEdffj4Dmzu9W1p%2FwFZVkiQrm%2BEKTl3t2JwnccthU%2BCg8Iw7biMzAY6pgG5LwzWuQIB36c1bZQhy4S%2FtKN5%2FbRPx%2BJewVxaukaRao0Z5pm6pTEv%2FUyCSh8KTiCvS1%2FNJ5WvqWDEP0Oj%2BOou2jBcxGMx9ji1k6%2FpJDuGnc%2FKc1o9nFf5Z4VVF7ehEhBJ0F6nYoG9Kg5Wq53vWsrBfAVUSe1zEy%2BNiSa0r2UbCh2mdXpauXMGO8%2B8LZsbh6aXAKu9K2XiJsqsfYzQrCZZFSIBXwI8&X-Amz-Signature=2c02e4997b5f8e5d2c16207288a1e77653665793519929bd8b941f538bf95f81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUIEG4FT%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T112356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQD5dCGotvSjZGLuWHpu76lvbGn08hxI4p0PMpMIPQSIwgIhAOG8DN4eGcMdXEKPqLlqZ%2FF%2BcYDOz5IBTNmBYBxQrff0Kv8DCBQQABoMNjM3NDIzMTgzODA1IgyADvOMm4hgXpVUY1oq3AO9OT50prUhMmuFaGDDWat2wAxdw5Wuf9aCiU3CWyHwV5KY8dDaK7sOuLyrwNXrIu2LS9rXPdGMW4v1fsCDW7zDAWuGCT6MN5MWBifJ%2BJrzPPGc30YGJcDR6nKljJ%2Fh7OjzW5x76sGqS8FZ1M3P3ddQyutrozrVtwUGC3JM6l872ud5wWfQHuHOdfi6ofmsOdD2gFS7rzs5r8YvlSKSNXK2iCjmi7hDPROAQLV%2BSDrkuXVvKtXKx2ujYpvCB5Ew%2BVj6kZm7u15R869ZKc48eOXAO3Yaa6MLTtKDuDgs345WBvXeVBXvqcJ%2BMVEacw%2BDh%2ByebfFSvaFj5lTEchSvR9T%2B2fuJawQ0p65It%2B4Rke%2BtZz0XzSafe5JejlJyPxU6tpn5m7DN4S7LOe3y6S8xR0W3dutLDKQLXTMDtUCJ8asNrepzV%2B3aCcFxwbRK4%2FAqYj0DBRqKETi22rqNqIzWCBdMVhkf0tsGe7vUMiQ%2F6GasHX47Fopz6KMHVfYFSMe5E87TJpnZ5z92DLSwunkViDY8X7mbKGH2UHfpYnr%2B0OhwXiHEiSLpnolwe1WLh0li7l%2FIB4ZpbdAaHr3ViuRCM3h9l16WGj829VKjgLgbPO7Ejbk87SNGkEvkhDvpdTDsz4zMBjqkAY7SMh9cY0ciHo5PTdSErumPuKgbXcBFbnnmYrtAXQwqnII%2F09y69rZLXtpVF4EbF1kR4QYyH0ap6B0j%2BdLaK3Ds5g9dvfGTvh66eRTcSrO4MBQmo%2FQBSleurbSC3qV4GMQ3uTYjdDlvmD12tnBfyPZGG6Ck76000IBqZ5Z%2FZupc7aLRNMgWynYaArACnMul%2Fv00s%2Fo%2FeA2o2gtmQsvCnprvL8jh&X-Amz-Signature=0516a3b3527b01b63d5835cc123a86d3a51de5b9631c87745012b3321156048a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

