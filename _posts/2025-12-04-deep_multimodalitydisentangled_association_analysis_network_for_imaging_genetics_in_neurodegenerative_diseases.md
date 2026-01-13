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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MTJX3WO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDsL3ywDO%2Fltpp80J87nTjdRy7y32P%2BxY0i23zS0lzHIQIhAKZVZ%2BbBJyhpHsCO9TUYRjNgksy5mbM9Q6vAzrGYHQPoKv8DCBAQABoMNjM3NDIzMTgzODA1IgwaNetVrKJfcIS58Lsq3APbgg1hhRxVuu%2BG0UeT%2BlgSJHRUEOLmjPWAoy52%2F4iCrxYDq2GOfl6%2FCyuR9nAtTNc9vngoS8NDZhRFlpRK9HWbG%2BzQdgGAhHGFQGthgnSyW02nDwKugr2I%2FtB%2Fauyis9SalC9xaPnEEZlP8vtbwo62p5VZmoJIPDXet1fNXSvHH2uhrmBT48lY9IZssCYvj%2FR%2BG1s%2B1DeLnjNlgrB7cNpUxTnIBYaGs8nedyiOa3%2Fris9lYiQXPvEgofARBnb9xQVU6mcUyMrBBa5d9SpPENcAMeyhH3y4p6rx%2F%2B5xvSapH9jHNsJngV3Kyi5bMJhjBj%2F3ZHwK6aLBTasoHP1s08jbQ74BO7ZSxp0QObGZZZSBqChEL9zcArMRV1s1hJYkqn%2BPugpgaQTkT9pbDG1hKI8Ebs9VJvIzd8uyWDjeTz98AhlcAWfgnXouu7aLUQauCbMtp9qXC%2FYeCT5ye4klXGUdTPFvEvdGrIdZq7jPsZ2nK341GTAs5Z3KGDvO0pIGvCeS%2FvM53fVYaksvebcCHCOVp3hUxDR1i7Zhw5%2FoonwVF7wUsZl7hlnDBY41ohgokRG%2F%2BSjFh5qpbMPastX6yE7E5kvdYThnhv49MCYAJk4xoPatTwZF0pX0XZN8zjDemZvLBjqkAQhHUXLBm1JsKiamVFyGT1i5%2BROZn4xzTb%2FhnSjMafY%2FoXLBDhtNXyNbsCSTnZtHpqyEcW5KuUyPh0AzHJCMjBuvKlAo48tmTRDtygac9EtuCSd5QI50NQ8a%2Fo3GdfPRNKNOjvch4LZh%2BmL2lUvHnjCwlcoiR5ldu8CerSV4uBV1ovm40KcSFVgt4qINiMIhZTrUuGd%2BjNiLSOuxaeSc0EtK4T91&X-Amz-Signature=6aa350691e6ffb4e395a6f2667b80d88e70b2467e087793e55fed7af22641c08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MTJX3WO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDsL3ywDO%2Fltpp80J87nTjdRy7y32P%2BxY0i23zS0lzHIQIhAKZVZ%2BbBJyhpHsCO9TUYRjNgksy5mbM9Q6vAzrGYHQPoKv8DCBAQABoMNjM3NDIzMTgzODA1IgwaNetVrKJfcIS58Lsq3APbgg1hhRxVuu%2BG0UeT%2BlgSJHRUEOLmjPWAoy52%2F4iCrxYDq2GOfl6%2FCyuR9nAtTNc9vngoS8NDZhRFlpRK9HWbG%2BzQdgGAhHGFQGthgnSyW02nDwKugr2I%2FtB%2Fauyis9SalC9xaPnEEZlP8vtbwo62p5VZmoJIPDXet1fNXSvHH2uhrmBT48lY9IZssCYvj%2FR%2BG1s%2B1DeLnjNlgrB7cNpUxTnIBYaGs8nedyiOa3%2Fris9lYiQXPvEgofARBnb9xQVU6mcUyMrBBa5d9SpPENcAMeyhH3y4p6rx%2F%2B5xvSapH9jHNsJngV3Kyi5bMJhjBj%2F3ZHwK6aLBTasoHP1s08jbQ74BO7ZSxp0QObGZZZSBqChEL9zcArMRV1s1hJYkqn%2BPugpgaQTkT9pbDG1hKI8Ebs9VJvIzd8uyWDjeTz98AhlcAWfgnXouu7aLUQauCbMtp9qXC%2FYeCT5ye4klXGUdTPFvEvdGrIdZq7jPsZ2nK341GTAs5Z3KGDvO0pIGvCeS%2FvM53fVYaksvebcCHCOVp3hUxDR1i7Zhw5%2FoonwVF7wUsZl7hlnDBY41ohgokRG%2F%2BSjFh5qpbMPastX6yE7E5kvdYThnhv49MCYAJk4xoPatTwZF0pX0XZN8zjDemZvLBjqkAQhHUXLBm1JsKiamVFyGT1i5%2BROZn4xzTb%2FhnSjMafY%2FoXLBDhtNXyNbsCSTnZtHpqyEcW5KuUyPh0AzHJCMjBuvKlAo48tmTRDtygac9EtuCSd5QI50NQ8a%2Fo3GdfPRNKNOjvch4LZh%2BmL2lUvHnjCwlcoiR5ldu8CerSV4uBV1ovm40KcSFVgt4qINiMIhZTrUuGd%2BjNiLSOuxaeSc0EtK4T91&X-Amz-Signature=6aa350691e6ffb4e395a6f2667b80d88e70b2467e087793e55fed7af22641c08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNVBIARV%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIB0w68fjH1o4UymDfAjBrfz821rRj0Sn5XEl1d7pGPJIAiEAvjNZW8cWa5aQPbBf5YyUxtgaP%2BubInz9WwmeAQpA8CIq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDNk51lh6aDqQ0%2FInOyrcA%2F2Cs9AGHHM%2B9dNXMscxQ0y8VKBQO0M1drdMlcALwpzWDVJZYUXG17Qrx67L1kiKccgYKfeQ12%2FnHOkbWhaODblMUChvEg%2FyG4hImRzkTMcz8L4JNQjQVeAhXHWOtZhxwAajhuQmdDQxG7Xe5jLVbtA0FU0J3tEO26E7QNEMyndCnnNxgoxkYi1ojAA5MapO3pksPriPxXbP%2BEU4Cs4wsgUJpw3UyqnJTV1LONOQu4E3bWGWEsgB9Tz%2FRD%2FBMm9DfWvvVJfuu3kV6h8f2h8PD%2BYV5hLBPcXLNPPf3cNEUdIWngbY0oJte7eh8ELfCcaI4Xu%2F7oM9NJNFGMv4uSSUUrmNVWes%2Fyfin2PFLOy0vdcys17QcIvWth0tRNRjqHf%2BmMYIog9yygBNMUizrdmKP28tnNgefKmTtp9zlT3t2WW25KMg7%2BsAY6z%2FPt9oAav7OsYoTdX%2FK3fBvjZlG%2BX%2Bz%2FXgmt1vAjVDHWP2SHibs1xw4QyuNBLlOwoCKpkgwtf3W5JD039TNvMsjB9dKT0fxLFIw%2BwqeMUsSaEoZR5ahWxKjCYPIprFHfLnr39SaYK56i8CBeXfAMwUBRXleID%2B%2BvI6Q6TrDyjq%2BAxmESNSMCxEQXTOvSDoX0zlycbJMMCZm8sGOqUB4XOJH34XxHCIL3FZMnM%2FIBvWABYH0vIyyOh2djKtBSwKPi2pEtuhy31N%2BU5YEKvkju206KnYLbxBvvBxtAQYNOwXrieGRSuhMHI0d3VztT2GlLW8ht0u9ZlG9qPsXPg%2FcwEYfK%2F2hFay63lIFcbGyOa2VBkszN0AEzzFPOA4A4VY3GmzXDnanJ2ho%2B8efT6r3HMQa7nAc5OHou9p3bSlLPYCoiAv&X-Amz-Signature=db4a57d9614a4fb21c84a43be026ea45302dfacef328c751ab353fbe024f066c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU36SHC7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICDHyZbeNspyqWGbGyrTlQTwGj07Q6Y%2BQLDfj9q82Er4AiB9aQ3N2WAdbSAdqJZ0AkErSs3JGWqjgwRIr8Vijt8Ygir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIM6wliZihbXk4wqZ0aKtwDn1QjwAipdLStkiMl0K%2B2u3BOECgajpSMnP1k8uHLmU%2FibB2p%2Fg%2BiP%2Biet5yEQGua0HGYOU3vO4Hdep3tDOl2J20Qof%2BZjRCGnDTcdzUNpYoHQeeZl%2BJPGEIBYvHGsijBLUtQs15jLyhm6il94kEmddFr6moEphwPp6YexPYWuocRVq1wBplLNkpqC2e9T8Ei%2F5XVkosS5hnpGqZ%2B7p1%2F7JoUWwQd7WqpCvjyQOaHK1cn5I%2Bco6r9XR0Q9eGU2gfWsAv6Wr0TtqEqbgYBFDxAx9oNxm%2BQZeNQPbzn1PJekDWtE4LljVLvU6DIgp2s7bSve2AyxHXk5xpb1Noq52%2FHEjjjexxHO6TQV3IYPp5S5OmikePLMZYknLENDMSgcfwO%2F7ia2jmhKslk1xxj%2FOlp86vFU7%2FLZe07I8krjij%2FCWnR1tpGgBgybm8VnDocfHyRTKW2YxMxf8gqukkqOoFQMCXLVHZ20gqrD9rre5WoQw3k%2BQengNjMlDB0CFm%2BdF1Yo9P8I18zMHv7I2z%2FuUE5RszUtuCLbi5z%2BKKRmpvLJQMnISfpSDojOXNFd3A1QDHiALbx%2BWIUd1pJPTmNxnwX1uypveRuoO95ATP1XFVEVTH2bruPJUD6iseNl9ow85mbywY6pgFPMa4iYzqpVKv8hijXI79DjKuIGZkWXV7gmToX1QUo%2FpnUOJWOcAQL5cydf1Gojo2JKwqTFR67GmRAbHupFG3lDrtdcRgww8hrdvmL0Kn21N4e8DXBpstYdZnH2ykzCIBW%2FrH7Idix77bFWHQnzt8Zj1iztlnRIcEe52ECzGtIN9hKGzZtoWblX0Me6BU8zKhx%2FVthtbcUrMJpVxUnV0EZDKQrGRvF&X-Amz-Signature=30e80b22db536dc8613152e60b6d8d5c5d23ee7aee3d12c50deb3a5e3ac496d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU36SHC7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICDHyZbeNspyqWGbGyrTlQTwGj07Q6Y%2BQLDfj9q82Er4AiB9aQ3N2WAdbSAdqJZ0AkErSs3JGWqjgwRIr8Vijt8Ygir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIM6wliZihbXk4wqZ0aKtwDn1QjwAipdLStkiMl0K%2B2u3BOECgajpSMnP1k8uHLmU%2FibB2p%2Fg%2BiP%2Biet5yEQGua0HGYOU3vO4Hdep3tDOl2J20Qof%2BZjRCGnDTcdzUNpYoHQeeZl%2BJPGEIBYvHGsijBLUtQs15jLyhm6il94kEmddFr6moEphwPp6YexPYWuocRVq1wBplLNkpqC2e9T8Ei%2F5XVkosS5hnpGqZ%2B7p1%2F7JoUWwQd7WqpCvjyQOaHK1cn5I%2Bco6r9XR0Q9eGU2gfWsAv6Wr0TtqEqbgYBFDxAx9oNxm%2BQZeNQPbzn1PJekDWtE4LljVLvU6DIgp2s7bSve2AyxHXk5xpb1Noq52%2FHEjjjexxHO6TQV3IYPp5S5OmikePLMZYknLENDMSgcfwO%2F7ia2jmhKslk1xxj%2FOlp86vFU7%2FLZe07I8krjij%2FCWnR1tpGgBgybm8VnDocfHyRTKW2YxMxf8gqukkqOoFQMCXLVHZ20gqrD9rre5WoQw3k%2BQengNjMlDB0CFm%2BdF1Yo9P8I18zMHv7I2z%2FuUE5RszUtuCLbi5z%2BKKRmpvLJQMnISfpSDojOXNFd3A1QDHiALbx%2BWIUd1pJPTmNxnwX1uypveRuoO95ATP1XFVEVTH2bruPJUD6iseNl9ow85mbywY6pgFPMa4iYzqpVKv8hijXI79DjKuIGZkWXV7gmToX1QUo%2FpnUOJWOcAQL5cydf1Gojo2JKwqTFR67GmRAbHupFG3lDrtdcRgww8hrdvmL0Kn21N4e8DXBpstYdZnH2ykzCIBW%2FrH7Idix77bFWHQnzt8Zj1iztlnRIcEe52ECzGtIN9hKGzZtoWblX0Me6BU8zKhx%2FVthtbcUrMJpVxUnV0EZDKQrGRvF&X-Amz-Signature=d952d0b8e0295a5f696d0d4da1313566220a1362f352f5d6bbc35f8edad36bab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5CE44KU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDYOxLk%2BKalOtXCkaa671TUVnl2rmgS51OcqLR3NbyuOwIhAJ22pa5OoDPk8ICod8p0uh%2F6GYCqRYp7W9gTF7Lym3v%2BKv8DCBAQABoMNjM3NDIzMTgzODA1IgwQr5tfA5KClDYCWPcq3AOpt5dmRg%2F2ilT9C%2Bw6bHsRaWp5yqaHzb4icgnBfr9tXvsVZuT5yXwysHMRNNOF9qXRvjvo6j9HJWwYswOEo5%2F%2FXqtSU5lI1i7z1ZT1l%2F%2F2VIyH%2Bd%2B2mk4njOrvwanied%2FR9IlZqQvrW6z2FdX%2FMiE4%2F4Mk6to86kszdlNcSPDpwloSiUMGD15yekQsH8sz%2BjkYCdWf%2FBq3YBA7bJ9HlworJxUJNlNcsjGLXI41zg5k9TJ7nOxJov52NqBggEPAsLRCq%2B5wrKeuWcV4NxbPxLTVuRy8FnM4%2FNhidXtAau1ACQ9UlzXqRL7WCQfbDWtSeFcqCpBEsRjm9cW1QC56PBPjuWVDODvBpwbipLwEn2p8ChxtL8pWSiT8nG8q%2FVUseJ3lQy20VVP4sqimFwa1VsGafA989BrbJGKC7Uy6CVLVi0Qre%2F%2Fjyl%2BoCuT6TEm3AbTT4VQ9fRkfL74T9v9CjSsb%2B7eV2P2UDHd6vW38y0Yj%2BBlcp%2FpXmQbJ%2FtcQTPDIjQYuUJoWK1E%2B23bmWIDl4dzsf%2BL9fUtnaT%2F33Z%2BgQYWCfailcoO2tooondlOyGMphe%2BjmJ9o88m2b1HCQnIHzoMNzkVZAaXoVF1TuckYUHb%2B9xVahFki8k3bLVy2ujC1mpvLBjqkAWrXMVoOREYvdwsGFqCjCHQnNvPXqNFBRTjOJ2SVceW%2BC%2F068KdxaZeaMUrnSj6BWayn7bBkZIRlZQPo8SG4E3FLFSq8BjWGNkOvUVdjw03%2B5rMCNV3WV%2FAqxB%2FPpq7%2FJLQegkRFHjOUeqIfiOZXXGC2BoGZAlaVvAqF9Ous8xns0IzBcfx7xh%2BZufiVNZjyA8qQG9k8ZlN0s9FxPS5H%2BoIbXHFp&X-Amz-Signature=4d3f28bd5a9fcdba52c2b5f4cb4eef63fe349b8a1024bc56ab46192599b2eb29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRLIMY7S%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIHNmZm%2FU9wv4Dl%2B83EqNtb0Ugj7IdNJUDeWGEJIBjkKRAiEAoxjByIk2OaXsCoLcxHPfap%2B1cXKc6%2BVvadf7giRImKkq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDOxxiGsHktMvmQBc%2FyrcAzYcMlEh3Ibgy3qmgQN%2FHLm84b%2FwfNz6ylnNGYZBaoIEs1YWvYXAYe3tM%2FImFy3Ed0DT87nhoypmTIHQAkALQcYV%2FgM7Xk5Q%2Bds7pH7OuWjgrKYHLll4iZ41mS6rOd3NlTv8CZisgwldFwv%2Fb3majacJFqkZe9YPGcBDkDUdPvA6sFbUK1TKTm62n1LPpVwAPplojhLYtowKm5lSxKpr%2BYTzKaWlEJdiyZp%2BzSsmG87O4cBz7KhOUXt6eKPL58J1i5lQ8%2BcxJMQwaWU8mjzc%2FqVUamJEvLDlDUGDM00nFLM87gKrSHuWgONkUHhfiJHtoXGGQIurZQgrjoPywQpoxPv0eOYE8WlinyC%2FFjsn2EecdvPzmaGSy3mHn4lk5tSVgQZItPUZReg2Sk4LXDg6asn86DTTTYBr%2FH3QdiZvuMD6w7icKesLTwL%2Bw%2BepxM8%2B43JmVanCi4BcWSY5blg5DzvBu0ajYp8Sf6rd7qi%2BM1eDXZKAQqaHSdvisyoUT8lc3gs5%2FkyIjHEUzHKUVRybN%2FN%2BoL%2FW1bpNc%2F4dARsrbmxiz5OzXpApJ6aKBtO69RLCebPbYhZbdEdtdnkilituND3TGgGN8RZ98xV8nWh21IA1g84aEj1%2B6rsGY7dIMJyam8sGOqUBQYllHBKa7ZyC41I%2B6mHzGv3RtRvLISkGov3nsxGVtOc0UwGABAFMswi0UGrUzJKIR4kb3nkopzq0NNs9WMHTfFE7I8xOaQ3UNrO2ctG5Yn%2Fv6yiGQMjDM0GTPEULVHrQ1fwVipUfBfqCXvPttypPp%2BSPN7WFp%2Bq%2FHH5XIVq83qW5kxLombtaERn4bu%2F2zPpTcge%2FhduvVWHyhv5nYsPnJ5480D0V&X-Amz-Signature=d62182a54c9134fde7b201e4fe372ba0bf55432c2d1b25efbca12d3c15568d90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHAX7XKV%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQDyIA4Upqn7nyskqw7P4iMO5O2AoKl%2BFNwFnoy8mpDkJwIgVCJ7exqMwjClZipuFY5nlRd2Tdbti1HcPXjv4%2F6wFEAq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDF3fRsZ80dkLYZnjRyrcA1YYqpSOA%2FMO%2BgCinyzQ0qVVa5VxIM4x3xb2QJhnOjAOLGsYQ9s42eeJeXgqJ1vH2Nde9s2ysyWIAGPCa%2FOQmSRvkFhJyDl%2BPtwe42PcNeZKIMfdJgYpVbabo4Tr63cd3SnNvbsQsFAVRGYNpYDtb7XMoPdkL1SSBqXDrahsjrtEdv2P%2BlJix%2Bf79ErN0x1fV6fD9lL%2FqW6QAkuPlxFp%2FbrXBBWRQ7NQkBXPBDpoBHvbfe7oppMgFGAuaURSUbMCFvXtQIlAD0m24U%2F5aQQY6rpWKQm9HiMOuleL%2FD7R7LruhfaT0vZlf6B9hEFPdxi06Ls4BBWHdxIgOvMFGbO0PCTWfP03GYHdl2KlhP4%2BBUyrrd5qBVf2jhjCQ1T8PNfjFDixajVFUgVUnWL2iBwYjPNOuj%2FGO%2BB9WRKxEeFwiMp5sReOkX6p9r4Go3dA%2Bz96c8Mx3h7sC9X2vWf6RrEIxL17AGb6pPVs1BXjrIMnmREXy9r1Beat17SsZaKYhLxoniTy2ojoDZCzgLBp8e6T5AAzyMBZ1urg6v9crsVtT2B2i93WAMIUYq2A%2Ba%2BYbEcd4VIOF2qSy2iQdvLihjIIIzv3HivjEcLAl%2Bcy%2ByLt04QBDcQLsKp4yn7XWvRlMIeam8sGOqUBk2ShECcc00y9hL79e9Iu9t1hYZBYNst%2FLTDp0NXuixbnRrvSOWu8rFuOFf6Op7cKDUQIoZWTOK%2F3y%2FkVL%2B15vt6uZJhJek80bNLtvyobYYUDGOdfRX1M8XcQPMvFpKkFcVP71gq11ftN4Bc%2B7D0yTqp5JK6Mj2SZvvfUBr5IlOFx3qKyhCJEXI2rhtWoNEaSaAnpeu21PzHYoosGN2iDw%2F%2B1dLpY&X-Amz-Signature=03708387de54083a14ea3195be75b002e5ba3edafda030927596ed56e7e73630&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645VNHKPW%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBWqhRLfSR3bB%2By3aaWnihrCupmFWhV%2FE9KpJPVF4seKAiEA102LIHxayP2I7I5l7OuGc0PAxIszn%2FZxsy5dn8gM%2BAkq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDL%2B1DKWtYhZkwCFFmircA00YrloQF2kZ%2BIQ1jkdZsFsxLqWxlp4cMaFLycAPHzj96Qzo6HfOXG7Z6GrKG0n6jiZfrm25ks%2FkZw6MwKkRA8gBREDsb%2Bzkel1UjLUmnxTKGnOpiLnHCeorchgtj25DNsORZ32Twt1MXCcBHHwwWVhLz8vk3TjWDh8HngmbsxYu2Oa%2BoU3JE%2FmKo3cCHwQT6WxSbA6uCn8QLMZ02fIBQhVgnad688RHxoB18T8lYycYxQFhxKzvwN9Mr8WYLSHuYnc2RGPdV%2BNDQg70Mx403en3X8F7ONf%2Btw2%2FrHNAZ3Fnq2y8ONLPqknuYq4kJSaU1TQ3%2Fe4VPu84vfnmwk2r3ELKbrrlL%2ByyxBBgAKgkyhFCnSl4g81lDqgJ7TZJ%2BcdyyA7QNeeuDJf9N%2B0RzFBDf32A%2FPY9l%2BmUnymX9fWZ2lvlLd2z0Qe4ZV6bRPQTkHknANCILcfjSDNgM5Sww8Kzl%2BgiavDfuD7AxwIYwuvPFudbsU5%2B6xywVDpoMXJ7CtYxUyxNgFlpRCnMZlYg8%2Bxu5ag3h7f8eZ0Pv%2FjWLZGbXxBF8OzOlZwOj4EpTpuA7WcYKoltRfX%2FLvEMNR9XOlKMAf%2BnPNPlZeL6qoqUlkfoSvVp2xbjEf4cxn7EzF3gMOiZm8sGOqUB03M6%2FdMbteRk0CdWC7LOF1XbJEnGrJEZHGVpEOqf3x4UW4piLeSziMwk3dzAZI2Fapc7MNO9B9cssx0NqyWK%2FI6Kp14bU6dXF3Ba07r91HfVC9s7gxQQrdhHG9KKOY%2Fymjut04sQlZl8xG%2FxB0Cq%2Bfre1eS7VvN1XiY415jM7lHZH3knvQLNuI9FkQvf2YIohAR%2ByRnmEetyFF6iBKpuj2tBQCYj&X-Amz-Signature=2b310559f5a67b9735a2d40234d88d132fb22b5f35f9c66299d3bc200afa81e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645VNHKPW%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBWqhRLfSR3bB%2By3aaWnihrCupmFWhV%2FE9KpJPVF4seKAiEA102LIHxayP2I7I5l7OuGc0PAxIszn%2FZxsy5dn8gM%2BAkq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDL%2B1DKWtYhZkwCFFmircA00YrloQF2kZ%2BIQ1jkdZsFsxLqWxlp4cMaFLycAPHzj96Qzo6HfOXG7Z6GrKG0n6jiZfrm25ks%2FkZw6MwKkRA8gBREDsb%2Bzkel1UjLUmnxTKGnOpiLnHCeorchgtj25DNsORZ32Twt1MXCcBHHwwWVhLz8vk3TjWDh8HngmbsxYu2Oa%2BoU3JE%2FmKo3cCHwQT6WxSbA6uCn8QLMZ02fIBQhVgnad688RHxoB18T8lYycYxQFhxKzvwN9Mr8WYLSHuYnc2RGPdV%2BNDQg70Mx403en3X8F7ONf%2Btw2%2FrHNAZ3Fnq2y8ONLPqknuYq4kJSaU1TQ3%2Fe4VPu84vfnmwk2r3ELKbrrlL%2ByyxBBgAKgkyhFCnSl4g81lDqgJ7TZJ%2BcdyyA7QNeeuDJf9N%2B0RzFBDf32A%2FPY9l%2BmUnymX9fWZ2lvlLd2z0Qe4ZV6bRPQTkHknANCILcfjSDNgM5Sww8Kzl%2BgiavDfuD7AxwIYwuvPFudbsU5%2B6xywVDpoMXJ7CtYxUyxNgFlpRCnMZlYg8%2Bxu5ag3h7f8eZ0Pv%2FjWLZGbXxBF8OzOlZwOj4EpTpuA7WcYKoltRfX%2FLvEMNR9XOlKMAf%2BnPNPlZeL6qoqUlkfoSvVp2xbjEf4cxn7EzF3gMOiZm8sGOqUB03M6%2FdMbteRk0CdWC7LOF1XbJEnGrJEZHGVpEOqf3x4UW4piLeSziMwk3dzAZI2Fapc7MNO9B9cssx0NqyWK%2FI6Kp14bU6dXF3Ba07r91HfVC9s7gxQQrdhHG9KKOY%2Fymjut04sQlZl8xG%2FxB0Cq%2Bfre1eS7VvN1XiY415jM7lHZH3knvQLNuI9FkQvf2YIohAR%2ByRnmEetyFF6iBKpuj2tBQCYj&X-Amz-Signature=2a1028d9bc8e73426fd515cb2228acdaf6fd7204ecd1d13077f4ba6820cc2756&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKESPLIE%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICYAsV1Rr0vNflntolUuYoA15iBwUVBYV%2BqBXig3McqbAiBYLNyHZoVNFjMKeoDyAeIPTLszzWZKz6xAfhPbZVATbyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMMU91S9J8GEMh5ftnKtwDtJTGz2CLGuewvJ58Q5yUAZDu%2BhlEseAdPYSgpilJ%2BPPgCTeF6m0iMulAgWCfuT%2FIZ1PCw17TlxZnAS0OhNR40cyG3T6%2FjQ65idVWa244pEF0TTRaq%2BLd1vTW9pyeeEj53ZwWlSdoIBaaMeWtT2RBwXsVaFsQW5w%2FJGYYXp5bGmMwgm%2F7Qo70xmFWqeLBZiaiBx9aisHhbkvX8uZZ3xEaHC1N4e1iEAm7Z4FvVzTl9GfVRQFkmA4Ct%2BFcgnJhEn%2FKu%2B58Y4uDq6R9R5bwHokxqb2G4ULfyClUc3O5DKgNZgCXMcuKwJH7VfBTJZMtEEiwLrzlHyzmcVJSPDCp%2BNolTALmgV%2BMjcCYiXzG9HNpP7n%2BMcIHieHc3GUL1atKnWjUINp3nEzFFDUIRpQjPXcLjqZJBxScC1MRhOxwAJGKRInQBtXEuuR4yMB0pOnZvb%2FlEAAfgJ9HeEZLbZLRpW0vrGdRz0ISUGcuLBfW43jApIxJG2tZhUOEqGdxKfuH2x3l6560w79vCddpXpAR333LjpG29PUtL%2BZ3oUWeYjy24lkXNguCncLqt9HYXPjBFMDma1Plxl%2B6aBpqyGwb%2BBZldNdBbZtzj5IXPwYOqUju%2Btw93VclYuBuB05M5Qww3JmbywY6pgE52XwxAjVCPWK2uWOsietsfEuNhy40uwyO3Vtk%2F9XL9G%2Fq7khtOgTKjDLZ3G6nwmsoFMLXV%2BDrP69mm3rUwQFKDu5WoStOOsEW8rjVhsZnOvMdZ7Rtemr0FdKXtTbsCp5d9CRMnuFjrBNZV5cM1Vu0HyMsoEzXqEP%2BLhqrxFR%2BiiMVf7nlLDlvO8lRw2fiYh%2FdWj9%2Bc4K58fkNRYWgzyxF%2BVml4ZD4&X-Amz-Signature=204285ad198a17c1b35b00feb17bc41420ebeab6abdcc9f276f0ba1daed9cb71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4FRFBAB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCoqy9A5RTq8fmQXjaSXlJI01dXSBsSduTRfprr%2BSML2AIhAK3KnCbD5Thz6YlCNJmxoRSCPz%2FlusdXQrGqyTRKAf9gKv8DCBAQABoMNjM3NDIzMTgzODA1Igz6X35wJRASIT070wMq3ANWbcI6SnWlDiQZAFdeQeZhiKrJd%2FeM7EK%2Fuk%2F0lvB8jRZoLzCqSJLtZsSc1CbJljZnqlDOEEI608aUqN3czxQPIt69izmuaOzLDtK4KHX46iSjQ%2F2zCb%2BEcCAl%2FzX7qQc7UWdyUtDP4hkyk0IgeqFAbEe1fj6r9V3dXdBenTZB%2F9PrISEEadwzAoq7zuaMbwlFfAVcwMKGMQApY4roZTdVXOGoBZgaBrIAlTl2yM%2FRZINn9acs5zf5%2B%2BYDBTDR2MflQkA0qeS1m%2Bg%2FyQbGZ0kPkguxFe%2FtKo6yKft0ObUDeOMUP%2F9Ip2vaVIvEyugfWds6vrQ3OOgEDVdy%2FhUnuI%2F9BiXSWmKn%2BrvUU2qx2eM21uT1cxMra90cp4bXjAgUxvJ84QEoPyJOPkfHCpZeR0YaggrNr%2BfiuAI8kKENNGWJygCRss45Z6RklHI2q7Ahh8cJmNj7Mw7E1WOXwkjxv4Wg5JhhY0MFp58FOWUF7sgpj8RSHq4DCvLBwu56oGn4IStLMJ08mH8ay0WzyWJNdEx1jDKHBHJHyZUak4aKwuwaYt%2BuJamkHw7jiKX0x%2FSfmt04inr9YcKxlXhHAmgZx7Fp9vW0LPxywJnST%2BkCFa932yy7d90npJa8ylBkoTDpmZvLBjqkAXrU9a8732qSvpzJ6obOlkk7kjhA5XTfYIp7jkryBUxX3W4w4c%2BD9Wjv6LNbEzuLKajCI0L3iyGsDtvkkCM1EL6c%2FUShwbAUGmLjKpAL6gWKebSyswOnk0yRVnYX%2F1XREAMtjl1azcWI3UwRH4rjIKuAvbpmq9n7ZzQzL7gRFLhgGbuAhc0CJIM5Buszb06%2FpzOg47Nn1iPj7VOBgwSHUK%2BdOnP%2B&X-Amz-Signature=fdc131b7f5854d124f44fc9a956599bab267f95173e9b42ebef54fa8c440d5d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4FRFBAB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCoqy9A5RTq8fmQXjaSXlJI01dXSBsSduTRfprr%2BSML2AIhAK3KnCbD5Thz6YlCNJmxoRSCPz%2FlusdXQrGqyTRKAf9gKv8DCBAQABoMNjM3NDIzMTgzODA1Igz6X35wJRASIT070wMq3ANWbcI6SnWlDiQZAFdeQeZhiKrJd%2FeM7EK%2Fuk%2F0lvB8jRZoLzCqSJLtZsSc1CbJljZnqlDOEEI608aUqN3czxQPIt69izmuaOzLDtK4KHX46iSjQ%2F2zCb%2BEcCAl%2FzX7qQc7UWdyUtDP4hkyk0IgeqFAbEe1fj6r9V3dXdBenTZB%2F9PrISEEadwzAoq7zuaMbwlFfAVcwMKGMQApY4roZTdVXOGoBZgaBrIAlTl2yM%2FRZINn9acs5zf5%2B%2BYDBTDR2MflQkA0qeS1m%2Bg%2FyQbGZ0kPkguxFe%2FtKo6yKft0ObUDeOMUP%2F9Ip2vaVIvEyugfWds6vrQ3OOgEDVdy%2FhUnuI%2F9BiXSWmKn%2BrvUU2qx2eM21uT1cxMra90cp4bXjAgUxvJ84QEoPyJOPkfHCpZeR0YaggrNr%2BfiuAI8kKENNGWJygCRss45Z6RklHI2q7Ahh8cJmNj7Mw7E1WOXwkjxv4Wg5JhhY0MFp58FOWUF7sgpj8RSHq4DCvLBwu56oGn4IStLMJ08mH8ay0WzyWJNdEx1jDKHBHJHyZUak4aKwuwaYt%2BuJamkHw7jiKX0x%2FSfmt04inr9YcKxlXhHAmgZx7Fp9vW0LPxywJnST%2BkCFa932yy7d90npJa8ylBkoTDpmZvLBjqkAXrU9a8732qSvpzJ6obOlkk7kjhA5XTfYIp7jkryBUxX3W4w4c%2BD9Wjv6LNbEzuLKajCI0L3iyGsDtvkkCM1EL6c%2FUShwbAUGmLjKpAL6gWKebSyswOnk0yRVnYX%2F1XREAMtjl1azcWI3UwRH4rjIKuAvbpmq9n7ZzQzL7gRFLhgGbuAhc0CJIM5Buszb06%2FpzOg47Nn1iPj7VOBgwSHUK%2BdOnP%2B&X-Amz-Signature=fdc131b7f5854d124f44fc9a956599bab267f95173e9b42ebef54fa8c440d5d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHMVD4KZ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T230153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD6azbcvWiGWAovBi3yMXXb9LMxqGNumDWoALxbgY05YwIgD4L7KScvHX9U0HZDPAkhlzw2JBPtFkBiUFtuDRAjb3Aq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDBIojy3w9nqaHrJM6SrcA1nDwLYurvoG310TNMtm5FK0BPBc6WrZVwzs1Q3HeA%2FouA1JuCJNU0isBkAToMs56FiSOzg%2BkZgjOptLpIGEvJsMnJlDXqExO32L4SnLIXIb8f1uD3viph%2FXc1XLCgWvPSrLSDwDnyBdods2ooziaZzUI%2FZsw6g1I4UN1QJZaJByn8Rk32JPJd3dK6eMyGw3TO68rB%2BiwUcSZfFII3JNZNM6ZPefHyZ4X9zNmZOx7dlsyBOp0jcl4KGHguKQ%2Bq1%2BrfGwOJ8Bm8Nd5BK3uGtXpb1JC4PyKav01pWhGfZaqbXxIMO5ORs7AAi8Yxp%2BNx4Fi9WHH3ENDtX0YVDfXWc29txIKzjZrc3uDJlkSuSN%2FxR%2FF9fCIGmprGXApZFtYGdS1eB%2FPuoWkzZIV5rQ79%2Bw4fJxbxQP%2B6CQxunNjoSJVqLKcWZ%2FnCOG5k3RZAr8cKjhEaWa1W7vrwdFG7pxev9aDMbZweUqjm9mcUypXV%2BwyODPiKDLySYItI%2BqE6G78hO5gOFucb81XA%2FIyLl08ir7cJIZOG3fZ164H%2BZAakFSkIB1n2iOLZ7eQyI%2Bf6DBopYmXna%2Bbq2%2FqKvFrhe%2B6wYvOsqxDbVjL7mg58J6TYzU5SWbcO8E2fmWRVasBJUhMNeZm8sGOqUBM8mcIJdMIAF4MINHhHTv4IVE%2FwK%2BkCTRb%2F0OPbvcxcwVyWrwU0gRMRKmdHxjneFRPcdtmfwxwqJF93G%2BW96NzVGekRwQjmEguYGReERfjBmc2fcFKHuVjv7lpXWwjalKjLv0%2FGE2z%2FPlEE6nMrIt9R913OF9M7MiImFBbXeUOFgVO7Jrc%2BHEY2RVOHNxLveHAg4oLTp464NoMEq4h%2BQZhwyqyfpq&X-Amz-Signature=0724b0f302b3a7e988f7fd40c18de17f6984610c43b2e72bc500cc7534c70ba8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

