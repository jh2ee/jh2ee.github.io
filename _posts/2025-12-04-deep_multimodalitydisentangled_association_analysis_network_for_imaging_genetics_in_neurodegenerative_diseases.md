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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAIFRB26%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCggxIqqvwuBMcgt5uKorgm9aAUbOKu78zHyCJLBug2uQIhAJbKmf2ZwZ724823OG%2BCi08ysgGVIMS%2Fi0A907t1JW4BKv8DCHoQABoMNjM3NDIzMTgzODA1IgyVAstpiTZ2qowBFWMq3AMsApwaWO4cPT%2FwjzQB34WTCWurLdlFdtFOXPxsS0835mdEGGI%2BOAaw4CJwdzFkW2c0zyNtbStzT4hKF1R9VKAMcTcm5dtwGUSRgkKuQNPBGk8Ul8bEjYG3sOImt0DqMeLBP7zxUqixuVFIf%2Bu0OSzcLsImf%2BQd7J9rJP%2FTFE5kHTmi3MduVxCSrlfJrEiQypRHOIjviS2EvqK0KTF6w%2FX4SIriJQ7kzzglRVtBMP1HgKxFK%2FcW9%2BN17gbhJaNWez%2BLC%2BxE9%2F9dL5FMH3lzgca90XTovK1PUj%2F7naK3NuOhPZDLVchpPZ6ik5OaYTOqGMVNF49TaQUJjbLY4Vaq%2FgryU6z7KfIv1fB9lidTObTMsfjkT1bmx3RBydWLhKpba4SvFSSKkhrdjFQgclxiCXJw3grWQQVHPhB6iJTLfbCWp4bxuGK5ti5%2Baxx3qjjjp3gt2di42d7B89RAxVGDSnkjW4Hv74QHsy%2Fi8no3MpicD4Pflg3hKfWGUe%2FPRUbcE5udx0PQyVg3Najj3exT%2Fqp%2B%2FuX4QrV%2BcpOJCkRx69LDvvP1llxmsNKJ1o9GomFYxXhFWkH55LSWmMQ3sAwFJyVAswx4M2pKmy3f8XJAMKB1u53f7%2Fliwa4YGmZU1DCGw%2FTOBjqkAYu%2FcXrqpK4vfUPu%2BimQekSQNj2AEYfOIVIUHjyQ0U9wGM%2FhKbKCB4UGS6kVzpp8GoF%2B%2Fl35fQxYkbCOTU6p1%2F0jf3nQR3tmHbbcvy6NgavcP2eugAddvdsiz7xv6420kd%2Fw3DF3xdf6m7ruxW%2BI7VwhG4sWh2RAp502V1DnTyoHjpJCcN7hi19qB40%2BYR1pD7d%2FUqP3bJfV8sa5ltjQHU2AE15J&X-Amz-Signature=004ff60081beacc128670219e86d3fbfc4a9c4998d9bf4aa101f9af224f3e5c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAIFRB26%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCggxIqqvwuBMcgt5uKorgm9aAUbOKu78zHyCJLBug2uQIhAJbKmf2ZwZ724823OG%2BCi08ysgGVIMS%2Fi0A907t1JW4BKv8DCHoQABoMNjM3NDIzMTgzODA1IgyVAstpiTZ2qowBFWMq3AMsApwaWO4cPT%2FwjzQB34WTCWurLdlFdtFOXPxsS0835mdEGGI%2BOAaw4CJwdzFkW2c0zyNtbStzT4hKF1R9VKAMcTcm5dtwGUSRgkKuQNPBGk8Ul8bEjYG3sOImt0DqMeLBP7zxUqixuVFIf%2Bu0OSzcLsImf%2BQd7J9rJP%2FTFE5kHTmi3MduVxCSrlfJrEiQypRHOIjviS2EvqK0KTF6w%2FX4SIriJQ7kzzglRVtBMP1HgKxFK%2FcW9%2BN17gbhJaNWez%2BLC%2BxE9%2F9dL5FMH3lzgca90XTovK1PUj%2F7naK3NuOhPZDLVchpPZ6ik5OaYTOqGMVNF49TaQUJjbLY4Vaq%2FgryU6z7KfIv1fB9lidTObTMsfjkT1bmx3RBydWLhKpba4SvFSSKkhrdjFQgclxiCXJw3grWQQVHPhB6iJTLfbCWp4bxuGK5ti5%2Baxx3qjjjp3gt2di42d7B89RAxVGDSnkjW4Hv74QHsy%2Fi8no3MpicD4Pflg3hKfWGUe%2FPRUbcE5udx0PQyVg3Najj3exT%2Fqp%2B%2FuX4QrV%2BcpOJCkRx69LDvvP1llxmsNKJ1o9GomFYxXhFWkH55LSWmMQ3sAwFJyVAswx4M2pKmy3f8XJAMKB1u53f7%2Fliwa4YGmZU1DCGw%2FTOBjqkAYu%2FcXrqpK4vfUPu%2BimQekSQNj2AEYfOIVIUHjyQ0U9wGM%2FhKbKCB4UGS6kVzpp8GoF%2B%2Fl35fQxYkbCOTU6p1%2F0jf3nQR3tmHbbcvy6NgavcP2eugAddvdsiz7xv6420kd%2Fw3DF3xdf6m7ruxW%2BI7VwhG4sWh2RAp502V1DnTyoHjpJCcN7hi19qB40%2BYR1pD7d%2FUqP3bJfV8sa5ltjQHU2AE15J&X-Amz-Signature=004ff60081beacc128670219e86d3fbfc4a9c4998d9bf4aa101f9af224f3e5c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RHAI6JT%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDf0Q83RWKjqTSgVaIdPJjexkOsvJ8QpGW70yyMVuy37AiEA7VHLcPpJ4ZvAWqcI3JtBVJvU1%2BlD%2F%2BKJvGgqRvUob2kq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDI04EKWLeTysc1EbpyrcAxGhi5Ah%2F8OP2%2BOQYsoNWUoUSNemDDVQnTNNo2SfJG2LhX5z%2Bmw0vcuEQoMPg5Tie1qwjbsEtMHi64E%2FEQIOdq8VB93DfLxwbwUVyvYUYyvv3ZBQxNctFo7tvs%2Bf8ZerLMS3mUsL01HWlgjAA0CiLmL%2Fve2XSYUPn8BySpJdFyaUkoTMEExSoQZjpY8N%2FL79HSqlR4zSTGxg%2BKBw9xU27%2F%2FS7a9TdG5jv%2F4zCy9eFGPMIgELYXNQqsDZ5SnsMDyyBRbfYj147wSXMyViTm7SF1v0hhMAxhhIgq5Lui1vBAmMKzKbKG9vZ2mz6i4JVO0v35r6aMGlXUCkoV9APooErh3crTZl41UHFPr2YO9ItDxq5CzCZZWduEDCy9%2FL4I2JxehDBGYpjIHyTIAZxtDJ%2BOllacKwleTlk3TfDQGLrtWPvAjMclmDxtiS3MsQowYheHIqPhQLpcR8AyNlckjwB3kkiMrQrbiUXfO30XmFynoy0rKf3%2FMLxfdH%2FaicVQYNEs%2BS0PYjZ6dd2SaFFShxj8hjfGb3ywYaUyko8QXIjH%2FAb%2BQR%2Fxkdijm8Y%2FaVFdjisjO0V5w2OETH%2BC86BAcXp7XqK34QuAEbVy0FH0DQR1kxhk5N5oWuu7YONYKnMIPD9M4GOqUBxajfI6%2FCH5w%2B80dJne58JWNcHr70PXK5gRdqlW4Trc6Bt74%2BhKDw5vShiBBrIPV9REVbDqyK6snTVlyhP8v13yWgmoASxpOguaUdDr1kLeuu1cvEL%2FD5%2B93ZuszuFRRjRZQrs4tsoaOv%2FRxkR8KEKcp61mg%2BN%2BKUjbSjCeK5fmvoQPC2%2FFAz%2BS4PEsYMOq3GNryIEtMSe00hgeqi8ZUHJSHw55Mn&X-Amz-Signature=7935733aa279b3fc0e01618e85a2ba18f7609a78c13b499dfb35cbb403e9a1e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BZ2VWXU%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJ01vsPJadQuCzLkg2mlN0TrDACWqBNWiBbrSXsBp24wIhAJD7T43cuoLP52O5t7uQUSiMKaGRnEGHsAVSnMdzrlh5Kv8DCHoQABoMNjM3NDIzMTgzODA1IgyH2LXLb9TQwRCK7A0q3ANLjvCX0TF0%2FIzcXyct2zpMGXoSka3DbNHJHlRFYQ7VMlsABr4iKNu81NYsX2tvhWPeMMoVeQ3D%2Bfn1vEIyeJbdJPZBCaGSCjNyhktACijyejXwU4Nz1wMQ%2FsfrBNp1PNQ%2BfIQLGBoCk4xkAD6h6dvTQPmh6pZzfQPc2UjxTghyubccfEtLryI4%2FkuGTdjw25maSJxb2OEpy8F1CGcLWS2L%2FICQPkWMj%2FxZ6Ptx2u92u6ueYKJlVhy6rWcSA6I31PbazoLMRJGWWrvMbbfChhkHBcxdxWN6ronZFylTCWYkNhEy9jaRaIHIv0L7yIYiqk1B85LLF%2Fg5jTlbq%2Bt67hgFyVDvzt5rFVqHGrkHxTCCKmYwzWtPHZzXaZx2CG1PmJLV9bKHTvF44UhoBykBuOPDTgo5lODE4PCiPQCqxG7nPRlF%2FiCTl%2FUiTwsHOLEvSxIKfBptoWZZ8gL1k%2FL9qv6ZXDB5LqWn0CIqDeWxL6wvZxoInSCjlB6mmtgDn4gkZV98IwmsZ2GhxRJ73MRAL5O9lfRAB4fLqn9j2kQ%2F41Fr26qA4mH8VqRRYF%2Fl5AVfV%2B6yRpJlnzM5faHZM3DXIV2F%2FaWarEs8rbWH%2FExx9ydqefMWwto0UUCgQVVv4DCGxfTOBjqkAZKOthqxqME4TK41XZTr%2BvEBKkPLOLktYw7Uqwr9PG2vK9XGTg8L1siA%2FsUp%2FcixLw0V6Orzq1rNgM7jc%2BNXN2Fj7GnnpA3NYcToMNpVXobp7KZmsl6fy%2BnAugNukhe0Lj2bXBW526xFbLZKKlURz9K7J79UDbbfxo3ZCQ%2Ff%2BdXYSSku26SYkpJIgQiYjFT13RJd48ryRGGOIiWd1d%2B%2F%2BWWyBZ28&X-Amz-Signature=e4c3f4471c4457c1ffc6cb2a04f61a7c0c44c8444002d941508f11a25a395951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BZ2VWXU%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJ01vsPJadQuCzLkg2mlN0TrDACWqBNWiBbrSXsBp24wIhAJD7T43cuoLP52O5t7uQUSiMKaGRnEGHsAVSnMdzrlh5Kv8DCHoQABoMNjM3NDIzMTgzODA1IgyH2LXLb9TQwRCK7A0q3ANLjvCX0TF0%2FIzcXyct2zpMGXoSka3DbNHJHlRFYQ7VMlsABr4iKNu81NYsX2tvhWPeMMoVeQ3D%2Bfn1vEIyeJbdJPZBCaGSCjNyhktACijyejXwU4Nz1wMQ%2FsfrBNp1PNQ%2BfIQLGBoCk4xkAD6h6dvTQPmh6pZzfQPc2UjxTghyubccfEtLryI4%2FkuGTdjw25maSJxb2OEpy8F1CGcLWS2L%2FICQPkWMj%2FxZ6Ptx2u92u6ueYKJlVhy6rWcSA6I31PbazoLMRJGWWrvMbbfChhkHBcxdxWN6ronZFylTCWYkNhEy9jaRaIHIv0L7yIYiqk1B85LLF%2Fg5jTlbq%2Bt67hgFyVDvzt5rFVqHGrkHxTCCKmYwzWtPHZzXaZx2CG1PmJLV9bKHTvF44UhoBykBuOPDTgo5lODE4PCiPQCqxG7nPRlF%2FiCTl%2FUiTwsHOLEvSxIKfBptoWZZ8gL1k%2FL9qv6ZXDB5LqWn0CIqDeWxL6wvZxoInSCjlB6mmtgDn4gkZV98IwmsZ2GhxRJ73MRAL5O9lfRAB4fLqn9j2kQ%2F41Fr26qA4mH8VqRRYF%2Fl5AVfV%2B6yRpJlnzM5faHZM3DXIV2F%2FaWarEs8rbWH%2FExx9ydqefMWwto0UUCgQVVv4DCGxfTOBjqkAZKOthqxqME4TK41XZTr%2BvEBKkPLOLktYw7Uqwr9PG2vK9XGTg8L1siA%2FsUp%2FcixLw0V6Orzq1rNgM7jc%2BNXN2Fj7GnnpA3NYcToMNpVXobp7KZmsl6fy%2BnAugNukhe0Lj2bXBW526xFbLZKKlURz9K7J79UDbbfxo3ZCQ%2Ff%2BdXYSSku26SYkpJIgQiYjFT13RJd48ryRGGOIiWd1d%2B%2F%2BWWyBZ28&X-Amz-Signature=ecc1a087bf9d07fb1ec004c20d9f7543a68d50017e52289e5cf06e096fd3fadf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLCM5Z7G%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDcok%2FuvfKGwsjW8PGc8lKNl6edqFj8tYVvGP%2Bz9rq%2BXAiBxrlvJ7sxa78%2BFDT0qO1VGtJpnC6FW%2F3aTenORd9b%2BUyr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMJJCCyFLCSBwwgqguKtwDRF2BaLUuNAoDOff07Hocsmbj%2FE9zD1pJva0SL5PiBlC2qTOoOPjEd8rd1d899nXDHouIWHxez8PpCQUqpNm5Ww6hzzUy0JoRE6T7b84FvsISCFIUdZmpw5zJUoNyBxMvQioe0icws7hXa2lTdE7Z9mD1OhVPZf4o72NdWHBsE4MMq5p7v4lLlLPpwnmiYkta4k%2BZoCnNVzULMTQg7J0U1F3SgASD%2FutCkDv5PwhPSO2J3KNwbLjPbr3OMLHUNIZlA2mKMEroC2F2geLC0UAqp5qKSdwffeJfWtW%2Bq2YVEJOxdiRIQwAPV%2BoEcezzsWBIDl9ddFbZBxhOZ1d0QyNba2g3hfPLppxn%2F8ImipM%2B4J9ByyujcS017tMzuEAnLE1uK%2Bx7XvBV0RGjMK8T1Z7WAiC8Cu30Grt%2F4UePJ%2BH4tRszZhk3j0uPVnCPUMtW9BKHrMd4q8jJgQCdbY0k%2F292EKz8jz6KojeExbrHUDurrqAoSiTCRHs%2FLIeA6mE0d%2FJGOmgAWjqOydtPzeEVvMBJEd0bWcgsVnW80aq6qNv656u%2Bc46LYnHh2GqUBsDkDFBONPfplsXaTvrIrXrOUbhfg784xlzR0DsWxjghyFgC1QqrkMcqa5w1vb8vNxgw2cX0zgY6pgG%2BBNS%2BkC9ya%2FRQhf%2BOXhugKWi3DLewLX3VILuT26hNve%2FTR%2Fjrn2fPQtlnSaaJLrE6Mf1pZ3R1URWFArF9p9dRZvb3FboOtOihGouA8cU3sC9fHylHBD4P4qREidoAhw6X5PCXIdQ%2BEPD0XZq2%2F4DgqIjE2qY7JPBqE5xthasb7zhsRJ1J2u6AJTRGj3AlAwOYJDCUcwJPm%2BE2SpQcR1cKYjJNwaIa&X-Amz-Signature=96066878f1d8822021a603a3fb1de42acf16582fb9227602080758d3741c3e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WVO645E%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJkDWtS%2BYyUUpmUiFxaaZYE9izBxpebAMwYPzLdr4TPgIhALPcAKhSJLEPsQFEgjjQogkXWe1%2FvyQ4v2ntNF7BvP9HKv8DCHoQABoMNjM3NDIzMTgzODA1Igxy3is8o%2BvrSNYneC4q3AObZoNxkjw5kA2srVYm0RQCr0%2BED7oO10jpSTuRct01Fi%2BWfVMiAlUjN%2BbPipjAUm7YRENWmbec%2FxAD9IH%2BfZ%2B%2F4A3YvHiKkmfS%2B1VTBpmDzesrjlSQ9yCYAaVLADusek9hZVZyJ02dZ4gePkIlxcQEMupMG1i5wE%2FpSiFHkx%2F3pArkudCSVxT9%2BSXV5Js0R1jfbZFGRfPkQ4xjEe3WEN%2BX1EOsuDiScBizAj5gvtprslLI1si0Xyca4kqTftpup%2FEo15uJ5l81XkQ0FuRWoJ4q75TRPvfSjYHi2ov2eTtWcR5Qml0AobH1yWANIrTMGyM%2B6yJ83YwhiUrnLgoyDwVeCINahvPsYeZgXrZioFna1k0hTjuxpkuDmnr54rQ7pePpksY1%2FlCgAJQnh7X%2F3S84wClCodO%2BP8nWKE42a7QrLMzPZrQTRhlMSUxM%2FKCTG9gBgMOED%2BElkfmFYTKvvwTEbEeDkdGfBVOlLxKsw4DMu0QoHbmmVnrn%2B%2FK64Jqfwi%2FbPLlYJ%2BwiS%2FAPCBR%2BeqQfO9XwIyD3cGy%2Bud2xBUHdSJ9Vn0S0wtbLxVCKsjDBLoPEI692rVoWT4BCepxvqqLBIDXwwuppW9yuRxS8AeB5OPFv5gRTn85rMnuXmzCFxfTOBjqkAZTl0osIRTqfFpAj%2FEu7fIFPBcPIgxCIRvwsNk37ebz1QzaWrSkRbA9LNY4phetMX6ay3yfqNI3iZPURYRW2JNAwDZ%2BW5o%2BviHvjakDTSup54daXmz1Sv5Ua9bt2gsQ1tDAs8GQcO4CNjtEfmDndPdhA3n4bLkzWFEwpnrbbJ6BCj2CyDyaGSOdl9S0XWDRH7la7el4NKVjY%2FTbEWUZIOTKLRG6n&X-Amz-Signature=3ec5653f94453821f63eb939819208e8fbc536f26ea62f27bda46cf857d91295&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662I6X3JYR%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCN6A%2BOZ0KmZP%2BxPlHGTIA0qEFYNi5%2FsSH%2FIAfGS3F6FgIgUeUs91miuu5ExlTx4tlS10oNyq4zTEDdfMLot%2F%2F5qooq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDK7rwmFNZ1PXO4N6xircAxd8U1Hy6OT6YofISk4AKGOFMg6LYVftyfkB7LQo4LEH%2B8aWP7lAJZc3d9jsgzS6aLWfDlOSSotMRGBVCHtcr29pS5fEeOtd7m5qEyYRaURZIxA06M%2BQY44eEscn43z5%2B%2F8Ig%2BaFoZp1YqpDfEm751yAtdnnJOm8hB5RIeJoCQfilr%2FvmxmSgohQzS3ixaQM9aHuTkyOD3hL2mUjCSSi%2F%2Banx9fucYcL5FdpJib8eEnYdgTTenT75miZ%2BD1udtM9Z%2BC0Rq37HgqH1%2BD4hD6%2FSYWsslTyDhEI4DwSQOtPfZoZZlgiNRsNVkLs2Eb2zT8yZRmf7SopSeKzykKpyjmNKBazTMcygQj5q%2FLl1Jg4OxYSPETuPVP5b0Rsdj7bSexa4GsqQrttCKSg7d%2Bxf2NQTGMNpDfHjSbnS0bOpXOqlRA2VyjlIjWCLC6hzLUj8yJa347opHaN%2FbcyyWbGTC1vkPcsacaKQVSRKSt6mmQkIHmbgF7R6bPZ8SBdX%2BXEGmvNoKQa%2B71c3Bw%2BOfA%2FdZRlGQFAFTXaC5Mt7GbTQF2Pf%2BEtNOtzGK60dr1kWvPcr1XQIffyjGqlCWJEtfBjJ9EAGqlLpqGtqYJ%2FIwzkRtjsKKr1LAvalaGF2lUSLJxyMKDF9M4GOqUBHnWlsVhzhCXScW8n8bhptJLjXgY%2BKnRegmS%2B2KzSNwOnJSBCFvSSAM7zo1HHHAyvo8AYdBR2BWbGX%2FCtEFoCKhB2vZTfKTjf3oU4xM6bwdq7fvxpN92gl72YncY2D2H64DmDOL%2FXFNLFeebRACaoirBBxYdkXTSRvmrEjVMPU97bZZtcMtPOwnHiF3oBT9eQfSn0PhKnG1ZcIzlm6RBFve6QKozd&X-Amz-Signature=d5fe93a6f30357f53c1afe68e70a4403453ca321c87de3984916cfcf084371f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIWWICQZ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMwiO%2FznUYprZIRmnvTNXItmmMJH1YDQXQSTfZB%2FmRGAIgezYkK2BFh%2FyAY23H3KtZidqCmWiuAnbRH2nIavNqSVQq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDH0omeFT0Sn78bLX0ircA2s5Y0SlmGPiEoJBXkN1Tha5An4tpZ3rFK48%2FjHZ7sMG79iZky2Szxp6AEwYyfIsoY5c52MR1oMRDQxuj6u%2FaFxvDtASpahqrciRsFkMXvLI1yyL80com%2FoPtGien%2FzUZ05PSB%2FibJZUTFdwBuDxyR%2F2uu%2B2FedMUnmYYM4Jbd%2Fmwe16OFZhHIKPdD%2FY9txyLB1lG%2FCdhaQpaoA42OYc1wXR5kr%2FMozvNO8kErPi56yn52wIp4QCEcRAglP6n%2F2a4NYZxcha8ZVyrwx%2FfiXMgRxf%2BADw49vBe5u%2BVoTknWORfGxgqTanaZYY6ny6o5j55HMxkOfeL0fq9qviT4kymV2QXctf5hPoGUKMs04dp3H5o4teqHIOAUUpf397sXOl4nSn%2B%2FluBuTDRBaQIHfKY5lVWShZXCJUHhaw6vYfw2UB4yxgv9PiQfOK7XoRH%2FP2J2dtQymYjwl37Q5QiAEZ8TTnP7bo%2FJKChCRBF0rtyIKcbISFihitFbIdHLBFf00ZH%2BuBp0JuPb4A8m642H9jeCNLJJXdRxQ3CfsGbDk1ym0iznnDPZZXqfukpFgy5fnzlMmr4I%2FkA0KCIOyOTi4SEcaXJbQoJv%2BEF7T4aprQCN1OQ8SzXSZ1YLrzlL23MPPF9M4GOqUB4ly8yud5ZPYW%2FSav4TvEDnZGr4y4nROZf2zcQjd1423PfLMdtfHERrniqU3coYTB30SbWXJiolXZ7ZrQ0BIz%2BuDLtknQ3agLsdUr0lIwwzIW2UJtd4hMVP9YLn9qYcMlxEz66QTtJbb%2BhMZ%2BDv4NIYZ8nt%2F6%2BGcYUa%2BJoEAY9b1rdpADrhHiTj99H0HLyelHwc3RicsLk0xC6sUBY8heU4bU66MY&X-Amz-Signature=a3bfbc6ef0c2739a8de4857b6acc927d6e55a31cf58fb02769e8f3cce11f06db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIWWICQZ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMwiO%2FznUYprZIRmnvTNXItmmMJH1YDQXQSTfZB%2FmRGAIgezYkK2BFh%2FyAY23H3KtZidqCmWiuAnbRH2nIavNqSVQq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDH0omeFT0Sn78bLX0ircA2s5Y0SlmGPiEoJBXkN1Tha5An4tpZ3rFK48%2FjHZ7sMG79iZky2Szxp6AEwYyfIsoY5c52MR1oMRDQxuj6u%2FaFxvDtASpahqrciRsFkMXvLI1yyL80com%2FoPtGien%2FzUZ05PSB%2FibJZUTFdwBuDxyR%2F2uu%2B2FedMUnmYYM4Jbd%2Fmwe16OFZhHIKPdD%2FY9txyLB1lG%2FCdhaQpaoA42OYc1wXR5kr%2FMozvNO8kErPi56yn52wIp4QCEcRAglP6n%2F2a4NYZxcha8ZVyrwx%2FfiXMgRxf%2BADw49vBe5u%2BVoTknWORfGxgqTanaZYY6ny6o5j55HMxkOfeL0fq9qviT4kymV2QXctf5hPoGUKMs04dp3H5o4teqHIOAUUpf397sXOl4nSn%2B%2FluBuTDRBaQIHfKY5lVWShZXCJUHhaw6vYfw2UB4yxgv9PiQfOK7XoRH%2FP2J2dtQymYjwl37Q5QiAEZ8TTnP7bo%2FJKChCRBF0rtyIKcbISFihitFbIdHLBFf00ZH%2BuBp0JuPb4A8m642H9jeCNLJJXdRxQ3CfsGbDk1ym0iznnDPZZXqfukpFgy5fnzlMmr4I%2FkA0KCIOyOTi4SEcaXJbQoJv%2BEF7T4aprQCN1OQ8SzXSZ1YLrzlL23MPPF9M4GOqUB4ly8yud5ZPYW%2FSav4TvEDnZGr4y4nROZf2zcQjd1423PfLMdtfHERrniqU3coYTB30SbWXJiolXZ7ZrQ0BIz%2BuDLtknQ3agLsdUr0lIwwzIW2UJtd4hMVP9YLn9qYcMlxEz66QTtJbb%2BhMZ%2BDv4NIYZ8nt%2F6%2BGcYUa%2BJoEAY9b1rdpADrhHiTj99H0HLyelHwc3RicsLk0xC6sUBY8heU4bU66MY&X-Amz-Signature=1c9e6a44f0dd391c4350e3160b6fc74aa6065a0876bff19fa3f493538c91f93f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KGHH553%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8CTrsAoz63r%2BXgk2NESMKf9idDcDtg5R9mSnQ3ycMjgIhAL8ZVIyprjRQQpT1nw3WOXqf7ajs4c74oTHpwu6lAl6UKv8DCHoQABoMNjM3NDIzMTgzODA1IgyTmcDm8Ep5RhGe6S0q3ANirSwRWO91%2B0Zzq63C78vEKqokPPut%2FG6YUVYnXLCJ5HgCMS5RFbAEPZwk1WLDovpTDQqZg0FnxZq18nb52dsNqHL7WURLsnsAQjoQ1efpsCfseZ5rjPnuSMsWy8U6WQv5U%2Bf2TsTRqz2chRUnzbq73e5KbxK8uEdf0aiiTCgmPKc6AAKXIZsEXSe5wqiSRBF3w5b78G9zFoIheOOZ5oJg7JumbLzVbeBgwoEDp54AAVHPaMR2kQ657nNg55GK9JVIVYQ5t7yWjj8333GGcUZGI%2BSYCmntpe8aFzKrMtjcOgNodyexfWDOseYHQrJ5sQfeOzvhr1P8DDjUHNsgjyN8JIHW09dtV%2FAA%2FJBx48sZNfocWvaUbuTVaZssrX48ZzUGI3nMFT0wpzgDxRdafvUuj6Tm3%2BuT%2B9pzWZLjRyJLNDbJ6WYvsdaM8OTYl1aY3Q0QFmpoktg%2F9bg889YAI39hsGSy2g%2BvhGJ2r99hmgvkuchV19pktVZQ7xpecXmogNVQ5S0bk0uE80U9ixGFOGD1HQO3wszODJiFQVAC4mS2%2B3H9SLMf8rLfDy7Vx58gf%2B82q0Z822yysEiwNdWRriol0wMkjXeIXJg8YD8LkKpzoJUe37yShYv96NBQ1TDlw%2FTOBjqkAdThxstc717hU2sNHB6X5AE65fOTIGqNOWSCT15ItwatZJsK0tWvkBYpxffGhvuGB4KzMenYVBQVuyULAT%2Bp%2F6IClnQyiSZLqxXHD%2BTjLNOxHe6Z%2FRd7lunV0w1P%2FfnVqnn2R0HKVPepMSHvfM7l8J3GqFalu6prcrLZyPdJPzTQc5KkkQYq6mPQL%2Ft9WC%2FAdWDzrD9ReJZ3ZbknllV74oFEk%2FtR&X-Amz-Signature=5079f1774be4bae7d7f2a2a8728ea97a6a91aeac7d2f15b92a5d4e0cda1674ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TF7H3V4C%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2FkJ6q1mSVYXVqnYAfLtu6Kg%2Bv3izr%2FmC3SxgAlThkYAiEAkl9kSqA7943r47W%2F4AL5gcjSgfnMukd5MlH07vdzopkq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDEkwX3gaKH2CqeZxiircA6DhDtnNYT%2B53UldyNla07yK4SVtkF%2BEy8UvnYTVp98M%2Bc6W%2Buu3EY1o8qphiiw%2FceSm70myU3whe6Z05RZop6u8YTBj621NfUBypgMh5g%2F0JUmi1UP3R5E3t7T366pHxvNZQ8117ugwpNnykzVH1D6Gn7i7p45T4JTPBiNhtSzjYh76vudUUlE2TE3mNTsv9OuH9g4WQPMQTE0i1edVFe%2B5OEkQPI2xcWctbUMMDiO1earTQbBMJTcbZ7IQy2XIYzG68E5dnleMHnDUKB4cRS7xSoClv9ibR7vPGoOmKXn1I%2F4Kdy6tvJ9ZS3DaFWnLFGyL4foA6jBEElMfBflQZwu%2Bij40ClfAPAss%2BsQqP7VC%2FNP2%2Fh3sVBVd24wz51KdrjCOyuXcKwQM8jRfT0ARs0nL2k829poBRMJCC43XeB8UW7cq8oRhWqAY92j52nYDrf0%2FzcHTfIBxT2w9KeZ1YFS%2BOnbmgJ280hyWqMXOK4iOtJ%2BFsJaMK%2BI1dIRMttFXFrzx0%2FZDBgvWOSAe2RuR7k4Y00RVv7Usr6kwSl%2FUaAO95XDJcST5XEQmskfmg0Pe53CzWbDvBnSl7YP8%2BwDU6asoFW7dZS4ALOamYMTFAeRVaAVlf4gjFktMBvqEMNHE9M4GOqUBJGp1uVCOvVbU%2FU0kwN2sKa7OnI%2FXp9sijt2QRZ4hGmHwLPPegdT4EJInOLypYeWRyyRULvD91V5gjGYd3%2F84YT8fmSh%2BkwwF6gBV0hyLzDAtiNdgZZaCnuuf2sOaPl%2B7wz4A6xvN%2BNYI5M%2F6criA3xQ0%2FX5uOy0A%2FIN%2FKN6EMM8Ed2U08yV7RFFmVcgCIoghevTZu4rPXY92GdH58VHgHyKbN1h4&X-Amz-Signature=ffb8862830d6644ad63369f641e36dc53915d966fef6bc58bed6e1f5298551fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TF7H3V4C%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2FkJ6q1mSVYXVqnYAfLtu6Kg%2Bv3izr%2FmC3SxgAlThkYAiEAkl9kSqA7943r47W%2F4AL5gcjSgfnMukd5MlH07vdzopkq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDEkwX3gaKH2CqeZxiircA6DhDtnNYT%2B53UldyNla07yK4SVtkF%2BEy8UvnYTVp98M%2Bc6W%2Buu3EY1o8qphiiw%2FceSm70myU3whe6Z05RZop6u8YTBj621NfUBypgMh5g%2F0JUmi1UP3R5E3t7T366pHxvNZQ8117ugwpNnykzVH1D6Gn7i7p45T4JTPBiNhtSzjYh76vudUUlE2TE3mNTsv9OuH9g4WQPMQTE0i1edVFe%2B5OEkQPI2xcWctbUMMDiO1earTQbBMJTcbZ7IQy2XIYzG68E5dnleMHnDUKB4cRS7xSoClv9ibR7vPGoOmKXn1I%2F4Kdy6tvJ9ZS3DaFWnLFGyL4foA6jBEElMfBflQZwu%2Bij40ClfAPAss%2BsQqP7VC%2FNP2%2Fh3sVBVd24wz51KdrjCOyuXcKwQM8jRfT0ARs0nL2k829poBRMJCC43XeB8UW7cq8oRhWqAY92j52nYDrf0%2FzcHTfIBxT2w9KeZ1YFS%2BOnbmgJ280hyWqMXOK4iOtJ%2BFsJaMK%2BI1dIRMttFXFrzx0%2FZDBgvWOSAe2RuR7k4Y00RVv7Usr6kwSl%2FUaAO95XDJcST5XEQmskfmg0Pe53CzWbDvBnSl7YP8%2BwDU6asoFW7dZS4ALOamYMTFAeRVaAVlf4gjFktMBvqEMNHE9M4GOqUBJGp1uVCOvVbU%2FU0kwN2sKa7OnI%2FXp9sijt2QRZ4hGmHwLPPegdT4EJInOLypYeWRyyRULvD91V5gjGYd3%2F84YT8fmSh%2BkwwF6gBV0hyLzDAtiNdgZZaCnuuf2sOaPl%2B7wz4A6xvN%2BNYI5M%2F6criA3xQ0%2FX5uOy0A%2FIN%2FKN6EMM8Ed2U08yV7RFFmVcgCIoghevTZu4rPXY92GdH58VHgHyKbN1h4&X-Amz-Signature=ffb8862830d6644ad63369f641e36dc53915d966fef6bc58bed6e1f5298551fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHEJZOZF%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T174652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG05%2F4LMwtfksryQXlatHfXD98UuH%2Bu6%2BPmkr9IGKLIPAiAE2HoMtUOqj%2FZlcNQLwmJHc5EagnQWvEAqaN%2BJcOOvgSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMeI4%2BxR%2F5YzWdwOb7KtwDndloaA%2Be5vGWE5tiznLCzmlwb1h14lrpGiVRaj08340QqjZdemFS2ILXs7v317DYnUVSbKmjRUY%2FkbwvvxMS3i%2BSzNk9DQCjxXDkkU%2BwMxhFFwM20yV%2BqIPyPB8%2Bky%2BcyZNQBuDm54h7Mfv4su5uXgu2SzA50HW6MnA7ErLMXc9ToRUkhN2gUdjeL7mMpMQP8pVNHrYcW2tvjGbf3b1lE9NMI8kmErSwHmoqTpl0r%2FqKEQG3Zhw4pbHyA4%2BQe0XT3oVvuExYK0ncvU%2FYN73l9N8Npq7HxN0MCg3glWcNURN1LynoDUq1fy1vlpwTPvbmLK6%2B5z2hlTJmYsK9DDvC%2FpnRajJYkE65eWT8bUUHmjiP4Z2R8NZVdHp2nyCF61RYtjuA%2FB7FC%2BZGAl4GyDYc12zCNj6L5IpV0wVMaWXRVYU9SDT6E59rWhxr5sZj34C1PIv%2Bu4t%2FmWCZvH9onUGsDf0IqVi7Z2Br9eWc0zGBdd1rCuJNZ%2F%2BrRRQ5w2LOBQg1PH%2Fpm1JqGpwnR6CpRwGn3tAP9dnJjizNTxrOMyQr1fIXJpuZh8TWxlAMTI7LDm5CFPVqKlwestM7XSPF%2BWnY5nWA1p%2FluTxCw%2B7Mnbuw2ZC4yC%2F5zySy9Eqvz1MwucP0zgY6pgELoTl5DpFRiTCMYnYcI5vGUvbyODLKOIa9arowOFiqHnu3HRy4yXcxttiQrNfP60whUXTGKD2QVlEKsMbNPo%2F%2FnLUdwkLuBCUBglh6mvywp%2BUQBif0%2Bt8Bqn%2FQy7gUbjdqqRugeBgSyJjQJqImyZVMgGY2X816tlYVhkhX5XIDpozqimzJWxduDSiLcAQMiAhcRkEdeVMV%2FK03S5W70%2BDxQhL6yqH%2F&X-Amz-Signature=683700af727e602ea0499f5ff6093e9f3c6ec6e12e7db6e43c27afe497983d89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

