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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIG3VEF2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIEhBDSMldZe20vWObgoQ%2Fpd0cpqBMYqx%2BcZvVc9LB8QMAiEAhPmaJH37r2gP7TisRoP24EjyxxEMU9x1ytf0y46Ns7sq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDPscUkhxg11wkabsVCrcAyLThaDntErZFxgvuhvykmPm25upVpCUZOIf3s5sCVc%2BB3F2Pn7AR523%2FjImNgoMqx7mdLVMMkaA5nMPWWspIyq%2FgVpjRh%2FotcOwjbApF43dnywD4N8j1KlDnXLJEJ56eC%2Bl4j2sVnfUkKTA9Kh2%2Fjiu0GYWquVqhMe2L%2FnxYhSwn0PRsZP%2FG2hJ94%2Bkv8UGLc%2BMyJbOhg025ZOdPlb31O4MXbCdczeITPrWS5hx3igL%2BKSErY2yyP6uG5yYRKI6b3JaNAE2sDHO%2B2U6udjmwDqgNRWq4lB6kTNJEfy314Zsfw%2BkkF%2F2X52cVB9zvnzLafabiKyH57PQBs6eDNGEtMgfrXHXujWTP2SWCcxtvp9mNXaT8hdBwaVLRbjWYWQAU1Q7HgRb6vj6ryYUMU2HWJ6KwXskP2idwmhCmpmo8TTtS2ydZgc16%2Fiwp6oSv4Yd9tjfDz46zKPltYykrYJiKzgQzJPmkNqs0RYiofvCeHPNz1hgdgXM%2FtQ2uQUAJXTlLLCOg%2Bqir7dFu1KPWqU4IDXu1In62%2BjFPMz3XdlpF3%2BI9ykBGw1Q%2BzcWd7nMA6jOZbK0WxZPoM8sgREVETesRSDSBd2S5N1Ayl%2BU6kZJ%2FgRFpoB7Fi%2FZh606TO3rMJuCrs4GOqUB0DYarvNlDhUs20ydqdi3dB9jJsJAm3O9K6C9JWKceSn2zG8hk2Hc3BnH6zHETrK6iyQpO%2BpML8FBjuONl6r6MSHBPAQ8iZwNcwTPqh11jTkKdxqVeUJOZJKS%2FNvefPF79euSQm6MvIgOu5cV%2FUaoANQI5zsr8n%2BF5pNR2UDXz6oHQx1HmrNvrAkzMI6mVBb7d4OpiQnRuasXQu9N6L%2Fbhf8DXCNO&X-Amz-Signature=452acff2a1178b807ee64b7ba2ad8d2a3709fde90a6e917219af6610b046ddf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIG3VEF2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIEhBDSMldZe20vWObgoQ%2Fpd0cpqBMYqx%2BcZvVc9LB8QMAiEAhPmaJH37r2gP7TisRoP24EjyxxEMU9x1ytf0y46Ns7sq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDPscUkhxg11wkabsVCrcAyLThaDntErZFxgvuhvykmPm25upVpCUZOIf3s5sCVc%2BB3F2Pn7AR523%2FjImNgoMqx7mdLVMMkaA5nMPWWspIyq%2FgVpjRh%2FotcOwjbApF43dnywD4N8j1KlDnXLJEJ56eC%2Bl4j2sVnfUkKTA9Kh2%2Fjiu0GYWquVqhMe2L%2FnxYhSwn0PRsZP%2FG2hJ94%2Bkv8UGLc%2BMyJbOhg025ZOdPlb31O4MXbCdczeITPrWS5hx3igL%2BKSErY2yyP6uG5yYRKI6b3JaNAE2sDHO%2B2U6udjmwDqgNRWq4lB6kTNJEfy314Zsfw%2BkkF%2F2X52cVB9zvnzLafabiKyH57PQBs6eDNGEtMgfrXHXujWTP2SWCcxtvp9mNXaT8hdBwaVLRbjWYWQAU1Q7HgRb6vj6ryYUMU2HWJ6KwXskP2idwmhCmpmo8TTtS2ydZgc16%2Fiwp6oSv4Yd9tjfDz46zKPltYykrYJiKzgQzJPmkNqs0RYiofvCeHPNz1hgdgXM%2FtQ2uQUAJXTlLLCOg%2Bqir7dFu1KPWqU4IDXu1In62%2BjFPMz3XdlpF3%2BI9ykBGw1Q%2BzcWd7nMA6jOZbK0WxZPoM8sgREVETesRSDSBd2S5N1Ayl%2BU6kZJ%2FgRFpoB7Fi%2FZh606TO3rMJuCrs4GOqUB0DYarvNlDhUs20ydqdi3dB9jJsJAm3O9K6C9JWKceSn2zG8hk2Hc3BnH6zHETrK6iyQpO%2BpML8FBjuONl6r6MSHBPAQ8iZwNcwTPqh11jTkKdxqVeUJOZJKS%2FNvefPF79euSQm6MvIgOu5cV%2FUaoANQI5zsr8n%2BF5pNR2UDXz6oHQx1HmrNvrAkzMI6mVBb7d4OpiQnRuasXQu9N6L%2Fbhf8DXCNO&X-Amz-Signature=452acff2a1178b807ee64b7ba2ad8d2a3709fde90a6e917219af6610b046ddf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXTOOHPN%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIAVON8kcvOGpqqNnjmUr41hv7GxwffCTYVSbkxXDEkhWAiBOoBt2tOCdHzKXsR3RgmPrdFqv92i86H3Mi6TR976Whir%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIM8kfgQt38fXwzOymYKtwD3gtOJRceL3rSuzrW76hnJskYvXAb6SZZxliOZvBuI%2BdrGQPXBZCjQ6WlRRZSlv9chZGINYA4O7pRraUM3ZF%2FQsPw%2BTBHSqgbGDeBiKtMJcg%2FZCs9Boufp1cV0nnTNZZG3OKYKVCx3hPBUJ%2FqBLO69DVsACYXPhch77p1uqlWeaDAZKnB%2B3jXVrkwSoiZ4xGTp2aZLGwMGrAtYWxTxnQZ%2Ff%2B3K09c5V3U5s0QeZWtDq8ZIfmEWukP%2FGRfS6lPCEfxh0x9nyITIu0OA%2B43%2BU%2F5LlbaSuRuf2xiwvjivOJ5HUTJKcT2MTvEnxr3H0HlLAwaXwaTS5TyF2ehyrBFccyGdm7GPg%2BA%2BbOZ2%2Bb3pTBWr%2FzhCWcs7Ti51SFMo7RVBsU1Tvkjofsef25uOgg1vTbjqBW8JDL%2FNrNhZ4ADFxckLAT%2FgIsUyTbaHikMhP2iv8BIGDIi%2FZ5HZazD%2FkV9ZyNKE0GOQNwzOAbmhtWDWYr3pWN6Ejp3BB9raGz%2F7zTYSS0gVQ%2FmTmeTLWO4PhNrNSh%2By3ccAVMMVhHw7bETAsLfrjkeSyKJiI2RCUQGEXQV9SG0Pb3cUPDqtKFc9n%2Bia4cSBVimxtECYr20RuQnbZGvXWQbqCgp2%2FRqWdjymx4w34CuzgY6pgETmW3Gh8nGuWXzo8SGNb5YGCrY3lLOHJGrzvwiTJRR1ZiM0cNq%2B278t0iQZEB9M411UD2XFw3Z%2FPa4k7eysxRCaIvdMY0AMs86ShroUZeRHY0%2B%2FyQe90b1Wm%2F8uV4GAn5%2BFATmXwMO6N9EiRd73HnbVIbUHivc3dB%2B8paGcga%2FblQ%2FkObqiItJbRacTmJSV%2FzprvgP8Hda6MXlR%2FyyWxVAnfAMdbN6&X-Amz-Signature=035501d56edbced9c1796067d2b4c46bdc0e987a580776a344df53f7b48b1934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AHRZYBS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCu7qu%2FbqF2RA2ODN0hieCDSr4jhOLbd3rIiSmRkVRAMwIgHF4o0hOhdTb1Wy6cDLIo8bOcri5uyiVxYl8tpXDgLSUq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDPlwEWBGzKo5xK9HLyrcAy88PfOBQRlDvbUVfapynBzRWeKpwu9LKA1sP%2BO2yneP0m9F4sjWtNDMJj7rqF1BBMO4XADv6UbsAxJELXsOUelY54Mpq7OuaF1YFHN%2FohtbM%2BJpjsgX2pE9gf7cI42Lkodmq4GiZ5vnz9c2GlYDazfYOiAqyVWs17qDG9zJTmdjg1KP6g7nscnRFLxZuEy121bm%2BlSLh%2FBFZmNOhVi02OMlBNODm%2BnksrE9Q%2BohycGFjXTugLb34AvcJHkXwSHmxJ%2FYpifOH08dg5V8cC71jEOFFyGOZ%2Bueqr%2FA%2B0o53m042qBjXC%2B8MoCcd2NiPatgznfLDAo8%2FwerUdwEw9Xn6QZ277rCME8vl%2FVh8JwRtG%2Bi%2Fq9iOk0eum6x3BLIu55ha0TlGCuew9cCRp21Vkkzb8%2B88t%2BximzrNhZfAle51i6MMMeYXjyVmIxrwMCphoz2bxxf6hGWB6npevA86oNYOT2NW7u2MnWRmtDZHCpl9CjelHKaSGFTk9SmPTFlMmS5aAq8%2Bpf3mypyw5ORrFngpr9e20siGiUggK44zEuiMU1KI79kbXUw7bCVv8dfnxgahkB6YwcVEynKwnnpBnYi1QHe7ONhH7HeiPSP7hXuVwvLImAEU4VPbTtuxzRfMOyArs4GOqUBLBaqVizidsH6PXwzsnMxPowiVfNeK0CRFV4lEIMmO1L9qIE5E%2BTD4qCl2WR9t39ZjMlRZPUJfCzymo1P5ZJJNRnC1aRGy06%2F29QKCFe%2F8emdA1E535iJrtsrlobyHI5GNSJzolLoIgcAcVw6IsjLqOeaxvFJN5x7RXtR%2FBQa1zsccW4x4663w0cfd424FWN%2Fo%2BdShxp5%2F7oPKNjVSGwxWK9mTntV&X-Amz-Signature=8cb8ed75055fcc5a7d6f6db7fd13a7cd316fb775683b3f94235c7d1d5823cf26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AHRZYBS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCu7qu%2FbqF2RA2ODN0hieCDSr4jhOLbd3rIiSmRkVRAMwIgHF4o0hOhdTb1Wy6cDLIo8bOcri5uyiVxYl8tpXDgLSUq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDPlwEWBGzKo5xK9HLyrcAy88PfOBQRlDvbUVfapynBzRWeKpwu9LKA1sP%2BO2yneP0m9F4sjWtNDMJj7rqF1BBMO4XADv6UbsAxJELXsOUelY54Mpq7OuaF1YFHN%2FohtbM%2BJpjsgX2pE9gf7cI42Lkodmq4GiZ5vnz9c2GlYDazfYOiAqyVWs17qDG9zJTmdjg1KP6g7nscnRFLxZuEy121bm%2BlSLh%2FBFZmNOhVi02OMlBNODm%2BnksrE9Q%2BohycGFjXTugLb34AvcJHkXwSHmxJ%2FYpifOH08dg5V8cC71jEOFFyGOZ%2Bueqr%2FA%2B0o53m042qBjXC%2B8MoCcd2NiPatgznfLDAo8%2FwerUdwEw9Xn6QZ277rCME8vl%2FVh8JwRtG%2Bi%2Fq9iOk0eum6x3BLIu55ha0TlGCuew9cCRp21Vkkzb8%2B88t%2BximzrNhZfAle51i6MMMeYXjyVmIxrwMCphoz2bxxf6hGWB6npevA86oNYOT2NW7u2MnWRmtDZHCpl9CjelHKaSGFTk9SmPTFlMmS5aAq8%2Bpf3mypyw5ORrFngpr9e20siGiUggK44zEuiMU1KI79kbXUw7bCVv8dfnxgahkB6YwcVEynKwnnpBnYi1QHe7ONhH7HeiPSP7hXuVwvLImAEU4VPbTtuxzRfMOyArs4GOqUBLBaqVizidsH6PXwzsnMxPowiVfNeK0CRFV4lEIMmO1L9qIE5E%2BTD4qCl2WR9t39ZjMlRZPUJfCzymo1P5ZJJNRnC1aRGy06%2F29QKCFe%2F8emdA1E535iJrtsrlobyHI5GNSJzolLoIgcAcVw6IsjLqOeaxvFJN5x7RXtR%2FBQa1zsccW4x4663w0cfd424FWN%2Fo%2BdShxp5%2F7oPKNjVSGwxWK9mTntV&X-Amz-Signature=67c728b995acbfe1bf27dac5744dde8e9602f1dcc646bc98f6b37df624160e89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FTYNXBV%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQD3DeU3EIs0N%2F6K6uqxSy0ux%2BcW%2Fr0zNn%2BYAjad%2F6KCcgIhAOJEv1UMwZ4FmG%2FvicdewBWwuu52Ua6R0E8oXf46cJO5Kv8DCDkQABoMNjM3NDIzMTgzODA1IgwwAQchJ%2F6gu7mE4wsq3ANN51o022ko6XAm%2BALLEjN3DEXNnaiIVE6IiZOfboNeP2%2FsGwWR3%2FoJhdUXn3KKN64ngF%2FCaRgUSc6AHIAIpyZm%2BA2Jm%2FJ70zKNaXPyI9cwRgoFol50Uuc0e8S31zQN5njBow%2FxBZ%2BP3K1Lojmzvh1QzIDO6eEYflTW2smVFGfO%2B%2B0a4z%2F69m2CI3w0y3bhTUM85V%2FlBG1DhbgZNdzmoo9bSMF%2BzYdWJ3VbQp1%2FIcFmazXK3RfNv8Gw%2FqACmpGATmwsnacNK4qOmwwVbZ6h6mZ8uGVXBluLpD%2F1sAybqf2a%2BQPGgeV%2F8G8PDTluGrzHTKsRjTt195T3oQMlNBbPdLjfAjxTaeGNkkmddgZ6arB6ccTZYAkqarIvOkJoLBvNDDpzv2tnNxmMRGy19UgBbaOjwzEnRsaOuBxTdtF4gh%2Bya84FbYZggAqVMH9uI2L2X3JXTUvF8Egr%2FYDvEgesJmy3kio73r5D8VMHp53UXR1yPbdyGMOHVT4kXjTfEWy66iwhLqkrj0bfFgIQ4mQ%2FlB1MOS2sk45quMT%2BJ7T7I6o2ajqFCOCe8P93utOwrsL5hOQY%2BW82VTShTFm6XWFgXhTZ1KBfW%2BBX%2FuOchQcbLfFST47dI0Wj119K1BtvmjDKgK7OBjqkAU95ujGwn2%2Fj5XzIzr2%2BoNpXf5cXfECKZTtWHd1iimm9rtgIeRiBQxsi6OEjKQI2Ff0hN7AEhs%2BUytaSG5IjQmt7uO7gqr%2Bb8MVI4ulWLNnA7N0K9oeQH1AMh9RtvoHuNZ736PwltK7YEc%2FiCICiKxvKX11Gerr6LFDlKrOZXs3oSpmUsn%2FF%2BrQ4DaNzD%2BuGojtSWsiQf5wvHpTpvwxklkz%2BliXg&X-Amz-Signature=4219e22a70db83e679161f97921d0426b06f6835e5bbcfa933772abd70c82c7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644CBBPLQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDPqJHn6c5yYVH3xR9kPK4J5D8KBj4qg6WfUE53%2FgtWwwIhAITtYXRJLXqzOAAucGSy%2F2MmkWES8YaxFAUPDA0RfLpmKv8DCDkQABoMNjM3NDIzMTgzODA1IgzcByJGWQ1FFaYyr6Yq3ANkS%2Bl1VS2DmVfWKMq%2F%2Ft657TnZ8PvKcIKx8mr8xG3O2YIOVYBWvJO13pj4S6RcqcxVmGWg3elIEzMofji37I3SLbntjWHhy39U7IBQTponzNL3M6Ajir7In5PsGq%2FSDglYdcspE4l5LZ6ohdfcXEk3bzwmDW5xXZ0jd3AhgsC5JrB9DzXsYZmshWKNJgeKagdPJ%2BKS3iUkZdyyY%2FdbGKFdOnTaVhTlWHOdjfc7HP6p7FoKdqzDdoQVkkqeiou8qpmYCEyEpyyS6%2FWv47NQbjf0dROocbbg0aRY3emu81ZK2mrE0Ov4wZnZTdu93cFQsYojTkGXh5bqzJcuzmE%2BfVziDp%2BEUHwIULNew%2F8h6K%2BbKYyBNc%2Bz5eTU3awlgG2wCIQhDGas3%2ByIDJXg1CqUdFwVI%2BSvtBtTd6pZnyJrsAwdtkmrtQ2140B7ItBuQNyqkXLb0I0VpYUiP9N4aRall6ZYVWq4VSxPKkqY9WqSsRyBY0rI%2B5hgYV4FGqDeOL1ob5p51%2Fa1VSeub8yx48eFGTq7enmBSpm1IQGr2j1oy0WFOrCBFReZkRrC3OpfySL9uPRcO9epb33EXTRdkbCLpzHojCt3sX%2Fjn3%2FiEaGqz3FDVeFiZqIOILhfjHwO1zDUga7OBjqkAYxaR3Fi%2BX876PmKtCuVGBItDMB%2BIHOy63NWwQBlq8%2F8gzQwOW2BSb9GgueDpMqdaOBb9TCMlLAF6bbe5wvjjujSS6BIZwWcNEfa1zpM2Ho8DJOgWhAh4t76nvhdwEkIdlU51NfklhSWrPj7E8R8MyRW9bEPwl%2BuWPprb7KDuoUyCoO6dWU%2F66GrhX5Hkk7d8LPKViuFEkrdY1tK8pMLsuwlBFWP&X-Amz-Signature=383e67d6ec6e2ab0c8e0025381fbbbeeb5e414af2311c9659a4533670e527523&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CNNOT77%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDm6HDAH2JFT2KfJkWugoAEfkw9IwhLU9g04F7mtSdzZgIgNwew3q%2Fma33TUArHpr1%2BiFRKzeldoDaka1qQVxyDZTMq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDLUyYLqulydHnoHXySrcA6543fT3XAWbArwmxTL%2FSMISHZ%2BAOewmX%2BPtf2E8G43xClmJe%2B92au7qVZmtiihLSx0KbxP4QVw1z0gp1KyYx0MBrvXjAt70QcOUjasgYUNmsChrFCZXOwbkQw83zzXbRJO%2FN6iCVA30ne%2BVQt3%2BfmFpavfXCLCn1NmeXJO7cidWNWb7bcHzatdy0Ez0jq1gMkEV%2FEP6PxRFg6zi9ZTzg4JbwBDwykeRAHlhXyZJnQcGE094Y1jCyYEszheSdcopQbupdwCcDK9GP7%2F0WuJ1Op3LHs7sbh3GNG8RL7bhWIJTFtlFVcYHmIKLczMf%2BCg0xF8PQBCCPF2eqOqH4sX%2BuTdYMX6u7ZCadVDbPqUQ1dth3f7UH4LjTCtFqKv0au7KrVWApyQTEcPE23KC0UFOjfMhZRx3lldGd%2FXfR1kdTECYJaj5JM%2FKcrWEYZe9RtKGfRkON7zXp%2BotbfoAOSVjInuCISQoz9tk6wPJpdFdiaUWohzErevzunmSqyK1NuaXp6Rg3DV2kkId7KqHhO7QlF3HLWh9HHdbfa98OhFu12m766w3%2FbFLbX48qCGNIAV8qUeeyYbgKyk1CHGc3nf6EHYPEdUArBOjQKM9p7UPGfP4g%2F0KXyGcI73TsGI%2BMP2Brs4GOqUBfK%2B%2BEjZo2Tam9XifLd0z23YuqG4rT0yTA4mqioFHAXomvAdIbWhN2jwBivalzqZq8Y3KaKzhBydJ4WHOTAMtPIUCXLPP5Gkg5IINPbP4l7rn%2B83Sw97tvFt9xbOhqFzjodekammD1qCTskiLYcQStY2JIBJWsUJgTqeJKZOgmBrg3EfYw6eJWpplR6b91k7kpArhoeK%2FJewxYmy%2Ba2DeoCfL3pO8&X-Amz-Signature=c4d23350ac5539bc7eb6a0879b6fd4001e58b314923c24551c3db747b95771ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WUUZG33%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCA2cD5XchMvwfYpvQywduiex%2B2XB%2B0DK0US1i4Kf2PBAIgWjx7%2FOID%2BT7anFjegumN%2BGUDrePlk8O%2Bs8QGF6ugbQMq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDGWYQWbp0bLzczDqoircA4FwusfPQpTVC71z4scEf1g9RNKInKAhQp5fKMdEuBdaqNdnIgNZ0bd7fvb%2FoIzWxCmyUREpMukOM1eeRfjgaOOmdkvojMNACEqZ4ydeE3JzCD%2FmtYzKmJwutsppPe0RIcu0iUqI6%2B%2F3ajUGzw%2FE8zfA9yrM0bhZ%2FcPm5HWu%2FA6AW0nBAGVOu%2FAomjYl1qF%2BTr7t2ZThYI2cmPIqILSUSrB2PN3L56vNPa0XucvK2lm5RreD8j8XqeDjxnmWYoBjvnFFphVTLDwqNlNVbiEcw3yvidDHYJ2eA09abgcrajSSgYzrytUTGFrDJEQl31HHCqOdZJ31oWRwE393%2FM%2BWMU9dokww5eQiNu%2BupSgs48R7dQoZVtzXpK9K8VelaXN%2F%2FTds5Z4QNxgqV34CDLWGL3X0TvhGgDwvUBdTVO26e%2BfhWBlRh7MrtfMhq6j%2Ftj%2BHnc0WegXCZWe7Jpm%2FEeXD4WJCCq53hrjlASDv5qeb1DMEv2S3srj3xgTHgctPx0AeAneZjtsdp03Kv56x158esTWHorJ2xHEaeHWNu68cTgBcXrnm3jliTmabCFxutnqkFCfL0YwV3IU%2B75l16CWJblTp8BXM%2BsAjBerdcR0m1rIbSL2TtXH77TunQ8OjMJ2Crs4GOqUBaB%2FbR2JKwRfy%2BemP9YrdjF4uxkg96B3sbaZtQWcAKGgZ30tRzeJASX0bp45rRjHKYVJsOJNNwgCOCGf1Wy9eQvxmuhj2Q6ol92wpi%2FxbzIAs7EbkIoU4lMN3O6ONsZ4qqy2aQvNJvQzOW2MxMFb5yOOHKYgVdY9JW3k2R%2BNXEyI4eSicn4mRwyYUMC9%2F2mG%2FR5Zkttl4LIc%2Bm2a8it9ovUm0PDc%2F&X-Amz-Signature=f081b245a5a4efb6db2f98d733c998185a8033a82aa498e2b823c423f196e633&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WUUZG33%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCA2cD5XchMvwfYpvQywduiex%2B2XB%2B0DK0US1i4Kf2PBAIgWjx7%2FOID%2BT7anFjegumN%2BGUDrePlk8O%2Bs8QGF6ugbQMq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDGWYQWbp0bLzczDqoircA4FwusfPQpTVC71z4scEf1g9RNKInKAhQp5fKMdEuBdaqNdnIgNZ0bd7fvb%2FoIzWxCmyUREpMukOM1eeRfjgaOOmdkvojMNACEqZ4ydeE3JzCD%2FmtYzKmJwutsppPe0RIcu0iUqI6%2B%2F3ajUGzw%2FE8zfA9yrM0bhZ%2FcPm5HWu%2FA6AW0nBAGVOu%2FAomjYl1qF%2BTr7t2ZThYI2cmPIqILSUSrB2PN3L56vNPa0XucvK2lm5RreD8j8XqeDjxnmWYoBjvnFFphVTLDwqNlNVbiEcw3yvidDHYJ2eA09abgcrajSSgYzrytUTGFrDJEQl31HHCqOdZJ31oWRwE393%2FM%2BWMU9dokww5eQiNu%2BupSgs48R7dQoZVtzXpK9K8VelaXN%2F%2FTds5Z4QNxgqV34CDLWGL3X0TvhGgDwvUBdTVO26e%2BfhWBlRh7MrtfMhq6j%2Ftj%2BHnc0WegXCZWe7Jpm%2FEeXD4WJCCq53hrjlASDv5qeb1DMEv2S3srj3xgTHgctPx0AeAneZjtsdp03Kv56x158esTWHorJ2xHEaeHWNu68cTgBcXrnm3jliTmabCFxutnqkFCfL0YwV3IU%2B75l16CWJblTp8BXM%2BsAjBerdcR0m1rIbSL2TtXH77TunQ8OjMJ2Crs4GOqUBaB%2FbR2JKwRfy%2BemP9YrdjF4uxkg96B3sbaZtQWcAKGgZ30tRzeJASX0bp45rRjHKYVJsOJNNwgCOCGf1Wy9eQvxmuhj2Q6ol92wpi%2FxbzIAs7EbkIoU4lMN3O6ONsZ4qqy2aQvNJvQzOW2MxMFb5yOOHKYgVdY9JW3k2R%2BNXEyI4eSicn4mRwyYUMC9%2F2mG%2FR5Zkttl4LIc%2Bm2a8it9ovUm0PDc%2F&X-Amz-Signature=45b2075edda57bb7412e7287c790396642be3fcb550f50c3a2a7c42b45864e42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVCA6L3E%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIEUrXy3SaLFjg5ASDhOCw3ajmnU1OCGjY%2BIV9kS4cbKkAiEA%2Fbehm49DsM%2FflsvT0wczakhe9IRFJF%2Fxyawxs7oJjvoq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDCzLcZarLvFKv11ctSrcA3OfapM5l%2Bpd%2BjZos78HpgAkisQX3puxR0XPDbUT51%2FRiFSVsXtvyTCkoLQrVHpObArZ%2FqI%2B5cZFiPukmbp6v2Gyhg154xVn%2FXK4O%2Fksp9hUsizUm2zEzYzExDzR0XMclbq3z0TGbvTlketKUKRYGSriGy8vZTEQN5jtqjW%2BgqCV%2Fgn1PqoCtFmWtZ0T%2BTgiv6EakLG1GRbk1d291EWBBauQvpZZ2JtVxZHtEOrc%2B6JeV1FKnrFA75amy9Pt0LpvGFPUbo2gdb05I8CPZjWpN0mgQRH9T4P%2B3dPPHvNJxPiAqV0OzqEwpknpvkLHSRSs82Q6WGM3ioCGMG34hCH7zYBF0dBWIef6CU3Bv9W0DhIRjt3thESOvaekS2imFj4uyP0bwS936aU494%2Bu8tln4udbHvjlHGo9AW8X35Jb9HhPGkUx%2B%2BaG4%2BNYUoxlUr0st5uuKHXN%2F%2Fs%2FSN3Zlf%2FDsGkY28UaT8aat9TRiJJFiFngUCD0WtRYBvU7OWny%2BJzcOGxwLqIzx5FklS86oGzlkyGtzrp7oQIA%2F9aCSZ5u%2Fh%2B13qWGwglhCWQjxggOqeRaD6fO0V4Ir7ZO0rSiMitViQEt2ynsnRKz53WttHlPSok6rrdHsaQo1mF2sLWRMIyCrs4GOqUBpFCv05s0Dm6H%2B1rEWltj63wkUMMrlSemqRuij%2Fm7DXLYuxJ%2BoJozcj8k6HpyJgAHAGwtgJNgp4SEbj8%2BvPZI8DD7IX3c6kQdynYFB9QsQVQNbml7CBFCcWgCYBzE1T8LQP6Jv5kfunqXAoqTFN1y5TCex%2BvrlKDg4j83e8TjD48v6lzWVVNi0jLXYsAUM4iEINRNrMIHdTUAuMFOPqUvvcJIAdI0&X-Amz-Signature=cd09a9cfe538970a7921bd2c8ca53c3dba45b13fac20026cbc125699c82496df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TRAZWJM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDmemsC3vu0%2FBgezEj3qmeP%2BcjCsQKBVG9ztB2UCnpe7QIgShLrs1Fvy%2FK6DHViMbVtH55FZ37ojbsmCytvzuTDk0gq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDMVz5d%2BumY63CBvwpircA8YcVdv9kFGgJgm%2B2NceR3u8vz9ICivWKKi44Br9VnBiSsN40v74wsHcLOUjf8ZyvMf%2BT1Pf0LP5SO638q1mWKvAhjMFCtbHFg5TG990conHjdkJDKpNSmvTcVioH0XztgVDJ5bNxcXUHZX1OZubxlz4qEXGvimsv%2FZSUwHzoom7jz0uHfHC%2B%2B3kEtmEXYB4yljB0d7VpxTgzZRqDpXR%2BxyisqSQh9yP9Rodp5qPcw5oIQUsK57TmFyXdODiMX4OSxHirue7Fgvop2jPMTyO%2BGwtAlSFQa%2FkT34P1ca0OCWZdqGREpDAHZ9zRSY37%2BJupqzYmNnOxzZ4%2FN%2FHRVQO7MEgPFIFzxHNwn%2Bz6Me9rq%2BNu%2F5xpqsA4vd5Anq3xa1%2FaG5N8rFCNGHMNYFZn%2FsePhQscAsLBep2lpgWDJ41t4Tx%2FS5PqWqKobdaMvVHBk6mbpp51nwAQMuX%2Bo58c7h%2BDsZW5HeMKXduHyQ8NWE21xt7UANBoogsjg9hltGEO4yuBa8bTx2qOb6gjmVL%2FfczDM9VtmbR6wyv4Gx7IuUZ%2BcGGIC8KQtbzppsSVD%2Bpf2XUyRMXRsj2n7xLSxR00Esxe60vTCgwQRthNY5Q0BBKZ3RviuUQKKghiEd8WINfMNaBrs4GOqUB16c15YwW4J25L1%2FWjD7%2FHzTN%2Fta7VnGpCuiILDA9MdDHwHmUBj16iWp8Nx1riLIp%2F%2BpEGlu%2FeMh7pkfggX69iPB3SWqDvDpOygNAgvFNL1ZNGAUpDs7%2BOUqXB5mF02O%2Bj1GL71gX816LfFyzk0SUJXvEu%2FxJxy1q2H3W1eu8Xxo%2BDKEWZxho8XmWvel349192P1zdgx%2FrTS7CKl%2FZ%2BkhSpf2lqtz&X-Amz-Signature=17fb711773598f67179bd1a6ace5731a58d023dd5e7b681f5b28610a7feb3db2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TRAZWJM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDmemsC3vu0%2FBgezEj3qmeP%2BcjCsQKBVG9ztB2UCnpe7QIgShLrs1Fvy%2FK6DHViMbVtH55FZ37ojbsmCytvzuTDk0gq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDMVz5d%2BumY63CBvwpircA8YcVdv9kFGgJgm%2B2NceR3u8vz9ICivWKKi44Br9VnBiSsN40v74wsHcLOUjf8ZyvMf%2BT1Pf0LP5SO638q1mWKvAhjMFCtbHFg5TG990conHjdkJDKpNSmvTcVioH0XztgVDJ5bNxcXUHZX1OZubxlz4qEXGvimsv%2FZSUwHzoom7jz0uHfHC%2B%2B3kEtmEXYB4yljB0d7VpxTgzZRqDpXR%2BxyisqSQh9yP9Rodp5qPcw5oIQUsK57TmFyXdODiMX4OSxHirue7Fgvop2jPMTyO%2BGwtAlSFQa%2FkT34P1ca0OCWZdqGREpDAHZ9zRSY37%2BJupqzYmNnOxzZ4%2FN%2FHRVQO7MEgPFIFzxHNwn%2Bz6Me9rq%2BNu%2F5xpqsA4vd5Anq3xa1%2FaG5N8rFCNGHMNYFZn%2FsePhQscAsLBep2lpgWDJ41t4Tx%2FS5PqWqKobdaMvVHBk6mbpp51nwAQMuX%2Bo58c7h%2BDsZW5HeMKXduHyQ8NWE21xt7UANBoogsjg9hltGEO4yuBa8bTx2qOb6gjmVL%2FfczDM9VtmbR6wyv4Gx7IuUZ%2BcGGIC8KQtbzppsSVD%2Bpf2XUyRMXRsj2n7xLSxR00Esxe60vTCgwQRthNY5Q0BBKZ3RviuUQKKghiEd8WINfMNaBrs4GOqUB16c15YwW4J25L1%2FWjD7%2FHzTN%2Fta7VnGpCuiILDA9MdDHwHmUBj16iWp8Nx1riLIp%2F%2BpEGlu%2FeMh7pkfggX69iPB3SWqDvDpOygNAgvFNL1ZNGAUpDs7%2BOUqXB5mF02O%2Bj1GL71gX816LfFyzk0SUJXvEu%2FxJxy1q2H3W1eu8Xxo%2BDKEWZxho8XmWvel349192P1zdgx%2FrTS7CKl%2FZ%2BkhSpf2lqtz&X-Amz-Signature=17fb711773598f67179bd1a6ace5731a58d023dd5e7b681f5b28610a7feb3db2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7AOUT2K%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T085208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCICp%2BqscNO49pOJo2dR7YNMM7WNQ7CICYWXA24%2Ba0bZ3SAiA%2B%2FXek9T8HxYa124ENIqrEdzBCU8tcPhrQcscqOEg8KCr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMLJ0dDTlNG596gBCUKtwDpbvcOhkCzyQlWM5y4PylFtQew8JWB1k9mZAguH1u0vngIlBX0es%2B4RsuXKbo0GJaHpkkAW4XtgiLGr0gOkuyJ3M7QCEWoZW1Mxk45ciRDTzvaf1h7fSEsPzygdfd%2BgHu3W3QoX7NThCzttpE6RawHXMWKwequDg3GeyVeAmabsO8QLLUc3n7OKHudNvLT8TuQS9ULs0gZGcEAFKT8Bb7kSgWxrU%2FbmdWwyigCDTTp6ra4u9LUBAbMKZ49t9W58oBqluVhRhve60wl4FXH6CnNUXoi02%2Bj93V22V48S1iRkY7TDDhodBP6ddNI2MNYglOx4rSegpBz1bXrvL8v%2Fpn%2Bc4gusjtPtk%2BJTeckgv3GCzSYvvVRFqBxNOrBB%2FwThNb1iEiJgvEN4jHep4AwNYkyf5m%2F2sSSEFIoJeacizYhLGBLBuGR2onl81lg7sV89%2Bt3b0cI3qPm5pPE4%2BcToMH%2FxqgU1pRvP%2BesYJJTkBNZCGlWHEf2RcYVHcZrbCtaCDsJ5Dy8skYIwkDhMFXxmoohxYj0t5LxDfFn6CvC%2FdClXVF%2ByOKBvKsHp6SGfT6qk%2FscutZuuTt0pxOAS0Mp3v86Hz7qXzRPWIiPx5gSSN0PxGO5UBtfDR%2BK3LvItQww4GuzgY6pgF3%2BigJaP9r8C%2BxCg5FsgZ%2F0XIJUKtPaRQq8qxdozqcceGQ58mCsXfDycI5I8pAyj9WBGwrXvYiBRIaBJnv7OKVnaLqvyVroL9j0Mxf3Kvw%2BwI0f%2FLuBm9reUIUSsyQqvLC5Gn1DF0ArMvkIlZzU%2BeyczNpCYF78g571mfZKmcPBUY8FuKVNnxnnlfQQt7XxGpoJXVl7OavgzgyBJQusOkwjtRLmTS4&X-Amz-Signature=934d50c613a4f5ebf39bb891204487ad71f794bc21aac80f4027e181ac7bb183&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

