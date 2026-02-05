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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S72LP6PF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDWJbDLOETIn3S3b1WcwdXIYdUPOHElZ4EuhJ35SkLGbgIgFfRfqQArGbXf2i4MZXwDOrOaDh9ZiMv8%2F0pwPC1bPYQq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDPHmWAFRMjsju%2BQ8ySrcA1gEz4diMuuN3mVtho%2F8hbhuvy1lz0ewzfepAypgvGHfOhcyebqdUdLFYQFaHDWdvQedynFe%2B3V2TUbKfr%2FsNw4fKlS%2FQmjoiaS2Wb9MkZGCqM6jDnoF6vh4G1ZhvgUJIs24rfXD1ofHkTXFlmpfn19gjlTq%2Fpl62xUnRA3RSZsXiUXEGkgbBaop6p83tW2XFzix3RqTm%2BXTc%2FUP%2FYAmTq5NZFu4K7njtpZ96K5MS2VjjxCuJRRP1sWhsXZQ5bltE9pfD%2ByCaEG30LYSAUg%2B%2FO2p%2FshgPEgSKO2GLe%2FlIztbnAdmgr02kxMoD1ixnCudG7l%2B2D%2FhqznKWmOi9jNylNfT9MhIEYJIGzjBWAsyc%2BhT9LAM99oYkrsljFS%2F5PAJvjZsbNMX%2BM4XKlpdYHMlMsGn0WQlPb%2BN3KNPWURGeHJrh%2Fjwxja6Ft%2BGvTvdr%2BPdLbVewLeXGuFj0JLmNcciVnuzoYCY5opWO%2BJ6yoX0jE8Jxf1wuOvLteYeLCdHBxjmpi22uuPqCz32eVpp048N%2Bz%2BgXY6WTNspsHN4%2BUcZW1TUuvU0wBCy530r8zpn876WEzjRXbiZWjzpyZUo2mH4mSsKHJmEUbA6xu5VOzs%2BSoxB5d4wdl1iCQ%2F4f6wJMN%2BslMwGOqUB6m1hN63erGZ8YfPvEqg8mcrr6Rzczuuy5%2B9gdjMMU8AWpnGwPVl39ULwP5hWZcChUVyWVe1kgIAU544Addy84A5sozu1lQjk6mdcdO4coIIb2fW47TxNTBcWbdYJjvbp%2FrYTZaPOT91JZKdhGYbMNjoz2BymXHUD3Q1XMHQpsBmRHXZnBb2Cl3qpq6uaT3ZUS2kjHcde4bowou0sxb2oksmcvgCo&X-Amz-Signature=0687fb17c5bb6a09151f6bc2c0945199ad853693ae60f1cb8eb12f680f98347e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S72LP6PF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDWJbDLOETIn3S3b1WcwdXIYdUPOHElZ4EuhJ35SkLGbgIgFfRfqQArGbXf2i4MZXwDOrOaDh9ZiMv8%2F0pwPC1bPYQq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDPHmWAFRMjsju%2BQ8ySrcA1gEz4diMuuN3mVtho%2F8hbhuvy1lz0ewzfepAypgvGHfOhcyebqdUdLFYQFaHDWdvQedynFe%2B3V2TUbKfr%2FsNw4fKlS%2FQmjoiaS2Wb9MkZGCqM6jDnoF6vh4G1ZhvgUJIs24rfXD1ofHkTXFlmpfn19gjlTq%2Fpl62xUnRA3RSZsXiUXEGkgbBaop6p83tW2XFzix3RqTm%2BXTc%2FUP%2FYAmTq5NZFu4K7njtpZ96K5MS2VjjxCuJRRP1sWhsXZQ5bltE9pfD%2ByCaEG30LYSAUg%2B%2FO2p%2FshgPEgSKO2GLe%2FlIztbnAdmgr02kxMoD1ixnCudG7l%2B2D%2FhqznKWmOi9jNylNfT9MhIEYJIGzjBWAsyc%2BhT9LAM99oYkrsljFS%2F5PAJvjZsbNMX%2BM4XKlpdYHMlMsGn0WQlPb%2BN3KNPWURGeHJrh%2Fjwxja6Ft%2BGvTvdr%2BPdLbVewLeXGuFj0JLmNcciVnuzoYCY5opWO%2BJ6yoX0jE8Jxf1wuOvLteYeLCdHBxjmpi22uuPqCz32eVpp048N%2Bz%2BgXY6WTNspsHN4%2BUcZW1TUuvU0wBCy530r8zpn876WEzjRXbiZWjzpyZUo2mH4mSsKHJmEUbA6xu5VOzs%2BSoxB5d4wdl1iCQ%2F4f6wJMN%2BslMwGOqUB6m1hN63erGZ8YfPvEqg8mcrr6Rzczuuy5%2B9gdjMMU8AWpnGwPVl39ULwP5hWZcChUVyWVe1kgIAU544Addy84A5sozu1lQjk6mdcdO4coIIb2fW47TxNTBcWbdYJjvbp%2FrYTZaPOT91JZKdhGYbMNjoz2BymXHUD3Q1XMHQpsBmRHXZnBb2Cl3qpq6uaT3ZUS2kjHcde4bowou0sxb2oksmcvgCo&X-Amz-Signature=0687fb17c5bb6a09151f6bc2c0945199ad853693ae60f1cb8eb12f680f98347e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XH5G7HG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAkSjFmnNFRcZjRaNYwOQanfAJI%2BhbSFFiPHthG9558LAiAukGnbrmxwyxKY0X%2B3KS2DmZXoiqzR1D2hGrv8OYupmyr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMnWoDYWek5PN7ettRKtwD1g4ZX7bBeiLbHARx0IbpmiUtZhabNWPxUKzH48lIi2UvCjhXpk%2B7ka%2BJUPLm9wVRKTclYwazaeORjiDt2h2GkOBE9anrSTL8mM72CjUeW9ElHrWb9RhgHp19P4Ans4YAFa2MJ0aPzXb%2Be0uXlTnRd3Xrqbc6%2B1oWs8DdlOyXTADegt5R6MItmVUxnr5VxAjCCoNlPgKcBTreKKTuy%2BQTBW0QRNTZk6i8TYWzYvEAnv50WMoChnGZlZZVSlSPf2WFqkJ3bKgpLcoV4jyX0Ne7iFR5zf0r3%2BIog0WcuA36YwFPsTACfbavXwuL9jB0GzKgds%2FRupixCiOrR7%2FFFD88Xpb%2BvKCH%2F6ZXUwTLr1Le%2FBuxqnv94tqTD7og%2BddnzwEKNbYZx67Zpizn3GRBnXzyNhidAQPGR43PqLQDTr8wzqhoMOAXe4x%2FrcuxF3hazT0Hu3yfRboADTHerFSLdT0tcUinzY1ksZoWfkzNq2a1wytoeUGaCwLDC9gL2qvJQOJ0asn8SThz50cXdEG5kw3nEkA8kLt%2Bi%2Fnr5o7OOaclfdhHWe%2F88vg3uN1PKWI9N4H8qubj3SFHwnJgAA6f6MFIoYaACNhhj4p%2BhKOsdMzAQJL3sSExJOugbQFM%2BLww0qyUzAY6pgFR7ZIMRLpQrKs1sE3BY%2FD%2BraFpJoghnXkvBGBrxFNJ9EM%2BSici4QHLOYaY2kHiUsvPfRp9ud518sgHMOk5UB4Ta0UGqeKVBQJBTjJhbhfK18gfnfPcEKbIL0GYCC%2FHFQoXEdMwuQwEJ2YAfBha1pEKOf904DfNjqJW9H51VkaC8gtF6HRCJjuXR0HHK1i0dpit5l7OsHsRR9XLp1LIGxEaCR7nTHDV&X-Amz-Signature=3963915bb468c004983023f31f32a2d089799771a3066ea61b989aa7e69d95a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYKLVGNQ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD6aJsS9BRJPl3bg9%2By8SBjiDALZ7HrbzOfyjJY2CiY%2BQIhAKjIawttlYgp%2B5v%2FDy4bbvsvoUowgjzNBdaeWwNsuTN6Kv8DCDcQABoMNjM3NDIzMTgzODA1Igy8hfDPOJ09K9P0OKIq3AMuHcUVAoodCOFxufHrpYtA%2Fpt4zpf5sAKReejn%2BskeYNNWIsu1M0NfP1BIjSevlfFoQNRz3w7uVRSjMHQIdFvDzRhB6AEtVONb4%2Bqj0QlVuI4fpU2SiAKC8ne4Pd2Wrtup2zeWei4YQ1FPF6i6DtftuBQvDQsWY2c2VaAVrv4lnoo%2FBolyvIR3kWaV%2F0V2jVcoJqaWQLyL6y27Q94RZ6OGvYMBPOZpl%2BkE3SvGHF6YM2rnPMy13mMtvfluD1jGJFyUaDjyffhajfQ21kZpm6OzKf9rdNgrfLl6a5EodO1ubRptxR9OrbH7WD7osz7ORGuCRUK45vIiZsOuhFL7xoKNxKUHQXStfrO4KGAXhpGNs5aruDv6nUwAp5h8QfOt%2BpdFHAlGWeNkIF4SlOONLef6X06BX9%2Bi3jgACcPJNk%2Bq959jtGulFqDqHea789kNnjWs8wY58q1VkgwoZnhXS6SN4%2BXUXOMGlvHlGvbuczpZbGkO8MGKcdUGFBTBts5Weqm2CTHx7EtqJm6C2sK07M5j1HDJGDTJRybuzf%2FlW%2BVJYg8EkCZvEpPqw6o6foc6Al5qgjQuWnjgaAGWPywNYqYaNB8JBEt0klvHsVmTnpeWZbk2gTuw0TZceXTiSDDArZTMBjqkASI1RJBy6%2FZXXRrxnOLAcD1xuwyPuUPzCu8xW1974HQcK98eJvUgBzrHZ6ZF9tH5H5KE6J8q%2FTdV06rcXTZRDlUjiXrd2f%2FMKE0FJF71zlKkL9GBuam%2FHhhvdh4QrvNb34ke9wrDuGA0sbT%2FnQ48NQXZgJO3WiYzZcErz294jbHjyBQZITjdxVSGe37SZiWiogRr5%2FMtSEUqihRBPPiK3AY8ZcPT&X-Amz-Signature=70e6853dbcba57923a6dea78acd7c9006fd3963a5cd7cdc7bb3206d4606fa6ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYKLVGNQ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD6aJsS9BRJPl3bg9%2By8SBjiDALZ7HrbzOfyjJY2CiY%2BQIhAKjIawttlYgp%2B5v%2FDy4bbvsvoUowgjzNBdaeWwNsuTN6Kv8DCDcQABoMNjM3NDIzMTgzODA1Igy8hfDPOJ09K9P0OKIq3AMuHcUVAoodCOFxufHrpYtA%2Fpt4zpf5sAKReejn%2BskeYNNWIsu1M0NfP1BIjSevlfFoQNRz3w7uVRSjMHQIdFvDzRhB6AEtVONb4%2Bqj0QlVuI4fpU2SiAKC8ne4Pd2Wrtup2zeWei4YQ1FPF6i6DtftuBQvDQsWY2c2VaAVrv4lnoo%2FBolyvIR3kWaV%2F0V2jVcoJqaWQLyL6y27Q94RZ6OGvYMBPOZpl%2BkE3SvGHF6YM2rnPMy13mMtvfluD1jGJFyUaDjyffhajfQ21kZpm6OzKf9rdNgrfLl6a5EodO1ubRptxR9OrbH7WD7osz7ORGuCRUK45vIiZsOuhFL7xoKNxKUHQXStfrO4KGAXhpGNs5aruDv6nUwAp5h8QfOt%2BpdFHAlGWeNkIF4SlOONLef6X06BX9%2Bi3jgACcPJNk%2Bq959jtGulFqDqHea789kNnjWs8wY58q1VkgwoZnhXS6SN4%2BXUXOMGlvHlGvbuczpZbGkO8MGKcdUGFBTBts5Weqm2CTHx7EtqJm6C2sK07M5j1HDJGDTJRybuzf%2FlW%2BVJYg8EkCZvEpPqw6o6foc6Al5qgjQuWnjgaAGWPywNYqYaNB8JBEt0klvHsVmTnpeWZbk2gTuw0TZceXTiSDDArZTMBjqkASI1RJBy6%2FZXXRrxnOLAcD1xuwyPuUPzCu8xW1974HQcK98eJvUgBzrHZ6ZF9tH5H5KE6J8q%2FTdV06rcXTZRDlUjiXrd2f%2FMKE0FJF71zlKkL9GBuam%2FHhhvdh4QrvNb34ke9wrDuGA0sbT%2FnQ48NQXZgJO3WiYzZcErz294jbHjyBQZITjdxVSGe37SZiWiogRr5%2FMtSEUqihRBPPiK3AY8ZcPT&X-Amz-Signature=f5aaa2674d6680b0898dddb7666b3b1a49b4c287e3beb4addf95345904ab5b80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLEXWEYL%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQD8u2oI%2BxZHLim9M5MZ0R27iANw%2BXRTYnx6%2BjhXZyV8KwIgfU9DCDs9Y70wf5aLS6GA4%2BlsuNoih9%2FmiZMuZrZjcUMq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDP9jn4xcjc5sYuDlnircAxFEDnWhxsvuRixFt11cU%2FXCSgRj0zlKb0Z8gepFHbZUJdkesfgxHuCINrebgmtKWNJtem6VHmVG88m7mhUfNG8O963XbmvY1UAdbAKkLal%2F3Tpv3usy1xi1Uzz11KuJGhknpfdC9yM40ThgC8HDSiBAvJcdAo%2Bkhbd1l9I53vaLED65Ife%2BSHAIxv0MQIwxzB7a%2FxMeN0Tl7errrdqI3JeHHv2fcIOZLMquIWeIL3rRKSX17OVTqmozRfQaDM4FOBNuVc2tKSeGPi2EKuWV8yho0OAZ0VPe8JOWNEKT0E6zl5KyuNR4q81Bf3lnYsPE%2BZ40s7dGMzULFThcrBESvgjAP0t6VDO72YgxM6nYb3049ZqUrsZfeMcZcEzbDoRJnacZfM4xx4fRg%2BYoMVD0TgJ2qgvkZ176Fo5HnHh2lloa2ivD3DSpNskNROkHRTf2WPUzyPMCWdAetjawJShflasq987gLBUREwrPOof0KL5Mbua8nZ%2FR6KcWgAEPmG14B84nzpPTQRn%2BucGbsCSytZBM9ProeUfzhOiKVGmSRo0BEB2qkoc2Z0Kq3OHh7FFX7bH7BSreuMs%2B6Unfw%2B7UWJsMG5rtb%2Bn3dJVzqzmKnHu1IBdaiMJuzXtQOmsnMN%2BslMwGOqUBUrocE9XFKldsREGb2afPaNMeIZoFpcLUf80LtotDEpqj4CqZj%2FBntusYrX7uH2veMmtj%2BuPfy7zIkyIjYeiCVXdCa7HSsi%2B%2FT3B%2FS0czNWhnRGIxS32%2B5k%2FT%2BRaDmlYiZvOneWyjGo1C%2BpN8GqUa2u09r%2B%2F0X6%2FaImgCBlZo%2BcPoZnrB79uh1bJCFLoY4rJE7l%2BU2GSVrl6bZsflnnk1jamgBZje&X-Amz-Signature=746b83422a7eda1961d3de666ab91788c6e9a52a645c597fccacef0261e9c370&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STZIQJ6P%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDdeTXPI5D3Xekg1tqgp%2Fr%2Ba9UuHjr0NCBcY2zlVBe3DgIgG4pV8X225Y%2FeHGcAZYOYloincTkOSRY9Udej2XMPhaMq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDD2RcyQX65HfznIQyircAy%2BZyOMoI4NvAF89nycfQc5xt8ER2fJGuAqInayN1rSLyo1GhRWGivy4cDWolVNkVYf%2BmIOa1opqwJSoD3%2F3I7GP5Aobc7qUwV89RPDywL%2BF0PRK4gU4C8uFe2in00MmTuqPFuhFdX3s2pN6glqBQD6f8B36SEkn5KlfKDHTmzGIdqf9pPM4CiZJ6EHXNOEoaQ8h%2FwNpHydQa04qZLuLsyulEEeNyVF7iyiK9nR17kRP6ypqdWL%2FvgxgFHNH7o9jFaXWV6%2Bk1BRK3fOa%2F%2F0p7qJKX6EhaEP4WrOfwlTC8qUQ8a6AEBmYCCiNYxdfZMap32k9ZE9wNtyvqQCkct0C%2FiRL%2FWC7eEfa5x1Q%2FAy%2BjXnWcY05u8agKpiSiQGxzZC6zsvwhrXMAWJ34PMdIystM5ecFnxE4K2Hz7DyWay70r2xIwZoBovOIRkyOSs1jl0ysnQy%2FbIV3cpTIPpdExT%2ByWvOpClefHxLkFDhVSUDhLyxhoAFWzwKymK%2FQX1zLJcc3c%2B%2B5Xmjm3gqMvEDoknlBYuMInmuJwfPbIp87XiRM4ISe%2FSiyGCe3lA59C8I60CHnvanIk0lvg7vdOl0cALr%2F4BMyaoG1o4H6gf7hrS%2BkHJF2jx9wsNuGVcIFXfPMMWtlMwGOqUB%2FY%2BBPgYf2VrJz5U%2BP%2Bkqhv6HPbm8tmXiB2JHHWE5e9Jl3ROgNA3PrYWuOWvr4Gtbmcvk2sa2efOBgybN438JuM7GfCydWZIFpHVW5e5pzY6EBxzQj2TXEpxAOmkIBkOxwOzww8lQo76OvwNlYjTBA%2FYzmz0AG7x6PP1%2FfEvQ5sDNZDPSkLeTytBUnQP0nKGdkbXkBKuu1JyMZzeR9a2uG6%2BqjbWA&X-Amz-Signature=d07907a0d90b01ccff4391cb911d53d0c3f49257fd1a1868f4bc630cafd8a73e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIS7EMNB%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIFGjgl5M7atWxOduiFE%2BX6W1YR6RmkOzGwZuovGft8f7AiAKJuytl3lzRCWCCs%2FX0lf1eF3vGfC72vWnXdc%2FyHQMrSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMdT2d0s%2FiSO6eaKM6KtwDjWrU%2FrM%2BoMylZkNfFHx8d%2FBIHu4z6PLaLTFbRBccaIrpiwajxmNFShzb5AGjHiO3SVDzbDjEFsnUu5pJs9qz5i7p%2BCOIAbq63NgNOy2p1gJGbQrmswhK8J2ykf0OUs776Xcp5sDxHvc2NIMdbzIM5fwA%2F4UW60U7%2FSz517BB3BYX3BBSPsV0peCDOSRmtYzNp%2BspJPiwWO4sciPUu6aqGTQJUAtxQG5uZ1S%2FFnNrPQ7neBacSc3Q3FN4ib80g2zAgfbPBR4ope6b8MZ1CMyZjIPu34G8wVUQ3p7%2F2SO2S0CAnmJmFGc9eyq%2B7WJmkN%2BJwqnhr8AplLbywusKe9AAz%2BmUF39G1hATDfHyPmACR9jfOyTHguvdGlJxr5Uc%2Ba0YsYM7Czc4Ge47hKLcpniRTPkWmaBuDaz%2B9TNhm3Whb9ds6WPI1dKC3h%2FfLVFg0h3m38sRiG9ChPO1BkRVUjxrk6bEfXbCBonG1Nf5JCSvVTeXXHuw%2BHDjfU83x%2BdqVH8whaGYuVM2N2mdO55xxrFd3eWybp8vpy%2FYg%2FkqQuJFWw0HvsGfB4Wn4JYiMIbUZ1wnxGl5ToR8z7n8J47cqB3DeAlUvj18R5vamfOFTY7La7xRDdCbyH2r0KytG2MwnK2UzAY6pgGbWAhi5l1du4JotyZh%2BXhva6coFa6ywR%2B4rcXa3y7eIqokSIQHWszjwOCZXgNJ8dHWPFNtSCN9ZUeBIFvV6yvO4Nv%2FhKyT96lDCVVyNyqRorSpEwxpGReKNywkkuNJpXal21FndBeyZ1gKZp1aw5COqoXYvkzWmgexN0mC3Ev8vRIwIPv2w%2Bg7JqqlZgEBQdb%2FWMU62xnw%2FhHagQgBOVGjBmi9tPjh&X-Amz-Signature=28b657d4641f60b0c2a8b7eb1256bb2cfe4e985ad12dea7c3022cd6507d0075d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTRYBDR3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIDOlPNtNQI6BY15D4dN2QLsw135dgxpOQP6tPGOeJqEeAiEA0h2P5aQ7Wa5UAVI%2Ftp2S5BG6EYgXaC32JQI%2BUtw9e8oq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDF2RoCoI9B1Cqyv89CrcAxJShK7mLpNlFksOehB0wmuJjVEjtkWU5%2B60Q5WmDv0nQoZ38XsGOxDv5OoJscWWOY8ecp2qAla5SFjhy3zwrev6A3E9GddiyClI3W7Lryp8bLw2yHCI3mhMqkVtU5X6FpJPqhWoxnoNUkzSJ35q1bzXjhuFKTCytBfUIt8BR1Xq422CtxyWrCVwiRGRk3LZ54dIMmcaRR6lxi5Jc6qW8xqJ9fpWFtjmIL%2F0LtFOc7KZMu7LFdnQHcI44ASFWNqLmwAZWdSuOpH9Q%2FTmR%2BVYXyOlwbvIwM3HSBP0fsSCTEevdHhQA%2BZiBTEKQshxHK4uLD3SiPk%2BFK4hI5xmrBuCVvRhkOYS5C9qYTlO1Z2YHC6Srp9005TR%2BH%2BtVsaCn04SPGiZub%2BhiZnz5Q3rQRfZG0GT5ptorC0eF%2BJYS9ZBQyLrJgF9AJuSk8HYlMkVJDJHmgGmwyNJhYYWVdYTa1kPoxJhbIxTn7iT0cwdNEzsV2d3EkLMCejqDbUaETbVyF%2BgOUWvXSBQkpDHd7Uw5Di0CoA5jfDW9K6f%2FLgbn094E7OuI7dxHuSENWyk2IEtAuBPz85ZX7tI0g1CaxR40dbqULYIUE1jfeXCE3uc5HdAw04gOwCFpzmfovAoWfj%2BMMCtlMwGOqUBIZrG2CubZsBkEhiITTNuH9ba3vxb2zX2nC93dEqqXp67RHCpPuuUOdV8aLuOTTHd%2FrYjTNe1%2FC8utBheOcin%2BouUMmWhxICaPzTLAwMITb%2BelLHBEsUQM3xaEBBeLAwT4h15CTxFMsKdIGFFAAKF2LBKMDzgLoWWx%2FxG77KQNtSEJsn8K%2FNuunE2eW8RPdRj7Rvv6YN0Oe%2FuAgLV9Q%2FzAN2Sn6wd&X-Amz-Signature=2d71c0ae4188c7a8d7a43647205fecd23d581a637b915b60f9286a992049a124&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTRYBDR3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIDOlPNtNQI6BY15D4dN2QLsw135dgxpOQP6tPGOeJqEeAiEA0h2P5aQ7Wa5UAVI%2Ftp2S5BG6EYgXaC32JQI%2BUtw9e8oq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDF2RoCoI9B1Cqyv89CrcAxJShK7mLpNlFksOehB0wmuJjVEjtkWU5%2B60Q5WmDv0nQoZ38XsGOxDv5OoJscWWOY8ecp2qAla5SFjhy3zwrev6A3E9GddiyClI3W7Lryp8bLw2yHCI3mhMqkVtU5X6FpJPqhWoxnoNUkzSJ35q1bzXjhuFKTCytBfUIt8BR1Xq422CtxyWrCVwiRGRk3LZ54dIMmcaRR6lxi5Jc6qW8xqJ9fpWFtjmIL%2F0LtFOc7KZMu7LFdnQHcI44ASFWNqLmwAZWdSuOpH9Q%2FTmR%2BVYXyOlwbvIwM3HSBP0fsSCTEevdHhQA%2BZiBTEKQshxHK4uLD3SiPk%2BFK4hI5xmrBuCVvRhkOYS5C9qYTlO1Z2YHC6Srp9005TR%2BH%2BtVsaCn04SPGiZub%2BhiZnz5Q3rQRfZG0GT5ptorC0eF%2BJYS9ZBQyLrJgF9AJuSk8HYlMkVJDJHmgGmwyNJhYYWVdYTa1kPoxJhbIxTn7iT0cwdNEzsV2d3EkLMCejqDbUaETbVyF%2BgOUWvXSBQkpDHd7Uw5Di0CoA5jfDW9K6f%2FLgbn094E7OuI7dxHuSENWyk2IEtAuBPz85ZX7tI0g1CaxR40dbqULYIUE1jfeXCE3uc5HdAw04gOwCFpzmfovAoWfj%2BMMCtlMwGOqUBIZrG2CubZsBkEhiITTNuH9ba3vxb2zX2nC93dEqqXp67RHCpPuuUOdV8aLuOTTHd%2FrYjTNe1%2FC8utBheOcin%2BouUMmWhxICaPzTLAwMITb%2BelLHBEsUQM3xaEBBeLAwT4h15CTxFMsKdIGFFAAKF2LBKMDzgLoWWx%2FxG77KQNtSEJsn8K%2FNuunE2eW8RPdRj7Rvv6YN0Oe%2FuAgLV9Q%2FzAN2Sn6wd&X-Amz-Signature=9685da76aa6256149b2d979e691f31fab8d50467c6777a26239c9d240ffbb137&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CBL4OOW%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIEElt3myG34IH05TLYLQWo8WYpG8vsEOoDBoYmw7ykDJAiEA7V1izRZLTCDGsuvXBTc0OD7kpCDj%2Fli978p5PcViA6Iq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDE06ONgLLB2DqEr9DSrcA0cREzLjQxlbv8GS888eYfJNekvP5x2VAijQAws888INWWSLQzbfGi7XCBXgJ5xCVO3avh%2Bb4oopie0d%2F4R5BZ7uhSTiTqhBMc3elSPfKVRqpHJApDGccJS%2BJLITJ%2ByXXAQv103mguRpwWm8kNJjzkur7k0Fk%2FCKclzk21oVYjtrNz6O9ITzH9mi1zqqoCtWQcszBbCnqUsECwvC6AngkKdjOYxp7GIcb%2F3k2LtobSJh1fkjVXhKcCJpIlPl4RyjLF58EsIdEy%2BxbTqwVmrt5F4dTNmn8hAI%2BEdHPtdW7CY%2B%2FDWMHmIBVfT9p2PaB7th6pPGegy2%2FYTjHirtN5EDYuga1li4el43gcIxMqp1APzbk7%2FkqlOyU3hv3w7lSgyOZ9HZQeiCiTRhn1O8BUvfYSPwGmkC8VG3H9sB66bERR44VoIly6Ip93mX%2Fjatxs2LASoJSrcXNFK6JqFiPeKmc%2BtEU8I6kIMRkofy3O8y3OlItcH%2B0voKMfHMj6pBj7oWSFkwLvhEtr2sjOBSIaAZzQ%2Bx3kfmlmfGAjovWG9ILyL4e%2B0qfAun4ZIRASl2n2IzO1OV9DsRIguBt2Fpu7dLeLKI%2B9m%2FdzVmZm%2Bklxsf1aoefCidWD9jgjaTgGSuMIyulMwGOqUBzWojM64dDj3LpubtIeed1O3TawA4j80vzfaZEiBtRu%2FMq0eWD%2FfDQaQDF8CVGFHKlODVL5LeHv7Zs5R4v7vCFK4fZSc7myj7RPYPZViGdlvRRPHLVrTyH5PLiNtTrsKbk%2B1LMSb%2FRSx2aXiYxXZxi1F4ZOsAY5SrsizyG4ib9VpEEzCUnz9sTDf9f7vSWYWkO2AWg7IeJvpJB6ucbP8czWbpJIrz&X-Amz-Signature=8dc984bb1f4021b411bd2678765ec8a97e42033513c3306bf1f6fe49af4f4b6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UAGVG2B%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIA9L2Q4cTZZdN2ES70JKYYVgK7i%2FPDe4GPpvOW%2Bt0vuUAiBs%2BeD3P6DzMjGGKe7%2FV1gz%2Fu3KQQZOTN82WcfXGA4zaCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMJh6Q4yPqTbn9SbqcKtwD2s7RyKSeHhM%2FqjqX77v9b%2BYzW6bTya2d4Ha7VoBpePe15aa46Uo6oY6cXdGS%2FbSoGYpLRlYE7HsRnH97%2FTI9WqLlf1ol9fAz877lJMq7FnJTwvU1jC9RwbRmjsTFqJ%2BS9rujIGScee0a4wbP1xBbwzQdEgTBmv8BWHsmzJ0NReTUZxNzWZ13F0UZ5XHEQit1qtJDCY47Q7PcBKO0DJDo1LenoekQPTuP%2F5Ya3VjvIvZUBlJlrG%2FzKm2dMlkTk5Vxw9qODfVGGvT5guMp8Z7Nl2zlItkirh4OfQLZ5zy7Llixt6ENTwPfOsGyYKM2zuDi4NMM9sT59OQrfsp6HANP3Fmg2NYPC2mpHpGsXR8QJrhk1YPASGITL2W0XpcvZfVFNQ0gd5kNhflbzlQ65sNDBYsdkigfDpcPegyhfEVFYkR%2FohLviplTmeWIGw5DQryKBKp9u4Om5I3%2BW%2Bbakf4d6jWfNP2JUfnxrrRzH9M8lWLwd69llzdhE4rSk3mggj%2Bsuc3Icih8lTE2k2X5CVfc8dbS8davcCH2g%2FgieY9S2io62V74tR50UFHKtCMI7tVskjlqMhBqgByIAIqEtHAT%2BA2NEqkpgAzjd5TJyrfeLbqaDO02jXakDmsReFQww62UzAY6pgF4YbXD301qaJdJ9ehm0qy3cKoqE9bq2xEgy%2Bms0F9xc42Usn%2FmQKD7M7siNf1FVV4WeTYYtvsiVvfdsnugDk%2BN8SfhxVdGwVPofAJrx9nZXM9YFAACXWLrZd6SMVeifVSJ0BSqrjFhE%2BZOl%2BqoyuVmznV5SZFeccCSlWgcAdTDuddSh8gU%2Bnv8NXlsH2SOwxJYIjvF3ORySXJPl%2FThIDT95W6uE3mR&X-Amz-Signature=78e78bd81432c661be4a7a517608b823e6ade53bd9d4225450b38cf8b24a9c9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UAGVG2B%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIA9L2Q4cTZZdN2ES70JKYYVgK7i%2FPDe4GPpvOW%2Bt0vuUAiBs%2BeD3P6DzMjGGKe7%2FV1gz%2Fu3KQQZOTN82WcfXGA4zaCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMJh6Q4yPqTbn9SbqcKtwD2s7RyKSeHhM%2FqjqX77v9b%2BYzW6bTya2d4Ha7VoBpePe15aa46Uo6oY6cXdGS%2FbSoGYpLRlYE7HsRnH97%2FTI9WqLlf1ol9fAz877lJMq7FnJTwvU1jC9RwbRmjsTFqJ%2BS9rujIGScee0a4wbP1xBbwzQdEgTBmv8BWHsmzJ0NReTUZxNzWZ13F0UZ5XHEQit1qtJDCY47Q7PcBKO0DJDo1LenoekQPTuP%2F5Ya3VjvIvZUBlJlrG%2FzKm2dMlkTk5Vxw9qODfVGGvT5guMp8Z7Nl2zlItkirh4OfQLZ5zy7Llixt6ENTwPfOsGyYKM2zuDi4NMM9sT59OQrfsp6HANP3Fmg2NYPC2mpHpGsXR8QJrhk1YPASGITL2W0XpcvZfVFNQ0gd5kNhflbzlQ65sNDBYsdkigfDpcPegyhfEVFYkR%2FohLviplTmeWIGw5DQryKBKp9u4Om5I3%2BW%2Bbakf4d6jWfNP2JUfnxrrRzH9M8lWLwd69llzdhE4rSk3mggj%2Bsuc3Icih8lTE2k2X5CVfc8dbS8davcCH2g%2FgieY9S2io62V74tR50UFHKtCMI7tVskjlqMhBqgByIAIqEtHAT%2BA2NEqkpgAzjd5TJyrfeLbqaDO02jXakDmsReFQww62UzAY6pgF4YbXD301qaJdJ9ehm0qy3cKoqE9bq2xEgy%2Bms0F9xc42Usn%2FmQKD7M7siNf1FVV4WeTYYtvsiVvfdsnugDk%2BN8SfhxVdGwVPofAJrx9nZXM9YFAACXWLrZd6SMVeifVSJ0BSqrjFhE%2BZOl%2BqoyuVmznV5SZFeccCSlWgcAdTDuddSh8gU%2Bnv8NXlsH2SOwxJYIjvF3ORySXJPl%2FThIDT95W6uE3mR&X-Amz-Signature=78e78bd81432c661be4a7a517608b823e6ade53bd9d4225450b38cf8b24a9c9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYZDWHL2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T231305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCFH25HFIJFJlzRvUUaT%2BfVUb7zG0WgSdQI3EaXAnz3nAIgV%2ByDMs0J0e5JoU8HbWG1P1C9XDUgf6SBW2CwN11Q%2BHoq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDGZpzr75J9WcWp0nrSrcA3emd%2B6VZZXDzCXvImeFjWhJwh5S9JE%2FVzZ%2BDBXAg%2BPfp4LM78tOxPrgC%2F8mz65BXdgD2YRWkrD5eALYcJyBUsUdyukcEm6wmlzGrkkqx1EBUE%2FCerE%2FpJydP2Lm5sFrJlZtm8OkrWsIHeGqzXtYO8VXYRF5Y3TwKkSwXpdxcgmKrs8oDF8PvGJ8AYiunWSmpFVRLiQxL7F2AhI5vbntni7q9W2otd%2BqoXQOXlT68Sz45flGamQBErCX6Fq3cuiy9CuADxmQ3hsNrHIduKBQeH2U3Lfh91Jz1RFWt2h1IIC%2FfCxjq4dxaGiuPeNr1v1kMp%2F2dL5FHBS5IERW8W8przpYpks6E3bBW0EneJu0HDBNSxfaurG%2FbKe3Xwn8QvOkYmZdWqV5favafL%2B%2FKdBO4U%2F%2FNP65%2F0eiVtnLwk783fIbop2itLkOdB9UQuY37Nq4Wy2axKtnNrRYaJi%2FJlq8KA5nBxUqsc%2BYp2CNE58AfxhnfFT%2F9MJlioaL0VPQLM6vOmSp6EtHd64nPA9gUPRFBqDI%2Fo5DMOhJS8c4VPnYSA0pubtvpMNH5pjAdWbOeD5taU7ZS86qt59OLSXhZ649w6ehWZwMv2CChk2K9PazaUxcfDpJh0C2sUU%2FA2enMIatlMwGOqUBhO0FEUYKou3oGNcTYo3obdNmd2HEpCfuEZzJJY4ArqXSjKM1u3mzLuco%2Fe8bJPevqawu6V7rtWg5HhixUD0m8RE%2FTbBMegU4HJSJXPjj6OgbKHz1Y67tsyfT2FWBPjiWjUSJKyBgr%2FWkjk0MS5FuB0KfL%2BJ%2BsTDYuZpu9vaUEXmwCdl2aapxSiLuVB%2Bfb9Fsl3GiObKPXyIknMf%2B9Lxlu0yHJHF7&X-Amz-Signature=dbd1bf98a4b8befa3511050406c3b1db5400b20f113be5affe7fdfb7ee0f3d07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

