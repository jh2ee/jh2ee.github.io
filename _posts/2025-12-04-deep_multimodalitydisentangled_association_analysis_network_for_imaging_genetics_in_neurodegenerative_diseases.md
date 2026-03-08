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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FHSVAKA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIAgkcyAuUughZZeJ1MOdwzVa3G1sunREZ1IF2AmODEUHAiBWcZKxowefpa%2F8bounZxBSCecGocMHVpunvEbKsD9qyyr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMzMv4l4JYbsbRgNxMKtwDa%2BKL0b1572T7xlrbw5rQXn4tnpX2jxxif5dIY%2FB%2Bgv84WHDVxtLvwo27wXYvYA1T7gmzq7SUWH32HumqOdXcjl2HoUnpsdQDVVpTtAwGlSffq41hbPlD4i9shbjgN7Qn%2F4DZg24%2B299TPlctrf3XL8%2FPvmM2uOUmWOO9FIW7OL%2BAQgxW5xZpYj8Uuf695gbC7Ca0WrYZ%2BRSTL0vofKijcE%2F%2BeJOlsjdcnGp%2FKqF5Ttzv3%2FR5L0B%2FT3au0vb6ab8XHAoAUhtY5qAXvNhvaT%2BshvShzATTKAt42aALHZKRptrl6Kgz0fZxomeZWF1C55XB0xgydXaYed3HF95b75Oww1tE0FAd%2Bm6Xq1kn4r3IneYzW%2F6VXmGEx0wniuoaCjkPoh%2Fl%2F0qxv9FKkQNp0TCYnxYq42BM5M6KN%2FBzzf%2B65vmJNE3Z5UHNOilsPFCCXEkYo%2FPeyVY0Ct%2FiQYnyKeKwyeNWzNeD%2Btfxf7Acnj%2FTKW94OZ2m%2FWTNZtSp%2FiKYaybbDrkHePc2BYgVrz9FU1hkw1Vo90xycqt7Qp4ZN69I3%2F%2FQSkZq96kGpRJRFGS%2FGFtNFdWWhranQT3k3tREmLti5x6iPxfpLcB%2FkWm5o00qpGt%2B7eYqnwAhFPyThE0w%2FYGzzQY6pgHuQtf47ItX4VuOIvSrXtW7dQ0jIb2fVFvX2AECuDaL9AZXsC9sZeePm%2BU3IYlGxsFQpmJrSVxRJop55Qq%2B9gVyQ0DqY%2FCxtd1J%2F96YhPrfpTcqkgxCuf%2BMUL7qu7leOC1Wgdv9GF4GcLW%2BlF8lHXwbPzxyOmVEtGFmgUy%2BWC4YOqtBizzlBiGpj67gALGAjQpJE%2FU%2BQR0lc9fXZ9J%2B6zwmM6Wfdenf&X-Amz-Signature=0484da7b4556ca3442c0982a5ad13b4b091d74d9e5f9f97637940a1e206039fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FHSVAKA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIAgkcyAuUughZZeJ1MOdwzVa3G1sunREZ1IF2AmODEUHAiBWcZKxowefpa%2F8bounZxBSCecGocMHVpunvEbKsD9qyyr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMzMv4l4JYbsbRgNxMKtwDa%2BKL0b1572T7xlrbw5rQXn4tnpX2jxxif5dIY%2FB%2Bgv84WHDVxtLvwo27wXYvYA1T7gmzq7SUWH32HumqOdXcjl2HoUnpsdQDVVpTtAwGlSffq41hbPlD4i9shbjgN7Qn%2F4DZg24%2B299TPlctrf3XL8%2FPvmM2uOUmWOO9FIW7OL%2BAQgxW5xZpYj8Uuf695gbC7Ca0WrYZ%2BRSTL0vofKijcE%2F%2BeJOlsjdcnGp%2FKqF5Ttzv3%2FR5L0B%2FT3au0vb6ab8XHAoAUhtY5qAXvNhvaT%2BshvShzATTKAt42aALHZKRptrl6Kgz0fZxomeZWF1C55XB0xgydXaYed3HF95b75Oww1tE0FAd%2Bm6Xq1kn4r3IneYzW%2F6VXmGEx0wniuoaCjkPoh%2Fl%2F0qxv9FKkQNp0TCYnxYq42BM5M6KN%2FBzzf%2B65vmJNE3Z5UHNOilsPFCCXEkYo%2FPeyVY0Ct%2FiQYnyKeKwyeNWzNeD%2Btfxf7Acnj%2FTKW94OZ2m%2FWTNZtSp%2FiKYaybbDrkHePc2BYgVrz9FU1hkw1Vo90xycqt7Qp4ZN69I3%2F%2FQSkZq96kGpRJRFGS%2FGFtNFdWWhranQT3k3tREmLti5x6iPxfpLcB%2FkWm5o00qpGt%2B7eYqnwAhFPyThE0w%2FYGzzQY6pgHuQtf47ItX4VuOIvSrXtW7dQ0jIb2fVFvX2AECuDaL9AZXsC9sZeePm%2BU3IYlGxsFQpmJrSVxRJop55Qq%2B9gVyQ0DqY%2FCxtd1J%2F96YhPrfpTcqkgxCuf%2BMUL7qu7leOC1Wgdv9GF4GcLW%2BlF8lHXwbPzxyOmVEtGFmgUy%2BWC4YOqtBizzlBiGpj67gALGAjQpJE%2FU%2BQR0lc9fXZ9J%2B6zwmM6Wfdenf&X-Amz-Signature=0484da7b4556ca3442c0982a5ad13b4b091d74d9e5f9f97637940a1e206039fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HY2ACP7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIByzF98mpQ%2B24BoWpzM8ZscYhEF6jmVpyyiPd7X3g8amAiB8h0ZNLEL6l3JXBbp8c2vTA0WzMdRfo06Sy%2BAiyzbCVSr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMsOlw%2BwEFCjL2oZatKtwDMhGxtbaQkqVG26eg86vBTRHt7nG%2F8JFlXFER0Ohbs6nd0%2BcCgpk7ZPbk7zW7ndKwVGa4WH9kMEDTlAEk37yzhQfuXbAsODuP0cd6vjcFe7iDiG62ioRRwdhOzVMIpGjZbYu0kymQbfUfoVmR%2FN%2FhB9By6Q6XBNVQWNOOYWxzvaA9%2FOW5qO1v9hutVFqRhU4x5JhbyVSsKdKR6fosNrft4iN7ON01Qafsuyl0WEHMdyvlBD0oiJ6I01pwEh1NEy9PaGFzg5w%2Bm7lpxDrFTTeC66ZogBnMunVG%2F8SzuS1XheLXLFHC8XqoPZReYqpBBasZbWGN2nmMbhi3s1POIpEWok1UVTToyg9Ihu3VoODrOzYoYugd9Eq8azB7hecXDf7o4xSqSEFRKwJ2pIN2XnfFHgFnXjXBcCq7RzJrIRbf%2F0LPjNGrerWPRcg30ZS0kJ%2BBNL0tnz9i9V2ZI3LqcDbhlV2Xqxu4GNUJLG5QQlHiM7xcJ87%2Fc%2FoGw%2B3lCNLdvaBAUT0KemBUzC%2Bl2dU%2BekN2rgCWuMlXhQd551XbX6swUtGnfoX7MvCjlsd18aA4PDZsqL7kScuYu9CKCzluZ88zOu1KzYLRbIZvyEMIWHpFMrp7l0oaZa1eUzba9KQwu4KzzQY6pgFPt29lHD5rXlVG%2B5bvXc%2BoDE%2FZtGn3YXjZwGFU%2Fr8bXL4ILENw3GlXE9iGE7kVyQ4JVfl%2BvMVurHNcVnx5EmGuOVaNTuspAhTVDT0YNs9KBKfYP0ypIlLYgkh6CpgZrwmAgLBOc16hlE674ntmam6zOp5NZ2UmK%2B8Vah59D%2BJc5vwioVbrAR8Mbe7H%2B4HiAM6Zar9Gg0E%2BSLliXml3h8D7J8jKZZ2U&X-Amz-Signature=a91903983aacdbcb952f9989327f49dd215f2f0bea58c4c75a7371616d1f4f54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UV5YUH5I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEfcwLy6rsJBefbbhMEj7F8w9FSPhRKOi8toRBIZK4VOAiBG%2BuDIu05Q0bP6Yg5ynJxypPii8FORAdSP982yEV8XbCr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMHpznYbE2lNnV0E2JKtwDUJDr95l0HmcbzxtrvH9HnKKUGG4xBaGtONgn0UKfnd7Z%2Fv5wIPIFuOrmcAEfhAAz2rklxSYln9f7PsCL4mIn0v8oul1B1A4Az8A0%2BTcHcCiuSlqiPwTUzyeI3ZXTGqtzgZGaFSoKtBcHzq07jb61Hry1lcrJzHWW1vkxzatoban1qv%2F2ydWBFnb2xk8je28A6qCAfLav6ZnmROwjHTBsmyTi4oBKvNWbv7av0%2BVclS6CGjAGwtIiultxVTvnChaU%2Bu8fnx66tNcQ39D3rJyUQZfPTs6w%2Fr1QTej8ZXlqmdWOyc6V3ACrR%2F9Zn8D2tebTMI1I5qJ1wyZrVv6647HUMhlMuitrFOVPgzNwx3fJ4WPE%2FftxeGoKL4uzlRpDlrU4DrCQdUx7ys%2FvzNoqBbQ0pGoVLIGZvP2Ux3JNfTUQj%2FmboIP2K63fPVfpAwh5zyJ8GKFI63q0ZS%2FzMQl5WC%2BFdofS4Idfij3f2i3FMgGPWG6mekpjVJDnDhkaGK6rWDofW%2B1ad1b%2Bp3jposepgNY%2FKdc0PO%2FShOFTFuGd8%2BAVraVStATzWnEXs%2BV1CcRDIt%2FMQP0NyKtHHlxpPl1axNVyo7Su2xU8sWZvpMcPBQ4ackzMVPaMm%2FG62xhuk2cw%2FoGzzQY6pgEAeb%2BwNspUS4dk8bLApaTUmzRhafJaOVVOw%2FdobqnGVLVvyGv0qtpSBAWTGlPIZzz%2FEYW8gvYE%2FfDVq%2BXIrmz9r7csdoZ8LRLgjvsIo4E0MwCoFT27HNtxoBbfgEl%2FwvbWaXxIxCtXRudTveIHNc9nobaV56rOF4L7FFo8ch5aJp7BEFsypiEde7HnRierT6YF4ybwkOk6cIkD2MTKC7ltQJdP9fQh&X-Amz-Signature=ec318cf3b87dc5b177b1581c1e4f95e30f867edddc705d205815f987d9aef050&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UV5YUH5I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEfcwLy6rsJBefbbhMEj7F8w9FSPhRKOi8toRBIZK4VOAiBG%2BuDIu05Q0bP6Yg5ynJxypPii8FORAdSP982yEV8XbCr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMHpznYbE2lNnV0E2JKtwDUJDr95l0HmcbzxtrvH9HnKKUGG4xBaGtONgn0UKfnd7Z%2Fv5wIPIFuOrmcAEfhAAz2rklxSYln9f7PsCL4mIn0v8oul1B1A4Az8A0%2BTcHcCiuSlqiPwTUzyeI3ZXTGqtzgZGaFSoKtBcHzq07jb61Hry1lcrJzHWW1vkxzatoban1qv%2F2ydWBFnb2xk8je28A6qCAfLav6ZnmROwjHTBsmyTi4oBKvNWbv7av0%2BVclS6CGjAGwtIiultxVTvnChaU%2Bu8fnx66tNcQ39D3rJyUQZfPTs6w%2Fr1QTej8ZXlqmdWOyc6V3ACrR%2F9Zn8D2tebTMI1I5qJ1wyZrVv6647HUMhlMuitrFOVPgzNwx3fJ4WPE%2FftxeGoKL4uzlRpDlrU4DrCQdUx7ys%2FvzNoqBbQ0pGoVLIGZvP2Ux3JNfTUQj%2FmboIP2K63fPVfpAwh5zyJ8GKFI63q0ZS%2FzMQl5WC%2BFdofS4Idfij3f2i3FMgGPWG6mekpjVJDnDhkaGK6rWDofW%2B1ad1b%2Bp3jposepgNY%2FKdc0PO%2FShOFTFuGd8%2BAVraVStATzWnEXs%2BV1CcRDIt%2FMQP0NyKtHHlxpPl1axNVyo7Su2xU8sWZvpMcPBQ4ackzMVPaMm%2FG62xhuk2cw%2FoGzzQY6pgEAeb%2BwNspUS4dk8bLApaTUmzRhafJaOVVOw%2FdobqnGVLVvyGv0qtpSBAWTGlPIZzz%2FEYW8gvYE%2FfDVq%2BXIrmz9r7csdoZ8LRLgjvsIo4E0MwCoFT27HNtxoBbfgEl%2FwvbWaXxIxCtXRudTveIHNc9nobaV56rOF4L7FFo8ch5aJp7BEFsypiEde7HnRierT6YF4ybwkOk6cIkD2MTKC7ltQJdP9fQh&X-Amz-Signature=331ab2eeffb8a611d32bf0f6f1eba778cf301b1a9de2ad6b53fcd0c533feed80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZOEQ6O2%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCgXBwwHdpSpKDUwmtui9Q%2FYZIhZQvTHg%2FDYZN6VFIOIwIhANMnGJbqusZUULO1A14V9MwNhe1FFeiQp1f5zp2qpT1wKv8DCAkQABoMNjM3NDIzMTgzODA1Igx258o5SOHMJ7etrxoq3APxYvGNB9QB%2FB%2BiZAs9ZuFbjopqPGTf8WMY%2FbuocjGkQuI0XBILTMBiQ%2FEiBr0rexr7dWVcP%2F5NIdeEsytG%2F5uo9SibD6ZeMAjPS8PcgRONPV8PCFlCfX%2FbOGwPcKHy%2By8lAQ5MbXQTfdNCpLAMFHF9SGoB8GuuDsBCC7Fnlbjw%2F2e%2FSC%2BisWe%2FTbN6dSKVaQI82rZlE8aapwW6ZadInaxBdPNTHpvfb44CTjg3wkwZY6h3G9hXXHc3fmAG1Vjgx45b0KPC9Jyy0%2BbIORiqZn0tdazvCgb2dRqYJgEiU8m23Imcw%2BmtRsO9L2nACt6k4ZPsp%2FLNFYUWz%2FhAOQ1e0qvEPlIRZCrQwWPA3hqIFHzHpN5elUT4zLpQzdqIJWoMWYKbeE0owNELwQOCNK6AMb%2BC%2F9cuG1MM1o3MKjJ4Ayex3IR%2FSDsxM45%2B6t0wQDdj5eo26IrsjY9Qy0pdyWrjdAe8n6zTeZoFeSq1IyPY3N17oOZBwGrz6PClAfszb2NegF1My77OCEwq6hyF57Ob%2FuQsMK93R3eNo6yxjPHNIGjzRfyxFL7ti4hERKN6R2MeMI%2Bpc5Su3UwicOyMWp3KJWqSXjk%2F0LOOoxgBgcOP2nD5JtTlg3qQe1K5kmaZTDDKgrPNBjqkAQnd7xNbQGtiVWwRJouNrkue%2BF%2BFZSHnbi0gERzDFkGOWwQQZPCch5LM8VMA18VVh%2F6ysLz6muEg23iEufXTprIbjvB8yMgShADWtq%2BLLKnL4EghZ5drxQ1Z8h3lbZiBCr7seveoj96ZyKpMMVsoD1n1TP1xApEMLDurIT%2BNqIel8tChp5Yn0E7DRpVb%2F0tzDVCLSdSXjrpRn7qzt9XcANC48KgA&X-Amz-Signature=39861eb5566cdd334bab63c080684ba949f78c2f622d6d8ddc34bf8bf9c3fce9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZNOGVNQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIGv3xkkkr9iyTBik%2FOJwk576RZZer6Hwe6989c8D5iOXAiAWch1g5Xdht6q9acVBfduFRdrg9P8j%2FLXigOK35bv9kir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMyJ9T1%2BdXFdbM0eiIKtwDheQ3jQLa80pF3fFx%2FVKc2N7%2BC4qO0D%2Bh78rguywHGRtfuC9%2FAcKH7HK%2F0JFua3HAGcUp0fFMLHPURvMA9FW6lp2bQzlKoOzhZGFPo4F1sz8jZ5ZOU1FKU9nX5ehSbnwCy5GCSZhK%2B88pU%2BjS6GipF8hegyicE8li9eRNVsjVMEVMHYjbFQG9wlLr31GMtbDpfOFFMbe6nceFAnNwqQ8wNmZWHLAZROwgy70szjbMiHwLF237w1KcIxKUnDWz3KQ0hcDiyRcZw7989GLYs31qc8fKtIzCUo7h9M2b8QPkMRcC%2FxFeMp3QJDBT25HNwDzaV8S3CBsd%2FELeKHOMZwp5gEPJrddxDoQ9Ocx7K4B3vyJxwLkM9VRPTYP4eunx5lybSHcsSA6a0fh2QdDxF2G7tob9H9Mw2sg1tSbD28AYQO5muTz3izD7f3HKoSqHDhnU3U3FKgu2vt06E00CffjRy8Qaww%2BeX5IB1EiZMx8d%2BpyJ5ddu2K5Ol0sqK%2FjMCkZkMp5LLAhLvg1rpLBzS0URcgFcG7l6dyY7oqDa6DpUAw0gU0EsouwE8GhgSO8N%2FFBgm7sa1hDupWx4FPgOKxerI9h2ILUHbv%2FPNvnaeI6cTsfxfcmE%2F6MHP0cBARwwnoKzzQY6pgFQtyePBSDHojs%2BUH3q9PyY3budDkjEePCoQPJGrD6%2BF5tTwH6lPjZv4t%2FtTncgJ%2F%2FvHu3q%2Fw%2FYymdDPoHub756ap%2Frob3MQLTVt9dhdg10ZEiYFrdSy3AWoogbg9nlRfG%2B3M1QYZFywDAbnBy0JGRitvixcjzCS%2FndpbtLyNqFegHVGL%2B%2FSKZ3Nhx8BLbdFm941v5xAGaYhWEJeUX%2F8ea7ZhylgCXd&X-Amz-Signature=fef4d1530028646c865bc53b007e82b052e536192eb456913bfc50e4fe48cfa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZITYAFJR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDU%2BhgGRVSWbu4d6ZdQyGKk1s1NtuUTyk9qbVD4nCbCxwIhAJeK0BmPpKqDzKMl%2F9BRRSltna5H%2BKUnoKRGLNObQRSQKv8DCAkQABoMNjM3NDIzMTgzODA1Igy2FHTx80eoRvLAo7Qq3APLAXHfdLPTWDF7PSVyjNyZhBROFcCA%2BV9qY6NGCT9COCmXALWeX1onWn6VZ%2BIg699HCGcBg%2BHIV76se2Fc%2BJevn7Auep2dxyCTT7tf%2BfsgQgHT0Jq4LcB5fGBSz6q%2B96W7OdKbEA4%2BN2lWROHH4UbvUqVNerfbo7u5EVjcrOGgql9WzoMLE5yx3kEjIKbfFr4tH4Xue7w69JavBVGcqEE7Sv20Q8aCRJVaUHeySvhG9Sho1OsoBSUyhcsL2Yu9ftXVlyX4L%2BqT3Z6IxDjL%2Fb31bjCt%2FW%2FcDaVt4DdIkWx0srv56gLtrcyc391yX7CX1dSQdgq2MSF4KniIneg9WbGfGKOrvcQDrVagx9vVynN%2B4iPTTqDd%2BUHVSfkjQpm%2FWJNQCUIopopQjZ12BFA4e4kIjBFBzytKFyBx%2B03%2FH1Fp6zzuHcg%2BatQXaPjzcpH4kAcypQpFdt4xLPMape89PPpAoPnFECfcMlLhavcWE66%2FscwD%2Frsgu0UHedpXVKY6kkO8TXCW7O1aMNjg0r9J7O8pLTEvasLHvtJGmAaV785ll3VyCCXYsBa7My%2B%2FV380jWAhZXdoKWfDoGIylg1dmNeX0%2Bopd2a0nl%2FYJF%2BkOjZV8T1PikzB1QmTZP8c2jD%2BgbPNBjqkASYH1lBNU57ZWB0GeiFoERNaMUsruHmMhR3SbAGDzRCx7idurt6%2FgGuPWIhlr0l5u1v2W%2F6nWK2CLSFnS9WgTN8Ds21Km1IW3tFQ49w%2B93YLjzgBB1%2FdJvSi0pcLHCsF5wBZSmoeacRFUIVXkcjXi3zvZzrZKNBfFMhqZZekWHTl%2FY%2BdRwm5XgvAmBD%2BResavlS%2FtfdDN7cjv18b%2BGboZ62bvCBC&X-Amz-Signature=c2d0d41ec33b283a5859574d11e0d59a8ce35aa3b5913230404a64a1b472e8cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y77YIT7K%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIHozB6bOse%2FxnLd1JZ46SSpjkOAfVbNs6mJ7N6Kgh4KLAiAoNJuCRpmOzRYk%2BEC%2B1VYdNC7og75FNvTRgWB28Jiy2yr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMG9qYUorm8fIFH1R3KtwDGTVolXDKZxklOhyEOLY1MQNXqcagjsiXUF6NfIWzvkQFJblNq4OB0gL7jcU%2BlVVQbV1jkS4k%2BwN9phggUc6%2B3OTFv1WkZnyf5x0t%2FodPkLhLdzFXmqZnQhK8XjxXK0F6Au3ek5OAoK3knvdTa4WTBeOo6z9ldyLmNhCwAENP2svA6e28EYBl0h64%2FQZBrej9I18k7wwLnbmLGMa4FBPGiXgJ7tYZVoHC3zldc2HS86Ldk7zf358CMgn9cse8d0kFaKrUb7NxesqGE3EJ71StybsrTIfdMDo8QEkqL2UzDfEQAAJw4JpI2gQrqJui%2Fv6boqp%2F2SPCQB8J4SleoEAa1s6W07gQbB1X9VUKXkvIh%2FTsBbbJWoha%2BMBmSl2QtWwL8DMd4nJE7hmarF5BXub8pYfBMho8yallelxdUGxpMmTOG9hvqZHsiKoz%2FnOKdMnkTmsYGtiXb190baIhbdEY6mQRVnZBOirWCPwdF7ofcWRwxQdFYPJZcbhyhqkB7IghcCSvyFvWeDcFfcXhd2AI%2F7Hb6OcpHI6AHPRv8Orw3QeIo5DMlSe68AYpshFOm%2BIpnSkJBRyNMVZC1S9j9vsDkSVOVkQuO5ZcafmyzCtf387%2FQ18OpFpN5DjkrR4w7oGzzQY6pgEABifPaY6%2BnXJmGlgFQfy1put8apblgn6bfYR2jC%2BjUdKlHnHWCQVGTohNoNl4MtwtPiI4jou4keUbuGXHXL%2FZIfPWrXUiNl23TAjEQjbjRtCpbePY5PJcmYIMA67FkSwww2wT9rusHLNBmzLOMEkrH3fcUvcVwlo8vc4UeCjNDRKIi7Mm69KZI%2BnPStxGfZpnb11JsjAJwMVXR3xF4rzzsgerHUZr&X-Amz-Signature=2d4058d38f68ef9e26cfb5a4943f6714c34be4d7ed50b50c529489181f5cb31d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y77YIT7K%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIHozB6bOse%2FxnLd1JZ46SSpjkOAfVbNs6mJ7N6Kgh4KLAiAoNJuCRpmOzRYk%2BEC%2B1VYdNC7og75FNvTRgWB28Jiy2yr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMG9qYUorm8fIFH1R3KtwDGTVolXDKZxklOhyEOLY1MQNXqcagjsiXUF6NfIWzvkQFJblNq4OB0gL7jcU%2BlVVQbV1jkS4k%2BwN9phggUc6%2B3OTFv1WkZnyf5x0t%2FodPkLhLdzFXmqZnQhK8XjxXK0F6Au3ek5OAoK3knvdTa4WTBeOo6z9ldyLmNhCwAENP2svA6e28EYBl0h64%2FQZBrej9I18k7wwLnbmLGMa4FBPGiXgJ7tYZVoHC3zldc2HS86Ldk7zf358CMgn9cse8d0kFaKrUb7NxesqGE3EJ71StybsrTIfdMDo8QEkqL2UzDfEQAAJw4JpI2gQrqJui%2Fv6boqp%2F2SPCQB8J4SleoEAa1s6W07gQbB1X9VUKXkvIh%2FTsBbbJWoha%2BMBmSl2QtWwL8DMd4nJE7hmarF5BXub8pYfBMho8yallelxdUGxpMmTOG9hvqZHsiKoz%2FnOKdMnkTmsYGtiXb190baIhbdEY6mQRVnZBOirWCPwdF7ofcWRwxQdFYPJZcbhyhqkB7IghcCSvyFvWeDcFfcXhd2AI%2F7Hb6OcpHI6AHPRv8Orw3QeIo5DMlSe68AYpshFOm%2BIpnSkJBRyNMVZC1S9j9vsDkSVOVkQuO5ZcafmyzCtf387%2FQ18OpFpN5DjkrR4w7oGzzQY6pgEABifPaY6%2BnXJmGlgFQfy1put8apblgn6bfYR2jC%2BjUdKlHnHWCQVGTohNoNl4MtwtPiI4jou4keUbuGXHXL%2FZIfPWrXUiNl23TAjEQjbjRtCpbePY5PJcmYIMA67FkSwww2wT9rusHLNBmzLOMEkrH3fcUvcVwlo8vc4UeCjNDRKIi7Mm69KZI%2BnPStxGfZpnb11JsjAJwMVXR3xF4rzzsgerHUZr&X-Amz-Signature=ab73d29a41d9116c6ecdbf2f560465c31aa1442e16fc63f781dec6df5bb522d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPAL4EIL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCHwXCNlc%2Bc8cUHxTyfc8tl%2FTxEGBBrwK0dElJgL%2BwzI8CIQCnCb9sycgOY%2BGRXqpHM1KgPlA9IBX1NV56MJRc5epDUir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMzjd%2Bz0c2Z1SOGGgXKtwD2yvhkKDFPTxBfbkMouVKYoRuDoNZw90Amjh6KjIb%2F5rlQ7RUvRoubHmzrX%2BxrRoxIjkcHPvdKiMSj4SLJdkqExUvJJiiedJ4uvm%2BuXo5%2BPFFc%2Fg43PYtYLkvic3Vhs7oqWuJL8d%2FBui27NXoPdXGq0WgFGb1T%2FAxIxYWGK09U77bEQQCbWlCD%2FNlbOXrGBCIdiwOI8unTAed4lGMqmZsyXRPluJTZVf8yPXEYpKrc41RazfKQ6XyV01WXnQgG24RLIIHYf3pKJuvdNQU3w1vZopWnHIoXojpl394cpcehzTw9oRZAjZ%2FnT%2FPTBSBy3q5YtDT03L4wR3oxgwHjjpF1W61CkWC43od4hgPwYBravoJ%2FuEOLXCAwUN%2FE7N0TVbyEGLP83mizs1HXtNvUUljNyAlOHhMtNbnm%2F%2Fd6nV4TFPo0D0QqjrzUocF7O1NKVzJyf2Ppb0hPWxASS6rsZiSW1LKCt3mSbS5fDngVhKBLOKeHj6i0K8TS4BQtPHpKB6ZvAlRC7%2BKmUSksPI0pLTxIBH5tNLMvhI7Vf4FSOjgqkwopFkpt6%2B2HHIBmGvmIUl%2FkWvnEkFDV0SBsPBugElhmGfxR2eh13vBQdAOg7xMFbloVN%2F9GHcjFXpgwisw%2BoKzzQY6pgEW9Hz0rJI4lYDGxGd%2BB0OCEu4SauNhPkPlIs2g0EqZToxyYQKR8Z7CZccHDsZX8VRZ3VOxO6vAq0KwMHsMtDS8kY6CO5sA3F3KQbk6n2Z3Pv9OCRm9cDmi7f6aSJ2z9SWAiHnw7u7JImbQWK34Pxniw3sUobwZzxNVbAWj7DZ9q3FnBxd49o5KMrqiJo4%2F%2BuMXOjVt2qu8PtmnUwhclwbV9cSODgIs&X-Amz-Signature=ae59dfea9812553aca4e0f44687274c827faf4f0ba3741480092e1a3e0029747&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGO32TIN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCt%2BgptvnM6sUkmEq05OOp3mAAyQ0CcVbtfJN4Abe7hcQIgd1VNv%2BAK4Ef3mPlW9GilQqW3RzPxhn2ltrFgBEfSVDIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDOdJgLGse8hsVgnY9CrcA94%2F989t2eTFh6NwaZfieCeI4S9tZw%2BREgSskDUUAY%2FpOUYC3%2FpkfIaeoiDMIukXqC%2BdW61GkN%2FKXUWwIpA7DpUwficlH3YScZ0SGC0rZcL66RT%2FpDKUsn7cyVIu2IBD8Oy2DAaHn1iI8mj5THwtdxMjeLAgVF9QEHrQoL7yR42suN9uyLYKXfkQD%2BRVWPexEFKuksmnJ0qCV8MJhs86I6Tqv81ugMIfj3tPnZpFcXfx%2F6BARIuA1k8RUz4v%2Fo9mqojHZobTK0qI4yvP6Argq0eynerRgSF8bVWuy4RR6n4DB7h6riiX5G2cEMLk91%2FY%2F2SpcjkpkxSvAHBPnwnvic9oZOqY9PhJDBw42v2veRkg%2F6HjPOwj9FDvAB5TIJhgSKNvU3JHVpjjuTmACtK8qTbgBgGggZihbKdMNZkRQUP9bzVK4MBhw3yBTzND5eJv3l87sk3uaYWiF4uOkDxbKDPxjCL71A3Yv8AYgMa5SrBq8Z61QuEDTEu92OL7jUyytmyy8X1twmsxfcMU3fdfaPZYsNcUU9Bkk17KbHvIaTBi%2BGvfi%2FfLS5xHRPiz6hALGylu1hTV8RrAQtAruxzyNjNj27nKxXvXFgJ%2F4OWBc8N3KplN%2FymdA%2BzT%2BlWDMJyCs80GOqUBkeSGmDMDm%2FfzFsIURPRx636w0U0P%2BAfFO4lnZxoXTRSmNrqzQFhTRpX1gWSCzV6%2F5EVO8oAI7UTRTN3R7JoOa1M29U4vCOuLeIr70GlUQVYexlHEl2Zcq%2BrQMMq6VQVvJn%2Bh6I80VDtJbwfIPr8C%2FuIWrE5QwXD5Ej%2BtUswHWicspjhvfFWT67EGDMYIUe9aB7wLk2RQKnvJgXHUUgPJKlfuDCVd&X-Amz-Signature=e9c3d83b311ca2fa53723c8aac190ddd0e9c5a5f34167262c725c970677818bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGO32TIN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCt%2BgptvnM6sUkmEq05OOp3mAAyQ0CcVbtfJN4Abe7hcQIgd1VNv%2BAK4Ef3mPlW9GilQqW3RzPxhn2ltrFgBEfSVDIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDOdJgLGse8hsVgnY9CrcA94%2F989t2eTFh6NwaZfieCeI4S9tZw%2BREgSskDUUAY%2FpOUYC3%2FpkfIaeoiDMIukXqC%2BdW61GkN%2FKXUWwIpA7DpUwficlH3YScZ0SGC0rZcL66RT%2FpDKUsn7cyVIu2IBD8Oy2DAaHn1iI8mj5THwtdxMjeLAgVF9QEHrQoL7yR42suN9uyLYKXfkQD%2BRVWPexEFKuksmnJ0qCV8MJhs86I6Tqv81ugMIfj3tPnZpFcXfx%2F6BARIuA1k8RUz4v%2Fo9mqojHZobTK0qI4yvP6Argq0eynerRgSF8bVWuy4RR6n4DB7h6riiX5G2cEMLk91%2FY%2F2SpcjkpkxSvAHBPnwnvic9oZOqY9PhJDBw42v2veRkg%2F6HjPOwj9FDvAB5TIJhgSKNvU3JHVpjjuTmACtK8qTbgBgGggZihbKdMNZkRQUP9bzVK4MBhw3yBTzND5eJv3l87sk3uaYWiF4uOkDxbKDPxjCL71A3Yv8AYgMa5SrBq8Z61QuEDTEu92OL7jUyytmyy8X1twmsxfcMU3fdfaPZYsNcUU9Bkk17KbHvIaTBi%2BGvfi%2FfLS5xHRPiz6hALGylu1hTV8RrAQtAruxzyNjNj27nKxXvXFgJ%2F4OWBc8N3KplN%2FymdA%2BzT%2BlWDMJyCs80GOqUBkeSGmDMDm%2FfzFsIURPRx636w0U0P%2BAfFO4lnZxoXTRSmNrqzQFhTRpX1gWSCzV6%2F5EVO8oAI7UTRTN3R7JoOa1M29U4vCOuLeIr70GlUQVYexlHEl2Zcq%2BrQMMq6VQVvJn%2Bh6I80VDtJbwfIPr8C%2FuIWrE5QwXD5Ej%2BtUswHWicspjhvfFWT67EGDMYIUe9aB7wLk2RQKnvJgXHUUgPJKlfuDCVd&X-Amz-Signature=e9c3d83b311ca2fa53723c8aac190ddd0e9c5a5f34167262c725c970677818bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UMBU6NL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T005659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIEScQ5djjM0g2t0ak3bKDGZ8TarTyFYqC7Xi20aw9M0dAiEAz7v71wBvxvBoIKFwMVZh%2FGAHqoiCtFcAkuTdx0dV5Qsq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDMHoub%2FFIzu2fNoQJCrcAyOmYqdGyltXu5Bng4Wbp4M%2FzYTyWxXmKEpqTAKrzvaqqqVCaX9kgUOOFzbahy5y3BSjLxm1mgwlc9gYz98YZGAAfwGEf6JMJ2fVwce4a2WYy4DpfCjM0uNY4ssN4%2BbLEsoXsiKJOAxd8pTkgUEk%2Fx%2FH2Qmax1faPim9IKxKoSdRfK1cm8u38mTmNTNmsbVcCFfcbAn6X6KeiJm3B5eTsh3ITOrkx8kenqQwNJFSdrAui%2B075p2keNvsqXQvbALdMDTYIGYxVTZCvvVSTrP0lg7P%2BYnfEiQ9gSUvW6m9LX76HDjUvZEKmEv6byzV8f8mIDkem9Ld3%2B5Pbn3w%2BqoLQq70ghDT1GjtkzxmLm0J8hRhPA%2FxOhoASmmGT7TAxKn2JO%2B3WAzX8EZVvIQNogRvHcM3A1Q3DS8SPBo5LDkETzXDVJkfZbVg4vRax3DVsNsOzVheKKv0xZMy40X67YERjGoWWMMDWaQbbDFMkt6PI64ACqHITxf3d1lEy26ffFkIBFOC0UAdZNHCfAZwPxFM2ycINGiKVKuAHY6RY6WM%2B9cFKy4J6wR7SGdzucvnRysBF8g0HJGe3vhCIJWz%2Fj%2BIZuFxfWRn7c7zWuumx%2BVmFMn14jmjsegMYF1DjA43MMqCs80GOqUBD9fZy9gzLODnEeNi6A7xMrcb2TFIlFlD530AiBS%2FIr%2FvH%2FqbI2KIUqw6kCK%2F9TCLhoXKUhZMkTkNaWqjOl25gyqQgx8DznzOof0NM5uOoDohUyCmM644iSDT%2FEDm1VUaQqCnMUEIGs5fKdbwQV5ctNgFGmufikj449%2BMoDY5RY1fsgehd4kVD%2FuZWS3XLPmeM57Kg8BFtJ3y0GDFn8S5%2B%2FLtdRci&X-Amz-Signature=f48467bb7cd54d7179fe56df39168aa1845526083b36377ba016c2b1704a5a02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

